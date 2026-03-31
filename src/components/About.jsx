import useClubInfo from '../hooks/useClubInfo';
import aboutImg from '../assets/18-6-2023 OFFLINE CLB LONG AN RUNNERS.jpg';

export default function About() {
  const { clubInfo } = useClubInfo();
  const timeline = [
    {
      year: '2022',
      title: 'Tiền Phong Marathon — Côn Đảo',
      description:
        'Khởi đầu với tên gọi "Bến Lức Runner" chỉ gồm 3 thành viên ban đầu, cùng nhau tham gia giải Tiền Phong Marathon tại Côn Đảo.',
    },
    {
      year: '2023',
      title: 'Phát triển & mở rộng',
      description:
        'Phát triển thành Long An Running Club với mong muốn lan tỏa phong trào chạy bộ toàn tỉnh Long An.',
    },
    {
      year: '2024',
      title: 'Long An Runners Club',
      description:
        'Chính thức đổi tên thành Long An Runners Club với hơn 1.100 thành viên, trở thành CLB chạy bộ lớn nhất tỉnh.',
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-20 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Về chúng tôi
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 leading-tight">
            Câu chuyện{' '}
            <span className="text-gradient">Long An Runners</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg mt-4">
            Từ 3 thành viên ban đầu đến cộng đồng chạy bộ lớn nhất tỉnh Long An
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-28">
          {/* Left - Image */}
          <div className="animate-slide-left relative mb-8 lg:mb-0">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <img
                src={aboutImg}
                alt="Thành viên Long An Runners Club"
                className="w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-teal-500 rounded-tl-2xl opacity-60" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-teal-500 rounded-br-2xl opacity-60" />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="glass rounded-2xl p-4 shadow-sm border border-gray-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-md shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Người đại diện</p>
                    <p className="font-bold text-gray-800 text-sm whitespace-nowrap">Bùi Thịnh An</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-4 shadow-sm border border-gray-100 bg-white flex items-center gap-2 h-full">
                <svg className="w-5 h-5 text-teal-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Hoạt động tại</span>
                  <span className="text-sm font-bold text-gray-800 whitespace-nowrap">Khu đô thị Water Point - Bến Lức, Long An</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div className="animate-slide-right">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-800 mb-6 leading-tight">
              Xây dựng cộng đồng chạy bộ
              <br />
              <span className="text-gradient">an toàn & hòa nhập</span>
            </h3>
            <p className="text-gray-500 leading-[1.8] mb-8 text-[16px]">
              {clubInfo?.name || "Câu lạc bộ chạy bộ Long An"} là cộng đồng thể thao năng động với hơn{' '}
              <span className="text-teal-500 font-bold">{clubInfo?.member_count || "1.100"} thành viên</span>, hoạt
              động chính tại <span className="font-bold text-gray-700">{clubInfo?.city ? `${clubInfo.city} — ${clubInfo.state}` : "Bến Lức — Long An"}</span>.
              Chúng tôi kết nối những người yêu thích chạy bộ mọi lứa tuổi và trình độ — từ người mới bắt đầu đến Elite — cùng nhau rèn luyện
              sức khỏe và lan tỏa lối sống tích cực đến cộng đồng.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: '👥', num: clubInfo?.member_count ? `${clubInfo.member_count}+` : '1.100+', label: 'Thành viên' },
                { icon: '📅', num: '2022', label: 'Năm thành lập' },
                { icon: '🏅', num: '50+', label: 'Sự kiện tổ chức' },
                { icon: '📍', num: clubInfo?.city || 'Bến Lức', label: clubInfo?.state || 'Long An' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl hover:bg-teal-50 transition-colors group">
                  <span className="text-xl group-hover:scale-110 transition-transform">{s.icon}</span>
                  <div>
                    <p className="text-lg font-black text-gray-800 leading-none">{s.num}</p>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="animate-on-scroll max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-800 text-center mb-14">
            Hành trình phát triển
          </h3>

          <div className="relative">
            {/* Line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-200 via-teal-500 to-teal-300 rounded-full" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {timeline.map((item) => (
                <div key={item.year} className="relative pt-10 md:pt-14 text-center group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="hidden md:flex absolute top-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-white border-[3px] border-teal-500 rounded-full items-center justify-center group-hover:bg-teal-500 transition-colors z-10">
                    <div className="w-2 h-2 bg-teal-500 rounded-full group-hover:bg-white transition-colors" />
                  </div>
                  <span className="inline-block px-4 py-1.5 bg-teal-500 text-white text-sm font-bold rounded-full mb-4 shadow-md">
                    {item.year}
                  </span>
                  <h4 className="text-[16px] font-bold text-gray-800 mb-3">{item.title}</h4>
                  <p className="text-gray-500 text-[14px] leading-relaxed break-words">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
