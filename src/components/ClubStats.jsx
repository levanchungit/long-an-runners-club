import { useState, useEffect } from 'react';
import { doc, onSnapshot, collection, getDocs } from 'firebase/firestore';
import { db, hasFirebaseConfig } from '../firebase';
import useClubInfo from '../hooks/useClubInfo';

export default function ClubStats() {
  const { clubInfo } = useClubInfo();
  const [totalActivities, setTotalActivities] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasFirebaseConfig || !db) { setLoading(false); return; }

    const fetchStats = async () => {
      try {
        const snap = await getDocs(collection(db, 'activities'));
        let km = 0;
        snap.docs.forEach(d => { km += parseFloat(d.data().distance || 0); });
        setTotalActivities(snap.size);
        setTotalKm(km);
      } catch (e) { console.warn("Stats error:", e); }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Thành viên', value: clubInfo?.member_count || '20+', icon: '👥', color: 'from-teal-400 to-cyan-500' },
    { label: 'Hoạt động', value: totalActivities || '50+', icon: '🏃', color: 'from-blue-400 to-indigo-500' },
    { label: 'Tổng KM', value: totalKm > 0 ? `${Math.round(totalKm).toLocaleString()}` : '500+', icon: '🛣️', color: 'from-amber-400 to-orange-500' },
    { label: 'Tỉnh thành', value: clubInfo?.country === 'Vietnam' ? '🇻🇳 Long An' : (clubInfo?.city || '🇻🇳 Long An'), icon: '📍', color: 'from-rose-400 to-pink-500' },
  ];

  return (
    <section className="py-16 bg-white relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 animate-on-scroll">
          {stats.map((s, i) => (
            <div key={i} className="relative group bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-teal-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative">
                <span className="text-2xl sm:text-3xl mb-2 block">{s.icon}</span>
                <p className="text-[24px] sm:text-[32px] font-black text-gray-800 leading-none">{s.value}</p>
                <p className="text-[12px] sm:text-[13px] font-bold text-gray-400 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
