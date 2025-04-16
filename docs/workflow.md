# Quy trình phát triển và kiểm thử

**Cập nhật lần cuối:** 24/06/2024

## Quy trình phát triển

### 1. Khởi tạo tính năng mới

- Tạo branch mới từ `main`:

```bash
git checkout main
git pull
git checkout -b feature/ten-tinh-nang
```

- Cập nhật tài liệu nếu cần thiết (ví dụ: cập nhật `docs/roadmap.md` để đánh dấu tính năng đang được phát triển)

### 2. Phát triển tính năng

- Viết code cho tính năng mới
- Tuân thủ các quy ước đặt tên và lưu ý khi phát triển (xem [Hướng dẫn phát triển](./development-guide.md))
- Commit thường xuyên với các message rõ ràng:

```bash
git add .
git commit -m "feat: Mô tả ngắn gọn về tính năng"
```

- Sử dụng các prefix cho commit message:
  - `feat:` cho tính năng mới
  - `fix:` cho việc sửa lỗi
  - `docs:` cho việc cập nhật tài liệu
  - `refactor:` cho việc refactor code
  - `test:` cho việc thêm hoặc sửa test
  - `chore:` cho các thay đổi khác

### 3. Kiểm thử tính năng

- Chạy game và kiểm tra tính năng mới:

```bash
npm run dev
```

- Kiểm tra các trường hợp edge case
- Đảm bảo không có lỗi trong console
- Kiểm tra hiệu suất nếu cần thiết

### 4. Hoàn thành và tạo Pull Request

- Push branch lên repository:

```bash
git push origin feature/ten-tinh-nang
```

- Tạo Pull Request vào `main`
- Mô tả chi tiết các thay đổi trong Pull Request
- Yêu cầu review từ các thành viên khác trong nhóm

### 5. Review và Merge

- Các thành viên khác review code
- Sửa các vấn đề được phát hiện trong quá trình review
- Merge Pull Request vào `main` khi đã được approve

## Quy trình kiểm thử

### Kiểm thử thủ công

1. **Kiểm thử chức năng**:
   - Chạy game và kiểm tra các tính năng
   - Đảm bảo game hoạt động đúng như mong đợi
   - Kiểm tra các trường hợp edge case

2. **Kiểm thử giao diện**:
   - Kiểm tra giao diện trên các kích thước màn hình khác nhau
   - Đảm bảo các phần tử được hiển thị đúng

3. **Kiểm thử hiệu suất**:
   - Kiểm tra FPS (frames per second)
   - Kiểm tra thời gian tải game
   - Kiểm tra sử dụng bộ nhớ

### Kiểm thử tự động

Hiện tại dự án chưa có kiểm thử tự động. Trong tương lai, chúng ta sẽ thêm:

- Unit tests cho các lớp và phương thức
- Integration tests cho các tính năng
- End-to-end tests cho toàn bộ game

## Quy trình phát hành

### 1. Chuẩn bị phát hành

- Cập nhật phiên bản trong `package.json`
- Cập nhật tài liệu nếu cần thiết
- Tạo branch `release/vX.Y.Z` từ `main`

### 2. Kiểm thử phiên bản phát hành

- Chạy kiểm thử toàn diện
- Sửa các lỗi được phát hiện
- Commit các sửa lỗi vào branch `release/vX.Y.Z`

### 3. Hoàn thành phát hành

- Merge branch `release/vX.Y.Z` vào `main`
- Tạo tag cho phiên bản:

```bash
git tag -a vX.Y.Z -m "Version X.Y.Z"
git push origin vX.Y.Z
```

- Build dự án cho môi trường production:

```bash
npm run build
```

- Triển khai lên môi trường production

## Quy trình báo lỗi

### 1. Phát hiện lỗi

- Mô tả chi tiết lỗi
- Các bước để tái hiện lỗi
- Môi trường (trình duyệt, hệ điều hành, v.v.)
- Screenshot hoặc video nếu có thể

### 2. Tạo issue

- Tạo issue trên GitHub
- Gắn label phù hợp (bug, enhancement, v.v.)
- Gán cho người phụ trách nếu biết

### 3. Sửa lỗi

- Tạo branch `fix/ten-loi` từ `main`
- Sửa lỗi
- Tạo Pull Request vào `main`
- Tham chiếu đến issue trong Pull Request

### 4. Kiểm thử và Merge

- Kiểm thử sửa lỗi
- Merge Pull Request vào `main`
- Đóng issue
