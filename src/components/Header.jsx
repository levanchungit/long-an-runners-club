import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Trang chủ', href: '#hero' },
    { label: 'Giới thiệu', href: '#about' },
    { label: 'Lịch tập', href: '#programs' },
    { label: 'Sự kiện', href: '#events' },
    { label: 'Xếp hạng', href: '#leaderboard' },
    { label: 'Hội viên', href: '#membership' },
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
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled
                ? 'bg-gradient-to-br from-teal-500 to-teal-600 shadow-md'
                : 'bg-white/15 backdrop-blur-sm border border-white/20'
            }`}
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className={`text-[17px] font-extrabold tracking-tight transition-colors duration-300 ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              Long An <span className="text-teal-500">Runners</span>
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
          <a
            href="#membership"
            className="ml-3 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-[12px] font-bold rounded-full shadow-[0_4px_15px_rgba(13,180,150,0.4)] hover:shadow-[0_6px_20px_rgba(13,180,150,0.5)] hover:translate-y-[-1px] active:translate-y-0 transition-all duration-200"
          >
            Tham gia ngay
          </a>
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
          <a
            href="#membership"
            onClick={() => setMobileOpen(false)}
            className="mt-4 w-full text-center px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-[13px] font-bold rounded-full shadow-lg"
          >
            Tham gia ngay
          </a>
        </nav>
      </div>
    </header>
  );
}
