import { useState, useEffect } from 'react';
import useClubInfo from '../hooks/useClubInfo';
import logoImg from '../assets/logo.jpg';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { clubInfo } = useClubInfo();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Trang chủ', href: '#hero' },
    { label: 'Giới thiệu', href: '#about' },
    { label: 'Thành tích', href: '#last-week-leaders' },
    { label: 'Xếp hạng', href: '#leaderboard' },
    { label: 'Hoạt động', href: '#recent-activities' },
    { label: 'Thành viên', href: '#members' },
    { label: 'Sự kiện', href: '#events' },
    { label: 'Hình ảnh', href: '#gallery' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-[0_2px_30px_rgba(0,0,0,0.08)] py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden ${
              scrolled
                ? 'bg-gradient-to-br from-teal-500 to-teal-600 shadow-md'
                : 'bg-white/15 backdrop-blur-sm border border-white/20'
            }`}
          >
            <img src={logoImg} alt="Long An Runners Club Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className={`text-[17px] font-extrabold tracking-tight transition-colors duration-300 ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              {clubInfo?.name || "Long An Runners"}
            </span>
            <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${scrolled ? 'text-gray-400' : 'text-white/50'}`}>
              Running Club
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-3 py-2 text-[12px] font-semibold tracking-wide uppercase transition-colors rounded-lg hover:text-teal-500 ${
                scrolled ? 'text-gray-600 hover:bg-teal-50' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`xl:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
            scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h10M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`xl:hidden fixed inset-0 top-[56px] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`xl:hidden fixed top-[56px] right-0 w-72 h-[calc(100vh-56px)] bg-white shadow-2xl transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="p-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-gray-700 font-semibold text-[14px] uppercase py-3 px-4 rounded-xl hover:bg-teal-50 hover:text-teal-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
