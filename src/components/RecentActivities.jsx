import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, getDocs, limit } from 'firebase/firestore';
import { db, hasFirebaseConfig } from '../firebase';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function RecentActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCount, setShowCount] = useState(6);

  useEffect(() => {
    if (!hasFirebaseConfig || !db) { setLoading(false); return; }
    try {
      // Dùng query đơn giản không orderBy để tránh lỗi index
      const q = query(collection(db, 'activities'));
      const unsub = onSnapshot(q, (snap) => {
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Sort client-side thay vì cần Firestore index
        docs.sort((a, b) => {
          const dateA = a.start_date ? new Date(a.start_date).getTime() : 0;
          const dateB = b.start_date ? new Date(b.start_date).getTime() : 0;
          return dateB - dateA;
        });
        setActivities(docs);
        setLoading(false);
      }, (error) => {
        console.error("Activities fetch error:", error);
        setLoading(false);
      });
      return () => unsub();
    } catch (e) {
      console.error("Activities listen error:", e);
      setLoading(false);
    }
  }, []);

  const formatTimeAgo = (d) => {
    try { return formatDistanceToNow(new Date(d), { addSuffix: true, locale: vi }); }
    catch { return 'Vừa xong'; }
  };

  const formatDuration = (s) => {
    if (!s) return "0:00";
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return h > 0 ? `${h}h${m}m` : `${m}m`;
  };

  const typeIcons = { 'Run': '🏃', 'TrailRun': '⛰️', 'Walk': '🚶', 'Ride': '🚴', 'Swim': '🏊' };

  const displayed = activities.slice(0, showCount);

  return (
    <section id="recent-activities" className="py-24 md:py-32 bg-gray-50 relative">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 animate-on-scroll">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
              </span>
              Hoạt động gần đây
            </span>
            <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2]">
              Dòng chảy <span className="text-gradient">Long An Runners</span>
            </h2>
          </div>
          <p className="text-gray-500 mt-4 md:mt-0 text-[15px] font-medium max-w-sm md:text-right">
            {activities.length > 0 ? `${activities.length} hoạt động đã được ghi nhận` : 'Cập nhật liên tục từ cộng đồng'}
          </p>
        </div>

        <div className="animate-on-scroll min-h-[400px]">
          {loading ? (
            <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin" /></div>
          ) : displayed.length === 0 ? (
            <div className="text-center py-16 text-gray-400 italic">Chưa có hoạt động nào được ghi nhận.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map((item, index) => {
                const initials = (item.athlete_name || 'TV').split(' ').map(w => w?.[0] || '').join('').slice(0, 2).toUpperCase();
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 group"
                  >
                    <div className="h-1 bg-gradient-to-r from-teal-400 to-cyan-400 group-hover:from-teal-500 group-hover:to-cyan-500 transition-colors" />
                    <div className="p-6">
                      {/* Avatar & Name */}
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-sm font-black shadow-lg shrink-0">
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 text-[15px] truncate">{item.athlete_name || 'Thành viên'}</h4>
                          <p className="text-[11px] text-gray-400 font-medium">{formatTimeAgo(item.start_date)}</p>
                        </div>
                        <span className="text-xl" title={item.type}>{typeIcons[item.type] || '🏃'}</span>
                      </div>

                      {/* Display image if present */}
                      {(item.photo_url || item.image_url) && (
                        <div className="mb-4 rounded-xl overflow-hidden shadow-sm aspect-video bg-gray-100 flex items-center justify-center relative">
                          <img src={item.photo_url || item.image_url} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}

                      {/* Activity Title */}
                      <h3 className="text-[16px] font-black text-gray-800 mb-4 line-clamp-1">{item.name || 'Hoạt động chạy bộ'}</h3>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-4">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Cự ly</p>
                          <p className="text-[17px] font-black text-teal-600">{item.distance}<span className="text-[11px] ml-0.5 text-gray-400 font-medium">km</span></p>
                        </div>
                        <div className="border-l border-gray-200/70 pl-3">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Pace</p>
                          <p className="text-[17px] font-black text-gray-700">{item.pace}<span className="text-[11px] ml-0.5 text-gray-400 font-medium">/km</span></p>
                        </div>
                        <div className="border-l border-gray-200/70 pl-3">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Thời gian</p>
                          <p className="text-[15px] font-bold text-gray-700 mt-0.5">{formatDuration(item.moving_time)}</p>
                        </div>
                      </div>

                      {item.total_elevation_gain > 0 && (
                        <div className="mt-3 flex items-center gap-1.5 text-gray-400 text-[11px] font-medium">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                          Độ cao tăng: {Math.round(item.total_elevation_gain)}m
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {activities.length > showCount && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowCount(prev => prev + 6)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-teal-50 text-teal-700 font-bold text-sm rounded-full border border-teal-200 hover:border-teal-300 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Xem thêm hoạt động ({activities.length - showCount} còn lại)
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
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
