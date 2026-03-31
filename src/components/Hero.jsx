import useClubInfo from '../hooks/useClubInfo';
import coverImg from '../assets/IMG_5055.jpg';

export default function Hero() {
  const { clubInfo } = useClubInfo();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={coverImg}
          alt={clubInfo?.name || "Nhóm người chạy bộ lúc bình minh"}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/90" />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-5 py-2.5 mb-10">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          <span className="text-white/80 text-sm font-medium tracking-wide">
            Hơn {clubInfo?.member_count || 0} thành viên đang hoạt động
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black text-white leading-[1.15] mb-4 tracking-tight break-words">
          The Ultimate Running Heroes
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-teal-300">
            {clubInfo?.name || "Long An Runners Club"}
          </span>
        </p>

        <p className="text-[15px] sm:text-xl text-white/80 max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed font-medium px-2">
          {clubInfo?.description || (
            <>
              Cùng nhau chinh phục mọi nẻo đường, từ Bến Lức vươn xa.
              <br className="hidden sm:block" />
              Khơi dậy lối sống năng động cho mọi người.
            </>
          )}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full px-4">
          <a
            href="#about"
            className="group px-8 py-4 border-2 border-white/25 text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 text-[15px]"
          >
            Tìm hiểu thêm
            <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid grid-cols-3 max-w-lg mx-auto gap-8">
          {[
            { num: clubInfo?.member_count ? `${clubInfo.member_count}+` : '1.100+', label: 'Thành viên' },
            { num: '2022', label: 'Thành lập' },
            { num: '50+', label: 'Sự kiện' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white">{s.num}</p>
              <p className="text-xs text-white/50 font-semibold uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Cuộn xuống</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
