import { useState } from 'react';

export default function Leaderboard() {
  const [tab, setTab] = useState('week');

  const weeklyData = [
    { rank: 1, name: 'Nguyễn Văn Dũng', avatar: '🥇', km: '87.5', pace: "4'35\"", runs: 6, badge: 'Elite' },
    { rank: 2, name: 'Trần Minh Tuấn', avatar: '🥈', km: '72.3', pace: "5'10\"", runs: 5, badge: 'Pro' },
    { rank: 3, name: 'Lê Thị Hương', avatar: '🥉', km: '65.8', pace: "5'45\"", runs: 5, badge: 'Pro' },
    { rank: 4, name: 'Phạm Đức Hải', avatar: '👟', km: '58.2', pace: "5'20\"", runs: 4, badge: 'Active' },
    { rank: 5, name: 'Võ Thanh Lan', avatar: '👟', km: '52.1', pace: "6'00\"", runs: 4, badge: 'Active' },
  ];

  const monthlyData = [
    { rank: 1, name: 'Nguyễn Văn Dũng', avatar: '🥇', km: '342.5', pace: "4'40\"", runs: 24, badge: 'Elite' },
    { rank: 2, name: 'Lê Thị Hương', avatar: '🥈', km: '298.7', pace: "5'35\"", runs: 22, badge: 'Pro' },
    { rank: 3, name: 'Trần Minh Tuấn', avatar: '🥉', km: '275.2', pace: "5'15\"", runs: 20, badge: 'Pro' },
    { rank: 4, name: 'Hoàng Anh Khoa', avatar: '👟', km: '220.0', pace: "5'50\"", runs: 18, badge: 'Active' },
    { rank: 5, name: 'Phạm Đức Hải', avatar: '👟', km: '198.3', pace: "5'25\"", runs: 16, badge: 'Active' },
  ];

  const data = tab === 'week' ? weeklyData : monthlyData;

  const badgeColors = {
    Elite: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white',
    Pro: 'bg-teal-100 text-teal-700',
    Active: 'bg-gray-100 text-gray-600',
  };

  const rankColors = {
    1: 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-[0_4px_15px_rgba(245,158,11,0.4)]',
    2: 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-md',
    3: 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-md',
  };

  return (
    <section id="leaderboard" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-14 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Bảng xếp hạng
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2] break-words">
            Top Runners <span className="text-gradient">vinh danh</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] sm:text-[17px] mt-3 px-2">
            Bảng xếp hạng mô phỏng dữ liệu Strava — Tạo động lực chinh phục từng cung đường
          </p>
        </div>

        {/* Tab Switch */}
        <div className="flex justify-center mb-10 animate-on-scroll">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setTab('week')}
              className={`px-6 py-2.5 text-[13px] font-bold rounded-full transition-all duration-300 ${
                tab === 'week'
                  ? 'bg-teal-500 text-white shadow-[0_4px_15px_rgba(13,180,150,0.3)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Tuần này
            </button>
            <button
              onClick={() => setTab('month')}
              className={`px-6 py-2.5 text-[13px] font-bold rounded-full transition-all duration-300 ${
                tab === 'month'
                  ? 'bg-teal-500 text-white shadow-[0_4px_15px_rgba(13,180,150,0.3)]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Tháng này
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="animate-on-scroll bg-white rounded-[1.5rem] border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.06)] overflow-hidden">
          {/* Header row */}
          <div className="hidden sm:grid grid-cols-[60px_1fr_100px_100px_80px_90px] gap-4 px-6 py-4 bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
            <span className="text-center">#</span>
            <span>Runner</span>
            <span className="text-center">Tổng KM</span>
            <span className="text-center">Avg Pace</span>
            <span className="text-center">Runs</span>
            <span className="text-center">Level</span>
          </div>

          {/* Rows */}
          {data.map((runner, i) => (
            <div
              key={`${tab}-${runner.name}`}
              className={`grid grid-cols-[auto_1fr] sm:grid-cols-[60px_1fr_100px_100px_80px_90px] gap-3 sm:gap-4 items-center px-5 sm:px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-teal-50/30 transition-colors group ${
                i === 0 ? 'bg-teal-50/20' : ''
              }`}
            >
              {/* Rank */}
              <div className="flex justify-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-black ${
                    rankColors[runner.rank] || 'bg-gray-100 text-gray-500'
                  } ${runner.rank === 1 ? 'rank-pulse' : ''}`}
                >
                  {runner.rank}
                </div>
              </div>

              {/* Runner info */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl">{runner.avatar}</span>
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 text-[14px] truncate">{runner.name}</p>
                  {/* Mobile-only stats */}
                  <div className="flex items-center gap-3 mt-0.5 sm:hidden">
                    <span className="text-[12px] text-teal-600 font-bold">{runner.km} km</span>
                    <span className="text-[12px] text-gray-400">{runner.pace}/km</span>
                  </div>
                </div>
              </div>

              {/* Desktop-only columns */}
              <div className="hidden sm:flex justify-center">
                <span className="font-black text-teal-600 text-[16px]">{runner.km}</span>
              </div>
              <div className="hidden sm:flex justify-center">
                <span className="text-gray-600 font-semibold text-[14px]">{runner.pace}/km</span>
              </div>
              <div className="hidden sm:flex justify-center">
                <span className="text-gray-500 font-medium text-[14px]">{runner.runs}</span>
              </div>
              <div className="hidden sm:flex justify-center">
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${badgeColors[runner.badge]}`}>
                  {runner.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Strava integration note */}
        <div className="mt-8 text-center animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-5 py-2.5 border border-gray-100">
            <svg className="w-5 h-5 text-[#FC4C02]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 4.116zM7.478 14.43h3.064L15.387 3.04l-4.845 11.39h3.064L8.762 3.04 7.478 14.43z" />
            </svg>
            <span className="text-[13px] text-gray-500 font-medium">
              Dữ liệu đồng bộ từ <strong className="text-gray-700">Strava</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
