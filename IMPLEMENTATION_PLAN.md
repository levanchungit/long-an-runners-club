# Viết lại Website Long An Runners Club theo SKILLS.md

## Tổng quan

Hiện tại website đã có 7 components (Header, Hero, About, Vision, Activities, Gallery, Footer) nhưng **thiếu 4 sections quan trọng** theo SKILLS.md và **bảng màu sai** (đang dùng cam/orange thay vì xanh ngọc/teal).

## User Review Required

> [!IMPORTANT]
> **Thay đổi bảng màu toàn bộ website**: Chuyển từ Orange (#FF6B35) sang Tropical Rain Forest (#0DB496) theo yêu cầu SKILLS.md. Tất cả buttons, accents, gradients sẽ chuyển sang tone xanh ngọc.

> [!WARNING]
> **4 sections mới sẽ được thêm vào**, kéo dài trang đáng kể. Thứ tự sections sẽ là:
> 1. Hero → About → Programs (Weekly Schedule) → Events → Leaderboard → Membership → Coaches & Testimonials → Gallery → Footer

## Proposed Changes

### 1. Design System — Cập nhật bảng màu

#### [MODIFY] [index.css](file:///d:/FPT/Github/long-an-runners-club/src/index.css)
- Thay toàn bộ `--color-orange-*` → `--color-teal-*` (Primary: #0DB496)
- Cập nhật custom scrollbar, gradient text, glass card theo tone teal
- Thêm animations mới cho Leaderboard, Testimonial slider
- Cập nhật `--color-dark` để dùng Onyx (#383737) cho text
- Thêm animation keyframes cho counter, slider

---

### 2. Cập nhật Components hiện có

#### [MODIFY] [Header.jsx](file:///d:/FPT/Github/long-an-runners-club/src/components/Header.jsx)
- Đổi tất cả `orange-*` → `teal-*` (Primary color mới)
- CTA button gradient đổi sang teal

#### [MODIFY] [Hero.jsx](file:///d:/FPT/Github/long-an-runners-club/src/components/Hero.jsx)
- Đổi gradient text, button colors sang teal
- Giữ tiêu đề truyền cảm hứng, thêm slogan "The Ultimate Running Heroes"

#### [MODIFY] [About.jsx](file:///d:/FPT/Github/long-an-runners-club/src/components/About.jsx)
- Đổi accent colors sang teal
- Giữ nội dung + timeline

#### [MODIFY] [Vision.jsx](file:///d:/FPT/Github/long-an-runners-club/src/components/Vision.jsx) → Gộp vào About hoặc giữ riêng
- Đổi colors theo design system mới

#### [MODIFY] [Activities.jsx](file:///d:/FPT/Github/long-an-runners-club/src/components/Activities.jsx) 
- Biến thành **Programs & Weekly Schedule** với 3 cards:
  - Wednesday - Quality: Interval/tempo tại sân vận động
  - Thursday - City Run: Chạy nhẹ nhàng thư giãn
  - Sunday - Long Run: Buổi chạy dài cuối tuần

#### [MODIFY] [Gallery.jsx](file:///d:/FPT/Github/long-an-runners-club/src/components/Gallery.jsx)
- Đổi colors, giữ masonry layout

#### [MODIFY] [Footer.jsx](file:///d:/FPT/Github/long-an-runners-club/src/components/Footer.jsx)
- Đổi CTA banner, social links colors sang teal
- Thêm form Newsletter đăng ký bản tin

---

### 3. Components mới

#### [NEW] [Events.jsx](file:///d:/FPT/Github/long-an-runners-club/src/components/Events.jsx)
- Danh sách giải chạy sắp tới (VD: Techcombank Hanoi International Marathon)
- Hiển thị cự ly: 5KM, 10KM, 21KM, 42.195KM
- Ngày giờ + giá vé trực quan
- UICards với countdown timer effect

#### [NEW] [Leaderboard.jsx](file:///d:/FPT/Github/long-an-runners-club/src/components/Leaderboard.jsx)
- Bảng xếp hạng Top Runners tuần/tháng
- Mô phỏng UI Strava (Tổng KM, Pace)
- Gamification: huy hiệu, ranking badges
- Tab switch: Tuần / Tháng

#### [NEW] [Membership.jsx](file:///d:/FPT/Github/long-an-runners-club/src/components/Membership.jsx)
- Bảng giá phân chia: Cá nhân vs Nhóm (Doanh nghiệp/CLB)
- Pricing cards với highlighted recommended plan
- Form đăng ký inline (responsive, dễ dùng trên mobile)

#### [NEW] [Coaches.jsx](file:///d:/FPT/Github/long-an-runners-club/src/components/Coaches.jsx)
- Slider giới thiệu Pacer/Coach (auto-slide + manual navigation)
- Testimonials từ thành viên: câu chuyện thay đổi bản thân
- Avatar + quote card design

---

### 4. App Assembly

#### [MODIFY] [App.jsx](file:///d:/FPT/Github/long-an-runners-club/src/App.jsx)
- Import và thêm 4 components mới
- Thứ tự: Header → Hero → About → Vision → Activities(Programs) → Events → Leaderboard → Membership → Coaches → Gallery → Footer

---

### 5. Assets — Tạo hình ảnh

Sử dụng tool `generate_image` để tạo:
- Hero background image (runners on road at sunrise)
- Section backgrounds nếu cần

## Open Questions

> [!IMPORTANT]
> 1. **Bảng màu**: SKILLS.md yêu cầu Xanh ngọc (#0DB496 - Tropical Rain Forest). Bạn có muốn giữ cam (orange) hay đổi sang xanh ngọc?
> 2. **Vision section**: Gộp vào About hay giữ riêng?
> 3. **Hình ảnh**: Dùng ảnh Unsplash hay tạo ảnh mới bằng AI?

## Verification Plan

### Automated Tests
- Chạy `npm run dev` để xác nhận không có lỗi build
- Chạy `npm run build` để verify production build

### Manual Verification  
- Mở browser kiểm tra responsive (mobile 375px, tablet 768px, desktop 1440px)
- Kiểm tra tất cả scroll animations hoạt động
- Kiểm tra hamburger menu trên mobile
- Kiểm tra tất cả sections hiển thị đúng thứ tự
