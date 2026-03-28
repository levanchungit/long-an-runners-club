export default function Activities() {
  const schedule = [
    {
      day: 'Thứ Tư',
      tag: 'Quality',
      time: '17:30 — 19:00',
      title: 'Interval & Tempo',
      description: 'Chạy interval/tempo tại sân vận động. Nâng cao tốc độ và ngưỡng lactate cho bạn.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      gradient: 'from-teal-500 to-cyan-500',
      bg: 'bg-teal-50',
      intensity: 'Cao',
      intensityColor: 'text-red-500 bg-red-50',
    },
    {
      day: 'Thứ Năm',
      tag: 'City Run',
      time: '17:30 — 19:00',
      title: 'Chạy nhẹ nhàng thư giãn',
      description: 'Chạy nhẹ qua các con phố tại Bến Lức. Giao lưu, kết nối thành viên mới và tận hưởng buổi chiều.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0H21" />
        </svg>
      ),
      gradient: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50',
      intensity: 'Nhẹ',
      intensityColor: 'text-green-600 bg-green-50',
    },
    {
      day: 'Chủ Nhật',
      tag: 'Long Run',
      time: '05:00 — 07:30',
      title: 'Buổi chạy dài cuối tuần',
      description: 'Buổi chạy dài chuẩn bị cho Marathon. Xây dựng nền tảng thể lực và sức bền đường dài.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      intensity: 'Trung bình',
      intensityColor: 'text-amber-600 bg-amber-50',
    },
  ];

  return (
    <section id="programs" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Lịch tập luyện
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2] break-words">
            Chương trình & <span className="text-gradient">Hoạt động</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] sm:text-[17px] mt-3 px-2">
            Lịch tập luyện hàng tuần được thiết kế khoa học, phù hợp với mọi trình độ
          </p>
        </div>

        {/* Weekly Schedule Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {schedule.map((item, i) => (
            <div
              key={item.day}
              className={`animate-on-scroll delay-${(i + 1) * 100} group relative bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-100 hover:-translate-y-2`}
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${item.gradient}`} />

              <div className="p-7">
                {/* Day & Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">{item.day}</p>
                      <p className="text-[11px] text-gray-400 font-medium">{item.time}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${item.intensityColor}`}>
                    {item.intensity}
                  </span>
                </div>

                {/* Tag pill */}
                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${item.gradient} text-white text-[11px] font-bold rounded-full mb-4`}>
                  {item.tag}
                </span>

                <h3 className="text-[18px] font-bold text-gray-800 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center animate-on-scroll">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Lịch tập có thể thay đổi tùy điều kiện thời tiết. Theo dõi fanpage để cập nhật.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
