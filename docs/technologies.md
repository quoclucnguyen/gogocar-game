# Công nghệ sử dụng

**Cập nhật lần cuối:** 24/06/2024

## Công nghệ chính

### Frontend

- **React**: Thư viện UI để xây dựng giao diện người dùng
  - Phiên bản: 18.x
  - Vai trò: Cung cấp cấu trúc component và quản lý state cho ứng dụng

- **TypeScript**: Ngôn ngữ lập trình mở rộng của JavaScript với kiểu dữ liệu tĩnh
  - Phiên bản: 5.x
  - Vai trò: Cung cấp kiểm tra kiểu dữ liệu tĩnh, giúp phát hiện lỗi sớm và cải thiện khả năng bảo trì

### Build Tools

- **Vite**: Công cụ build nhanh cho các ứng dụng web hiện đại
  - Phiên bản: 6.x
  - Vai trò: Cung cấp môi trường phát triển nhanh với hot module replacement

### Game Engine

- **Phaser 3**: Framework game HTML5 để phát triển game 2D
  - Phiên bản: 3.60.0
  - Vai trò: Cung cấp các tính năng game như physics, animation, input, sound, v.v.

## Mẫu thiết kế (Design Patterns)

### Module Pattern

- **Mô tả**: Sử dụng các module để tổ chức code thành các đơn vị nhỏ, dễ quản lý
- **Ứng dụng**: Tổ chức code thành các module như `car`, `track`, `utils`, v.v.
- **Lợi ích**: Dễ bảo trì, dễ mở rộng, dễ tái sử dụng

### Factory Pattern

- **Mô tả**: Sử dụng một lớp hoặc phương thức để tạo các đối tượng thay vì tạo trực tiếp
- **Ứng dụng**: Sử dụng trong việc tạo các đối tượng game như `TrackBuilder` tạo đường đua
- **Lợi ích**: Tách biệt logic tạo đối tượng, dễ mở rộng và thay đổi

### Observer Pattern

- **Mô tả**: Sử dụng một đối tượng (subject) để thông báo cho các đối tượng khác (observers) khi có sự thay đổi
- **Ứng dụng**: Sử dụng trong hệ thống sự kiện của Phaser
- **Lợi ích**: Giảm sự phụ thuộc giữa các đối tượng, dễ mở rộng

### Singleton Pattern

- **Mô tả**: Đảm bảo một lớp chỉ có một thể hiện duy nhất và cung cấp một điểm truy cập toàn cục đến nó
- **Ứng dụng**: Sử dụng cho các đối tượng duy nhất như scene chính
- **Lợi ích**: Kiểm soát truy cập đến tài nguyên dùng chung

## Thư viện và công cụ phụ trợ

### Linting và Formatting

- **ESLint**: Công cụ linting cho JavaScript/TypeScript
- **Prettier**: Công cụ định dạng code

### Testing

- Hiện tại dự án chưa có công cụ testing (sẽ được thêm trong tương lai)

### Quản lý phiên bản

- **Git**: Hệ thống quản lý phiên bản phân tán
- **GitHub**: Nền tảng lưu trữ và quản lý mã nguồn

## Tài liệu tham khảo

- [Tài liệu Phaser 3](https://photonstorm.github.io/phaser3-docs/)
- [Tài liệu React](https://reactjs.org/docs/getting-started.html)
- [Tài liệu TypeScript](https://www.typescriptlang.org/docs/)
- [Tài liệu Vite](https://vitejs.dev/guide/)
