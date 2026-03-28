import { useState } from 'react';

export default function Membership() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: 'Cá nhân',
      subtitle: 'Cho runner độc lập',
      price: annual ? '900.000' : '100.000',
      period: annual ? '/năm' : '/tháng',
      savings: annual ? 'Tiết kiệm 300K' : null,
      features: [
        'Tham gia tất cả buổi tập tuần',
        'Áo đồng phục CLB (1 chiếc)',
        'Tham gia group Strava riêng',
        'Hỗ trợ Pacer trong buổi tập',
        'Tham gia sự kiện nội bộ CLB',
      ],
      cta: 'Đăng ký ngay',
      popular: false,
    },
    {
      name: 'Premium',
      subtitle: 'Trải nghiệm đầy đủ',
      price: annual ? '1.800.000' : '200.000',
      period: annual ? '/năm' : '/tháng',
      savings: annual ? 'Tiết kiệm 600K' : null,
      features: [
        'Toàn bộ quyền lợi Cá nhân',
        '2 áo đồng phục CLB + nón',
        'Giảm giá 20% giải chạy đối tác',
        'Chương trình tập luyện cá nhân hóa',
        'Coaching 1-1 với HLV mỗi tháng',
        'Ưu tiên đăng ký sự kiện giới hạn',
      ],
      cta: 'Chọn Premium',
      popular: true,
    },
    {
      name: 'Nhóm / Doanh nghiệp',
      subtitle: 'Cho team ≥ 10 người',
      price: 'Liên hệ',
      period: '',
      savings: null,
      features: [
        'Toàn bộ quyền lợi Premium',
        'Áo đồng phục in logo doanh nghiệp',
        'Tổ chức buổi chạy Team Building',
        'Báo cáo sức khỏe tổng hợp',
        'Huấn luyện viên riêng cho team',
        'Banner thương hiệu tại sự kiện CLB',
      ],
      cta: 'Liên hệ tư vấn',
      popular: false,
    },
  ];

  return (
    <section id="membership" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-14 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-full uppercase tracking-widest mb-5">
            Hội viên
          </span>
          <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2] break-words">
            Bảng giá <span className="text-gradient">thành viên</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-[15px] sm:text-[17px] mt-3 px-2">
            Chọn gói phù hợp và trở thành hội viên chính thức
          </p>
        </div>

        {/* Toggle Monthly / Annual */}
        <div className="flex justify-center mb-12 animate-on-scroll">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2 shadow-sm border border-gray-100">
            <span className={`text-[13px] font-bold transition-colors ${!annual ? 'text-teal-600' : 'text-gray-400'}`}>
              Hàng tháng
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                annual ? 'bg-teal-500' : 'bg-gray-200'
              }`}
              aria-label="Toggle annual pricing"
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  annual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-[13px] font-bold transition-colors ${annual ? 'text-teal-600' : 'text-gray-400'}`}>
              Hàng năm
            </span>
            {annual && (
              <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full">
                -25%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`animate-on-scroll delay-${(i + 1) * 100} relative flex flex-col bg-white rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? 'shadow-[0_20px_60px_rgba(13,180,150,0.2)] border-2 border-teal-500 scale-[1.02] md:scale-105'
                  : 'shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-white text-center py-2 text-[12px] font-bold uppercase tracking-widest">
                  ⭐ Phổ biến nhất
                </div>
              )}

              <div className="p-7 sm:p-8 flex-1 flex flex-col">
                <h3 className="text-[20px] font-black text-gray-800 mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-[13px] font-medium mb-6">{plan.subtitle}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className={`font-black leading-none ${
                      plan.price === 'Liên hệ' ? 'text-[28px] text-gray-800' : 'text-[34px] text-gray-800'
                    }`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400 text-[14px] font-medium mb-1">{plan.period}</span>
                    )}
                  </div>
                  {plan.savings && (
                    <span className="inline-block mt-2 px-2.5 py-0.5 bg-green-50 text-green-600 text-[11px] font-bold rounded-full">
                      {plan.savings}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-gray-600 text-[14px]">
                      <svg className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href="#footer"
                  className={`w-full text-center py-3.5 rounded-full font-bold text-[14px] transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-[0_4px_20px_rgba(13,180,150,0.35)] hover:shadow-[0_8px_30px_rgba(13,180,150,0.5)] hover:translate-y-[-1px]'
                      : 'bg-gray-100 text-gray-700 hover:bg-teal-500 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
