import { useEventsData } from '../hooks/useEventsData';

// Skeleton card khi đang tải data
function SkeletonCard() {
  return (
    <div className="group relative bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col animate-pulse">
      <div className="h-[200px] bg-gray-200" />
      <div className="p-6 flex-1 flex flex-col gap-3">
        <div className="h-3 bg-gray-200 rounded-full w-1/3" />
        <div className="h-5 bg-gray-200 rounded-full w-4/5" />
        <div className="h-4 bg-gray-200 rounded-full w-3/5" />
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-14 bg-gray-200 rounded-full" />
          <div className="h-6 w-14 bg-gray-200 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const { races, loading, error } = useEventsData();

  return (
    <section id="events" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Sự kiện
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2] break-words">
            Giải chạy <span className="text-gradient">sắp tới</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] sm:text-[17px] mt-3 px-2">
            Đăng ký tham gia các giải chạy lớn cùng Long An Runners Club
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="text-center py-12 text-red-500 bg-red-50 rounded-2xl border border-red-100">
            <svg className="w-8 h-8 mx-auto mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="font-semibold">Không thể tải dữ liệu giải chạy.</p>
            <p className="text-sm text-red-400 mt-1">{error}</p>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && !error && (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && races.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-10 h-10 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="font-semibold text-gray-500">Chưa có giải chạy nào được lên lịch.</p>
            <p className="text-sm mt-1">Hãy quay lại sau nhé!</p>
          </div>
        )}

        {!loading && !error && races.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {races.map((race, i) => (
              <div
                key={race.name + race.date}
                className={`animate-on-scroll delay-${Math.min((i + 1) * 100, 500)} group relative bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-100 flex flex-col hover:-translate-y-1`}
              >
                {/* Featured badge */}
                {race.featured && (
                  <div className="absolute top-5 right-5 z-20 px-3 py-1.5 bg-gradient-to-r from-teal-500 to-teal-400 text-white text-xs font-bold rounded-full shadow-[0_4px_15px_rgba(13,180,150,0.4)] flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Hot
                  </div>
                )}

                {/* Image */}
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={race.image}
                    alt={race.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />

                  {/* Date overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                      <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[11px] font-bold text-gray-800">{race.date}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[12px] mb-3">
                    <svg className="w-3.5 h-3.5 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="font-medium">{race.location}</span>
                  </div>

                  <h3 className="text-[16px] sm:text-[18px] font-bold text-gray-800 mb-4 leading-snug group-hover:text-teal-600 transition-colors break-words">
                    {race.name}
                  </h3>

                  {/* Distance Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 flex-1">
                    {race.distances.map((d) => (
                      <div key={d.km} className="flex flex-col items-center">
                        <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${d.color}`}>
                          {d.km}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium mt-1">{d.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Register link */}
                  <a
                    href={race.registerUrl || '#'}
                    target={race.registerUrl && race.registerUrl !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="pt-4 border-t border-gray-100 flex items-center text-teal-500 font-semibold text-sm cursor-pointer group/link w-fit"
                  >
                    Đăng ký ngay
                    <svg className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
