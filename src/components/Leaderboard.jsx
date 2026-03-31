import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, getDocs } from 'firebase/firestore';
import { db, hasFirebaseConfig } from '../firebase';

export default function Leaderboard() {
  const [tab, setTab] = useState('week');
  const [loading, setLoading] = useState(true);
  const [avatarMap, setAvatarMap] = useState({});

  const fallbackData = {
    week: [
      { rank: 1, name: 'Mạnh Huỳnh', avatar: '🥇', km: 15.1, pace: "7'05\"", runs: 1, badge: 'Active', elev: 82, longest: 15.1 },
      { rank: 2, name: 'Tuấn Nguyễn', avatar: '🥈', km: 12.1, pace: "6'43\"", runs: 1, badge: 'Active', elev: 3, longest: 12.1 },
      { rank: 3, name: 'Thang Luc', avatar: '🥉', km: 10.3, pace: "7'32\"", runs: 1, badge: 'Active', elev: 0, longest: 10.3 },
    ],
    last_week: [],
    month: [],
  };

  const [leaderboard, setLeaderboard] = useState(fallbackData);

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
        } catch (e) {
          console.warn("Could not fetch avatars:", e);
        }
      };
      
      fetchAvatars();

      const q = query(collection(db, 'leaderboard'));
      const unsub = onSnapshot(q, (snap) => {
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        console.log("Leaderboard docs loaded:", docs.length);
        if (docs.length > 0) {
          const sortByRank = (arr) => arr.sort((a, b) => (a.rank || 999) - (b.rank || 999));
          setLeaderboard({
            week: sortByRank(docs.filter(d => d.type === 'week')),
            last_week: sortByRank(docs.filter(d => d.type === 'last_week')),
            month: sortByRank(docs.filter(d => d.type === 'month')),
          });
        }
        setLoading(false);
      }, (err) => { console.error("Leaderboard error:", err); setLoading(false); });
      return () => unsub();
    } catch (e) { console.error("Leaderboard listen error:", e); setLoading(false); }
  }, []);

  const data = leaderboard[tab] || [];
  const list = data.length > 0 ? data : (fallbackData[tab] || []);

  const tabs = [
    { key: 'last_week', label: 'Tuần trước' },
    { key: 'week', label: 'Tuần này' },
    { key: 'month', label: 'Tháng này' },
  ];

  const badgeColors = {
    Elite: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white',
    Pro: 'bg-teal-100 text-teal-700',
    Active: 'bg-gray-100 text-gray-600',
  };

  const rankStyles = {
    1: 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-[0_4px_15px_rgba(245,158,11,0.4)]',
    2: 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-md',
    3: 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-md',
  };

  return (
    <section id="leaderboard" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 animate-on-scroll">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            {hasFirebaseConfig && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" /></span>}
            Bảng xếp hạng
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2]">
            Top Runners <span className="text-gradient">vinh danh</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] sm:text-[17px] mt-3">
            Bảng xếp hạng đồng bộ trực tiếp với Strava — Tạo động lực chinh phục từng cung đường
          </p>
        </div>

        {/* Tab Switch */}
        <div className="flex justify-center mb-10 animate-on-scroll">
          <div className="inline-flex bg-gray-100 rounded-full p-1 gap-0.5">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-5 sm:px-6 py-2.5 text-[12px] sm:text-[13px] font-bold rounded-full transition-all duration-300 ${
                  tab === t.key
                    ? 'bg-teal-500 text-white shadow-[0_4px_15px_rgba(13,180,150,0.3)]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="animate-on-scroll bg-white rounded-[1.5rem] border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.06)] overflow-hidden min-h-[200px] relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
            </div>
          )}

          {/* Desktop Header */}
          <div className="hidden lg:grid grid-cols-[50px_1fr_90px_90px_90px_70px_70px_80px] gap-3 px-6 py-4 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
            <span className="text-center">#</span>
            <span>Vận động viên</span>
            <span className="text-center">Quãng đường</span>
            <span className="text-center">Dài nhất</span>
            <span className="text-center">Nhịp độ TB</span>
            <span className="text-center">Số lần</span>
            <span className="text-center">Độ cao</span>
            <span className="text-center">Level</span>
          </div>

          {list.map((r, i) => (
            <div
              key={`${tab}-${r.name}-${i}`}
              className={`grid grid-cols-[auto_1fr] lg:grid-cols-[50px_1fr_90px_90px_90px_70px_70px_80px] gap-3 items-center px-5 lg:px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-teal-50/30 transition-colors ${i === 0 ? 'bg-teal-50/20' : ''}`}
            >
              {/* Rank */}
              <div className="flex justify-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-black ${rankStyles[r.rank] || 'bg-gray-100 text-gray-500'} ${r.rank === 1 ? 'rank-pulse' : ''}`}>
                  {r.rank}
                </div>
              </div>

              {/* Name */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 overflow-hidden shadow-sm border border-gray-200">
                  {avatarMap[r.name] && avatarMap[r.name].length > 10 ? (
                    <img src={avatarMap[r.name]} alt={r.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl">{r.avatar || '🏃'}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 text-[14px] truncate">{r.name}</p>
                  <div className="flex items-center gap-3 mt-0.5 lg:hidden">
                    <span className="text-[12px] text-teal-600 font-bold">{r.km} km</span>
                    <span className="text-[12px] text-gray-400">{r.pace}/km</span>
                    {r.elev > 0 && <span className="text-[12px] text-gray-400">↑{r.elev}m</span>}
                  </div>
                </div>
              </div>

              {/* Desktop columns */}
              <div className="hidden lg:flex justify-center"><span className="font-black text-teal-600 text-[15px]">{r.km}<span className="text-[11px] text-gray-400 ml-0.5">km</span></span></div>
              <div className="hidden lg:flex justify-center"><span className="text-gray-600 font-semibold text-[13px]">{r.longest || r.km}<span className="text-[11px] text-gray-400 ml-0.5">km</span></span></div>
              <div className="hidden lg:flex justify-center"><span className="text-gray-600 font-semibold text-[13px]">{r.pace}/km</span></div>
              <div className="hidden lg:flex justify-center"><span className="text-gray-500 font-medium text-[13px]">{r.runs || 0}</span></div>
              <div className="hidden lg:flex justify-center"><span className="text-gray-500 font-medium text-[13px]">{r.elev || 0}<span className="text-[10px] text-gray-400 ml-0.5">m</span></span></div>
              <div className="hidden lg:flex justify-center">
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${badgeColors[r.badge] || badgeColors['Active']}`}>
                  {r.badge || 'Active'}
                </span>
              </div>
            </div>
          ))}

          {list.length === 0 && !loading && (
            <div className="py-16 text-center text-gray-400 italic">Chưa có dữ liệu cho khoảng thời gian này.</div>
          )}
        </div>

        {/* Strava link */}
        <div className="mt-8 text-center animate-on-scroll">
          <a href="https://www.strava.com/clubs/longanrunner" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-5 py-2.5 border border-gray-100 hover:bg-gray-100 transition-colors hover:-translate-y-0.5 shadow-sm">
            <svg className="w-5 h-5 text-[#FC4C02]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 4.116zM7.478 14.43h3.064L15.387 3.04l-4.845 11.39h3.064L8.762 3.04 7.478 14.43z" />
            </svg>
            <span className="text-[13px] text-gray-500 font-medium">
              Dữ liệu đồng bộ trực tiếp từ <strong className="text-gray-700">Strava Club</strong>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
