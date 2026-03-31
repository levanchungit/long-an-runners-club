import { useState, useEffect } from 'react';
import { doc, onSnapshot, collection, getDocs } from 'firebase/firestore';
import { db, hasFirebaseConfig } from '../firebase';

const trophyColors = ['from-yellow-400 to-amber-500', 'from-gray-300 to-gray-400', 'from-amber-600 to-amber-700'];

function CategoryCard({ title, icon, leaders, color, avatarMap }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`h-1.5 bg-gradient-to-r ${color}`} />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-[16px] font-black text-gray-800">{title}</h3>
        </div>
        <div className="space-y-3">
          {leaders && leaders.length > 0 ? leaders.map((leader, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${i === 0 ? 'bg-amber-50/60' : 'bg-gray-50/60'}`}>
              <div className="relative w-8 h-8 shrink-0">
                <div className={`absolute -top-1 -left-1 z-10 w-4 h-4 rounded-full bg-gradient-to-br ${trophyColors[i] || trophyColors[2]} flex items-center justify-center text-white text-[9px] font-black shadow-sm`}>
                  {i + 1}
                </div>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${trophyColors[i] || trophyColors[2]} flex items-center justify-center text-white text-[12px] font-black shadow-md overflow-hidden`}>
                  {avatarMap[leader.name] && avatarMap[leader.name].length > 10 ? (
                    <img src={avatarMap[leader.name]} alt={leader.name} className="w-full h-full object-cover" />
                  ) : (
                    i + 1
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 text-[14px] truncate">{leader.name}</p>
              </div>
              <span className={`font-black text-[15px] shrink-0 ${i === 0 ? 'text-amber-600' : 'text-gray-600'}`}>
                {leader.value}
              </span>
            </div>
          )) : (
            <p className="text-gray-400 text-sm italic text-center py-4">Chưa có dữ liệu tuần trước</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LastWeekLeaders() {
  const [leaders, setLeaders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarMap, setAvatarMap] = useState({});

  useEffect(() => {
    if (!hasFirebaseConfig || !db) { setLoading(false); return; }
    try {
      const fetchAvatars = async () => {
        try {
          const snap = await getDocs(collection(db, 'members'));
          const map = {};
          snap.docs.forEach(d => {
            const data = d.data();
            if (data.name && data.profile_medium) {
              map[data.name] = data.profile_medium;
            }
          });
          setAvatarMap(map);
        } catch (e) { console.warn("Could not fetch avatars:", e); }
      };
      
      fetchAvatars();
      const unsub = onSnapshot(doc(db, 'leaders', 'last_week'), (snap) => {
        console.log("Last week leaders exists:", snap.exists());
        if (snap.exists()) {
          const data = snap.data();
          console.log("Leaders data:", JSON.stringify(data).slice(0, 200));
          setLeaders(data);
        }
        setLoading(false);
      }, (error) => {
        console.error("Leaders fetch error:", error);
        setLoading(false);
      });
      return () => unsub();
    } catch (e) {
      console.error("Leaders listen error:", e);
      setLoading(false);
    }
  }, []);

  const hasData = leaders && (
    (leaders.distance && leaders.distance.length > 0) ||
    (leaders.time && leaders.time.length > 0) ||
    (leaders.elevation && leaders.elevation.length > 0)
  );

  return (
    <section id="last-week-leaders" className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-100/30 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 animate-on-scroll">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            <span>🏆</span> Vinh Danh
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2]">
            Người dẫn đầu <span className="text-gradient">tuần trước</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-[15px] sm:text-[17px] mt-3">
            {hasData ? 'Top 3 vận động viên xuất sắc nhất trong 3 hạng mục' : 'Dữ liệu tuần trước sẽ hiển thị khi có đủ hoạt động'}
          </p>
        </div>

        <div className="animate-on-scroll min-h-[300px]">
          {loading ? (
            <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin" /></div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              <CategoryCard title="Quãng đường" icon="🏃" leaders={leaders?.distance || []} color="from-teal-400 to-cyan-500" avatarMap={avatarMap} />
              <CategoryCard title="Tổng thời gian chạy" icon="⏱️" leaders={leaders?.time || []} color="from-blue-400 to-indigo-500" avatarMap={avatarMap} />
              <CategoryCard title="Leo dốc" icon="⛰️" leaders={leaders?.elevation || []} color="from-amber-400 to-orange-500" avatarMap={avatarMap} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
