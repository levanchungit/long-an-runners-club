export default function Vision() {
  const cards = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: 'Tầm nhìn & Sứ mệnh',
      description:
        'Giúp cộng đồng tích cực vận động, thay đổi tư duy về sức khỏe và xây dựng lối sống năng động hơn. Chúng tôi mong muốn mỗi người dân Long An đều có thể tiếp cận và yêu thích bộ môn chạy bộ.',
      accent: 'from-orange-500 to-amber-500',
      iconBg: 'bg-orange-100 text-orange-600',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: 'Văn hóa cốt lõi',
      description:
        'Đoàn kết, giúp đỡ lẫn nhau, không vụ lợi và luôn làm những điều tốt nhất cho cộng đồng. Tại Long An Runners, mỗi thành viên là một phần không thể thiếu trong gia đình chạy bộ.',
      accent: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-100 text-blue-600',
    },
  ];

  const values = [
    { icon: '🏃', text: 'Rèn luyện sức khỏe', desc: 'Mỗi bước chạy là một bước gần hơn tới sức khỏe' },
    { icon: '🤝', text: 'Kết nối cộng đồng', desc: 'Gắn kết qua từng cung đường chạy bộ' },
    { icon: '🎯', text: 'Chinh phục mục tiêu', desc: 'Không giới hạn, luôn vươn xa hơn' },
    { icon: '💪', text: 'Vượt qua giới hạn', desc: 'Thử thách bản thân mỗi ngày' },
  ];

  return (
    <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 bg-dots opacity-40" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Giá trị cốt lõi
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2] break-words">
            Tầm nhìn & <span className="text-gradient">Văn hóa</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] sm:text-[17px] mt-3 px-2">
            Những giá trị định hình nên Long An Runners Club
          </p>
        </div>

        {/* Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`animate-on-scroll ${i === 1 ? 'delay-200' : ''} group relative bg-white rounded-[1.5rem] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100/80 hover:-translate-y-1 overflow-hidden`}
            >
              {/* Gradient accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className={`w-14 h-14 ${card.iconBg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                {card.icon}
              </div>
              <h3 className="text-[20px] sm:text-[22px] font-bold text-gray-800 mb-3 leading-snug break-words">
                {card.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-on-scroll">
          {values.map((v, i) => (
            <div
              key={v.text}
              className={`delay-${(i + 1) * 100} group flex flex-col items-center text-center gap-3 p-6 bg-white rounded-2xl shadow-sm hover:shadow-[0_10px_30px_rgba(255,107,53,0.12)] transition-all duration-300 hover:-translate-y-1 border border-gray-100/50`}
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300 block">
                {v.icon}
              </span>
              <span className="text-sm font-bold text-gray-800">
                {v.text}
              </span>
              <span className="text-xs text-gray-400 leading-relaxed hidden sm:block">
                {v.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
