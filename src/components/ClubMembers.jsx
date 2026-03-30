import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, hasFirebaseConfig } from '../firebase';

export default function ClubMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!hasFirebaseConfig || !db) { setLoading(false); return; }
    try {
      const unsub = onSnapshot(query(collection(db, 'members')), (snap) => {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        console.log("Members loaded:", data.length);
        setMembers(data);
        setLoading(false);
      }, (error) => {
        console.error("Members fetch error:", error);
        setLoading(false);
      });
      return () => unsub();
    } catch (e) {
      console.error("Members listen error:", e);
      setLoading(false);
    }
  }, []);

  const displayed = showAll ? members : members.slice(0, 12);
  const colors = ['bg-teal-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-emerald-500'];

  function getInitials(name) {
    if (!name) return 'TV';
    return name.split(' ').map(w => w?.[0] || '').join('').slice(0, 2).toUpperCase() || 'TV';
  }

  return (
    <section id="members" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Thành viên
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2]">
            Đại gia đình <span className="text-gradient">Long An Runners</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-[15px] sm:text-[17px] mt-3">
            {members.length > 0 ? `${members.length} thành viên đang cùng nhau chinh phục mọi cung đường` : 'Đang tải danh sách thành viên...'}
          </p>
        </div>

        <div className="animate-on-scroll min-h-[300px]">
          {loading ? (
            <div className="flex justify-center py-12"><div className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin" /></div>
          ) : members.length === 0 ? (
            <div className="text-center py-12 text-gray-400 italic">Chưa có dữ liệu thành viên. Hãy chạy lệnh sync để cập nhật.</div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {displayed.map((m, i) => (
                <div key={m.id || i} className="group bg-gray-50 hover:bg-white rounded-2xl p-4 text-center border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-16 h-16 mx-auto rounded-full ${colors[i % colors.length]} flex items-center justify-center text-white text-lg font-black shadow-lg overflow-hidden mb-3`}>
                    {m.profile_medium && m.profile_medium.length > 10 ? (
                      <img src={m.profile_medium} alt={m.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.textContent = getInitials(m.name); }} />
                    ) : (
                      getInitials(m.name)
                    )}
                  </div>
                  <p className="font-bold text-gray-800 text-[13px] truncate leading-tight">{m.name || 'Thành viên'}</p>
                  {(m.admin || m.owner) && (
                    <span className="inline-block mt-1.5 px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold rounded-full uppercase">
                      {m.owner ? 'Owner' : 'Admin'}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {members.length > 12 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-sm rounded-full transition-all duration-300"
                >
                  {showAll ? 'Thu gọn' : `Xem tất cả ${members.length} thành viên`}
                  <svg className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
