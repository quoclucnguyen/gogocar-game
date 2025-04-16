# Tài liệu dự án GoGoCar

**Cập nhật lần cuối:** 24/06/2024

Chào mừng bạn đến với tài liệu dự án GoGoCar! Tài liệu này cung cấp thông tin chi tiết về cấu trúc, nội dung và vai trò của các file trong dự án GoGoCar.

## Nội dung tài liệu

- [Cấu trúc dự án](./project-structure.md) - Cấu trúc thư mục và mô tả chi tiết các file
- [Hướng dẫn phát triển](./development-guide.md) - Quy ước đặt tên, lưu ý khi phát triển
- [Hướng dẫn cài đặt](./installation.md) - Hướng dẫn cài đặt và chạy dự án
- [Công nghệ sử dụng](./technologies.md) - Công nghệ và mẫu thiết kế sử dụng
- [Quy trình làm việc](./workflow.md) - Quy trình phát triển và kiểm thử
- [Lộ trình phát triển](./roadmap.md) - Hướng phát triển tương lai

## Giới thiệu

GoGoCar là một game đua xe 2D được phát triển bằng Phaser 3, React, TypeScript và Vite. Game cho phép người chơi điều khiển một chiếc xe đua trên đường đua được tạo từ các hình ảnh.

## Luồng hoạt động

1. Ứng dụng React khởi động và render component `Game`.
2. Component `Game` khởi tạo game Phaser với `GameScene`.
3. `GameScene` tạo đường đua bằng cách sử dụng `TrackBuilder` và `TrackDecorator`.
4. `GameScene` tạo xe và đường đi bằng cách sử dụng `CarController`.
5. Trong vòng lặp game, `GameScene` cập nhật vị trí xe, camera và UI.

## Cập nhật tài liệu

Hãy cập nhật tài liệu này khi có thay đổi về cấu trúc dự án. Điều này sẽ giúp duy trì tính nhất quán và dễ hiểu của codebase, đặc biệt là khi dự án phát triển lớn hơn hoặc khi có thêm thành viên mới tham gia vào dự án.
