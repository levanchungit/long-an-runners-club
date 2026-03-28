export default function Gallery() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80',
      alt: 'Vận động viên chạy marathon',
      height: 'h-[18rem]',
    },
    {
      src: 'https://images.unsplash.com/photo-1502224562085-6dfe2f6de48b?w=800&q=80',
      alt: 'Chạy bộ công viên',
      height: 'h-[14rem]',
    },
    {
      src: 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=800&q=80',
      alt: 'Giải marathon phong trào',
      height: 'h-[20rem]',
    },
    {
      src: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=800&q=80',
      alt: 'Tập luyện chạy bộ',
      height: 'h-[16rem]',
    },
    {
      src: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
      alt: 'Chạy bộ hoàng hôn',
      height: 'h-[22rem]',
    },
    {
      src: 'https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?w=800&q=80',
      alt: 'Phong trào chạy bộ cộng đồng',
      height: 'h-[18rem]',
    },
    {
      src: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&q=80',
      alt: 'Đường chạy marathon',
      height: 'h-[16rem]',
    },
    {
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      alt: 'Khoảnh khắc về đích',
      height: 'h-[20rem]',
    },
  ];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-gray-50 relative">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Thư viện
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2] break-words">
            Khoảnh khắc <span className="text-gradient">đáng nhớ</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] sm:text-[17px] mt-3 px-2">
            Ghi lại những bước chạy tự hào trên mọi cung đường của CLB
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid animate-on-scroll">
          {images.map((img, i) => (
            <div
              key={i}
              className="masonry-item group relative overflow-hidden rounded-[1.25rem] cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full ${img.height} object-cover group-hover:scale-105 transition-transform duration-700 ease-out bg-gray-200`}
                loading="lazy"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Text Area */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-bold text-[15px] leading-snug drop-shadow-md">
                  {img.alt}
                </p>
              </div>

              {/* View Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75 shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
