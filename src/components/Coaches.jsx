import { useState, useEffect, useCallback } from 'react';
import imgAn from '../assets/chunhiemclb/chunhiemclb.jpg';
import imgPhat from '../assets/chunhiemclb/phochunhiem1.jpg';
import imgNguyen from '../assets/chunhiemclb/phochunhiem2.jpg';
import imgDat from '../assets/chunhiemclb/phochunhiem3.jpg';

export default function Coaches() {
  const coaches = [
    {
      name: 'Bùi Thịnh An',
      role: 'Chủ nhiệm CLB',
      specialty: 'Ban Quản Trị',
      image: imgAn,
      bio: 'Cam kết dẫn dắt, giữ lửa và phát triển CLB bền vững',
    },
    {
      name: 'Vũ Đăng Phát',
      role: 'Phó Chủ nhiệm',
      specialty: 'Ban Quản Trị',
      image: imgPhat,
      bio: 'Học hỏi – trao đổi – nâng cấp đội ngũ',
    },
    {
      name: 'Nguyễn Lương Thanh Nguyên',
      role: 'Phó Chủ nhiệm',
      specialty: 'Ban Quản Trị',
      image: imgNguyen,
      bio: 'Lan tỏa chạy bộ đến cộng đồng',
    },
    {
      name: 'Nguyễn Tấn Đạt',
      role: 'Phó Chủ nhiệm',
      specialty: 'Ban Quản Trị',
      image: imgDat,
      bio: 'Cống hiến hết mình cho tập thể',
    },
  ];

  const testimonials = [
    {
      name: 'Anh Khoa',
      role: 'Hội viên từ 2023',
      quote: 'Tham gia LARC là quyết định thay đổi cuộc đời tôi. Từ một người không thể chạy 1km, nay tôi đã hoàn thành Half Marathon đầu tiên!',
      avatar: '🏃‍♂️',
    },
    {
      name: 'Chị Thanh Lan',
      role: 'Hội viên từ 2022',
      quote: 'Không chỉ rèn sức khỏe, LARC còn cho tôi một gia đình thứ hai. Mỗi buổi chạy là một lần được kết nối và chia sẻ.',
      avatar: '🏃‍♀️',
    },
    {
      name: 'Anh Minh',
      role: 'Hội viên từ 2024',
      quote: 'Đội ngũ Pacer chuyên nghiệp, lịch tập khoa học, và cộng đồng tuyệt vời. Tôi giảm 15kg sau 8 tháng tham gia CLB!',
      avatar: '💪',
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  return (
    <section id="coaches" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* ===== Coaches ===== */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Core Team
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2] break-words">
            Ban quản trị <span className="text-gradient">CLB</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] sm:text-[17px] mt-3 px-2">
            Đội ngũ dẫn dắt và phát triển cộng đồng Long An Runners bền vững
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {coaches.map((coach, i) => (
            <div
              key={coach.name}
              className={`animate-on-scroll delay-${(i + 1) * 100} group relative bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-100 hover:-translate-y-2`}
            >
              {/* Image */}
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />

                {/* Specialty badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 bg-teal-500/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
                    {coach.specialty}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h4 className="text-[16px] font-bold text-gray-800 mb-0.5">{coach.name}</h4>
                <p className="text-teal-500 text-[12px] font-semibold uppercase tracking-wider mb-3">{coach.role}</p>
                <p className="text-gray-500 text-[13px] leading-relaxed min-h-[40px]">{coach.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Testimonials ===== */}
        <div className="text-center mb-14 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Câu chuyện
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2] break-words">
            Hành trình <span className="text-gradient">thay đổi</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] sm:text-[17px] mt-3 px-2">
            Những câu chuyện thực tế từ chính các thành viên CLB
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="animate-on-scroll max-w-3xl mx-auto">
          <div className="relative bg-gray-50 rounded-[2rem] p-8 sm:p-12 border border-gray-100">
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-teal-200 text-6xl font-serif leading-none select-none">"</div>

            <div className="relative z-10 slide-in" key={currentTestimonial}>
              <p className="text-gray-600 text-[16px] sm:text-[18px] leading-[1.8] mb-8 italic">
                {testimonials[currentTestimonial].quote}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-3xl">{testimonials[currentTestimonial].avatar}</span>
                <div>
                  <p className="font-bold text-gray-800 text-[15px]">{testimonials[currentTestimonial].name}</p>
                  <p className="text-teal-500 text-[12px] font-semibold">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-6 right-8 flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-teal-500 hover:border-teal-500 transition-colors shadow-sm"
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-teal-500 hover:border-teal-500 transition-colors shadow-sm"
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentTestimonial
                      ? 'w-6 bg-teal-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
