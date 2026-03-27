export default function Activities() {
  const events = [
    {
      image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f45cc?w=800&q=80',
      tag: 'Hoạt động nội bộ',
      title: 'Các buổi Offline hội viên',
      description:
        'Duy trì thói quen qua các buổi tập luyện cuối tuần. Đây là nơi hội viên được kết nối, chia sẻ kinh nghiệm và cùng nhau tiến bộ.',
      status: 'Hàng tuần',
      statusColor: 'bg-blue-100 text-blue-600',
    },
    {
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      tag: 'Sự kiện nổi bật',
      title: 'Giải chạy "Ngắm Hoàng Hôn Bên Sông Vàm Cỏ"',
      description:
        'Giải đấu do CLB phối hợp tổ chức, kết hợp giữa thể thao và vẻ đẹp thiên nhiên sông nước miền Tây, thu hút hàng trăm VĐV.',
      status: 'Thường niên',
      statusColor: 'bg-orange-100 text-orange-600',
      featured: true,
    },
  ];

  return (
    <section id="activities" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Hoạt động
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2] break-words">
            Sự kiện & <span className="text-gradient">Hoạt động</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] sm:text-[17px] mt-3 px-2">
            Những khoảnh khắc đáng tự hào của Long An Runners Club
          </p>
        </div>

        {/* Events Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {events.map((event, i) => (
            <div
              key={event.title}
              className={`animate-on-scroll ${i === 1 ? 'delay-200' : ''} group relative bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-100 flex flex-col hover:-translate-y-1`}
            >
              {/* Featured badge */}
              {event.featured && (
                <div className="absolute top-5 right-5 z-20 px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full shadow-[0_4px_15px_rgba(255,107,53,0.4)] flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Nổi bật
                </div>
              )}

              {/* Image Frame */}
              <div className="relative h-[280px] sm:h-[320px] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/10 to-transparent" />
                
                {/* Tag */}
                <span className="absolute bottom-5 left-5 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                  {event.tag}
                </span>
              </div>

              {/* Content block */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ${event.statusColor}`}>
                    {event.status}
                  </span>
                </div>
                <h3 className="text-[18px] sm:text-[22px] font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors leading-[1.3] break-words">
                  {event.title}
                </h3>
                <p className="text-gray-500 text-[14px] sm:text-[15px] leading-[1.6] flex-1">
                  {event.description}
                </p>
                
                {/* Optional "See more" link placeholder */}
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center text-orange-500 font-semibold text-sm group/link cursor-pointer w-fit">
                  Tìm hiểu chi tiết
                  <svg className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
