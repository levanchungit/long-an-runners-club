import { useState } from 'react';
import useClubInfo from '../hooks/useClubInfo';

export default function Footer() {
  const { clubInfo } = useClubInfo();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer id="footer" className="bg-gray-900 text-white relative">
      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gray-50 [clip-path:ellipse(60%_100%_at_50%_0%)]" />

      {/* CTA Banner */}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 mt-[-3rem] z-10 pt-16">
        <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(13,180,150,0.3)] border border-teal-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700" />

          {/* Abstract circles */}
          <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-white/10 blur-3xl mix-blend-overlay" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-teal-300/20 blur-3xl mix-blend-overlay" />

          <div className="relative p-8 sm:p-14 md:p-16 text-center flex flex-col items-center md:flex-row md:items-center md:justify-between md:text-left gap-6 md:gap-8">
            <div className="max-w-xl flex-1">
              <h2 className="text-[26px] sm:text-3xl md:text-4xl font-black text-white mb-3 md:mb-4 leading-[1.2] break-words">
                Sẵn sàng bắt đầu hành trình?
              </h2>
              <p className="text-white/80 text-[14px] sm:text-[16px] leading-relaxed break-words">
                Tham gia <strong className="text-white">{clubInfo?.name || "Long An Runners Club"}</strong> ngay hôm nay và trở thành một phần của cộng đồng chạy bộ năng động nhất tỉnh Long An.
              </p>
            </div>
            <a
              href="https://zalo.me/g/zkotdw991"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 px-8 py-4 bg-white text-teal-600 font-bold text-[15px] rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              Liên hệ tham gia
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                {clubInfo?.profile_medium ? (
                  <img src={clubInfo.profile_medium} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
                  </svg>
                )}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[17px] font-extrabold tracking-tight text-white">
                  {clubInfo?.name || "Long An Runners"}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Running Club
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-[14px] leading-relaxed mb-8 pr-4">
              {clubInfo?.description || "Cộng đồng chạy bộ năng động nhất tỉnh Long An. Cùng nhau rèn luyện, chia sẻ và chinh phục mọi nẻo đường."}
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 border border-gray-700 hover:bg-teal-500 hover:border-teal-500 text-gray-300 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.strava.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 border border-gray-700 hover:bg-teal-500 hover:border-teal-500 text-gray-300 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm"
                aria-label="Strava"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 4.116zM7.478 14.43h3.064L15.387 3.04l-4.845 11.39h3.064L8.762 3.04 7.478 14.43z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-[13px] tracking-widest">
              Liên hệ
            </h4>
            <ul className="space-y-4 text-gray-400 text-[14px]">
              <li className="flex items-start gap-3 w-full">
                <svg className="w-4 h-4 mt-1 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-snug flex-1 break-words">
                  ĐCT01, Bến Lức<br />
                  Tỉnh Long An, Việt Nam
                </span>
              </li>
              <li className="flex items-center gap-3 w-full">
                <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="flex-1 break-words">Bùi Thịnh An (Đại diện)</span>
              </li>
              <li className="flex items-center gap-3 w-full">
                <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="flex-1 break-all">contact@longanrunners.club</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-[13px] tracking-widest">
              Khám phá
            </h4>
            <ul className="space-y-3 text-gray-400 text-[14px]">
              {[
                { label: 'Trang chủ', href: '#hero' },
                { label: 'Giới thiệu', href: '#about' },
                { label: 'Lịch tập', href: '#programs' },
                { label: 'Sự kiện', href: '#events' },
                { label: 'Xếp hạng', href: '#leaderboard' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-teal-400 transition-colors flex items-center gap-1.5 group">
                    {link.label}
                    <svg className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-[13px] tracking-widest">
              Bản tin
            </h4>
            <p className="text-gray-400 text-[14px] leading-relaxed mb-5">
              Đăng ký nhận tin tức mới nhất về sự kiện, giải chạy và cộng đồng.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-[14px] text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white text-[13px] font-bold rounded-xl hover:shadow-[0_4px_20px_rgba(13,180,150,0.4)] transition-all"
              >
                {subscribed ? '✓ Đã đăng ký!' : 'Đăng ký nhận tin'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-[13px]">
            &copy; {new Date().getFullYear()} <span className="text-gray-400 font-semibold">{clubInfo?.name || "Long An Runners Club"}</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-gray-500">
            <a href="#" className="hover:text-teal-400 transition-colors">Bảo mật</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Điều khoản</a>
            <span className="flex items-center gap-1">
              Phát triển với <span className="text-red-500">♥</span> tại Việt Nam
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
