🛠 BỘ SKILLS CHO ANTIGRAVITY: THIẾT KẾ WEBSITE RUNNER CLUB
Role (Vai trò): Bạn là một Chuyên gia Frontend Developer và UI/UX Designer cấp cao. Nhiệm vụ của bạn là xây dựng một website giới thiệu Câu lạc bộ Chạy bộ (Runner Club) bên trong thư mục dự án này.
Core Objectives (Mục tiêu cốt lõi): Website phải truyền tải được năng lượng, sức khỏe và tinh thần thể thao. Giao diện (UI) phải tuyệt đẹp, cân đối, hiện đại; Trải nghiệm người dùng (UX) phải mượt mà, trực quan
. Website bắt buộc phải Responsive 100%, hiển thị hoàn hảo trên mọi thiết bị (Mobile, Tablet, Desktop)
.
1. Style Guide & UI/UX Requirements (Yêu cầu Thiết kế & Trải nghiệm):
Bảng màu (Color Palette): Sử dụng các tone màu thể thao, năng động. Khuyến nghị sử dụng: Trắng (#FFFFFF) làm nền chủ đạo, Xanh ngọc (Tropical Rain Forest - #0DB496) làm màu nhấn (Primary Color) cho các nút CTA, Xám (#E7E7E7) cho các background phụ, và Đen (#383737 - Onyx) cho văn bản để dễ đọc
.
Hình ảnh & Đồ họa: Tập trung vào các hình ảnh chất lượng cao thể hiện những bước chạy, sân vận động, giày thể thao, những cuộc đua marathon và tinh thần đồng đội (Crew)
.
Typography & Animation: Sử dụng font chữ không chân (San-serif) mạnh mẽ, hiện đại. Áp dụng các hiệu ứng animation mượt mà (smooth scroll, hover effects, fade-in khi cuộn trang) nhưng không làm quá tải trang.
Responsive: Áp dụng phương pháp Mobile-First, đảm bảo menu điều hướng (hamburger menu), hình ảnh và các lưới (grid) tự động thích ứng mượt mà trên màn hình nhỏ
.
2. Website Structure & Components (Cấu trúc Website): Cấu trúc website cần mạch lạc, bao gồm các phần (sections/pages) sau
:
Hero Section (Trang chủ): Banner toàn màn hình với video/hình ảnh team đang chạy bộ. Đi kèm tiêu đề truyền cảm hứng (VD: "The Ultimate Running Heroes"
) và nút Call-to-Action (CTA) nổi bật: "Tham gia ngay" hoặc "Đăng ký thành viên"
.
Về chúng tôi (About Us): Đoạn giới thiệu ngắn về câu lạc bộ, sứ mệnh xây dựng cộng đồng chạy bộ an toàn, hòa nhập (inclusive) cho mọi lứa tuổi và trình độ, từ người mới bắt đầu đến Elite
.
Hoạt động & Lịch tập (Programs & Activities): Hiển thị lịch chạy hàng tuần bằng các thẻ (Cards) UI cân đối. Ví dụ:
Wednesday - Quality: Chạy interval/tempo tại sân vận động
.
Thursday - City Run: Chạy nhẹ nhàng thư giãn
.
Sunday - Long Run: Buổi chạy dài cuối tuần chuẩn bị cho Marathon
.
Sự kiện & Giải chạy (Events): Tích hợp danh sách các giải chạy sắp tới (VD: Techcombank Hanoi International Marathon) với các cự ly 5KM, 10KM, 21KM, 42.195KM, ngày giờ và giá vé trực quan
.
Bảng xếp hạng (Leaderboard/Gamification) [Tính năng nổi bật]: Một section thiết kế dạng Bảng xếp hạng vinh danh Top Runners trong tuần/tháng, tích hợp mô phỏng UI đồng bộ từ Strava (Tổng số KM, Pace) để tạo động lực cho thành viên
.
Bảng giá & Đăng ký (Membership): Bảng giá phân chia rõ ràng: Đăng ký cá nhân và Đăng ký nhóm (doanh nghiệp/CLB)
. Form đăng ký mượt mà, dễ điền trên điện thoại.
Huấn luyện viên & Câu chuyện (Coaches & Testimonials): Slider giới thiệu đội ngũ Pacer/Coach
 và những câu chuyện thực tế, chia sẻ hành trình thay đổi bản thân của các thành viên
.
Footer: Thông tin liên hệ, nút liên kết mạng xã hội (Facebook, Strava group), chính sách bảo mật, và form đăng ký nhận bản tin (Newsletter)
.
3. Development Rules (Quy tắc lập trình trong Antigravity):
Component-based: Chia nhỏ cấu trúc thành các components có thể tái sử dụng (Hero, FeatureCard, EventItem, LeaderboardRow, TestimonialSlider).
Mã nguồn sạch: Giữ code ngắn gọn, comment rõ ràng, đặt tên biến và class chuẩn mực (BEM hoặc Tailwind conventions).
Tối ưu hiệu suất: Đảm bảo điểm PageSpeed cao, load ảnh nhanh (Lazy loading)
. Không sử dụng các thư viện quá nặng nề nếu không cần thiết.