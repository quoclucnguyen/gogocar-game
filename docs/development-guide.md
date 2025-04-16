# Hướng dẫn phát triển

**Cập nhật lần cuối:** 24/06/2024

## Quy ước đặt tên

- **Lớp**: PascalCase (ví dụ: `GameScene`, `TrackBuilder`)
- **Phương thức và thuộc tính**: camelCase (ví dụ: `createTrack`, `handleCarMovement`)
- **Hằng số**: UPPER_SNAKE_CASE (ví dụ: `TRACK_CONFIG`, `CAR_CONFIG`)
- **File**: PascalCase cho lớp (ví dụ: `GameScene.ts`, `TrackBuilder.ts`)
- **Thư mục**: camelCase (ví dụ: `game`, `utils`, `scenes`)

## Lưu ý khi phát triển

1. **Tổ chức code**:
   - Khi thêm tính năng mới, hãy xem xét tạo module mới thay vì mở rộng các module hiện có quá nhiều.
   - Mỗi lớp nên có một trách nhiệm duy nhất và rõ ràng.
   - Tránh các phương thức quá dài hoặc phức tạp. Nếu một phương thức trở nên quá lớn, hãy chia nhỏ nó.

2. **Quản lý cấu hình**:
   - Khi thêm hằng số mới, hãy thêm vào file `Constants.ts` thay vì hardcode trong code.
   - Nhóm các hằng số liên quan vào các đối tượng cấu hình (ví dụ: `TRACK_CONFIG`, `CAR_CONFIG`).

3. **Debug và logging**:
   - Khi thêm logic debug mới, hãy thêm vào lớp `DebugHelper` thay vì viết trực tiếp trong code.
   - Sử dụng cờ `DEBUG_CONFIG.ENABLED` để bật/tắt các tính năng debug.
   - Tránh để lại các lệnh `console.log` trong code production.

4. **Quản lý tài nguyên**:
   - Tất cả các tài nguyên (hình ảnh, âm thanh) nên được đặt trong thư mục `assets`.
   - Sử dụng các hằng số trong `ASSET_KEYS` và `ASSET_PATHS` để tham chiếu đến tài nguyên.

5. **Cập nhật tài liệu**:
   - Khi thay đổi cấu trúc dự án, hãy cập nhật tài liệu này.
   - Thêm comment cho các phương thức và lớp mới để giải thích chức năng của chúng.

## Mẹo và thủ thuật

### Phaser 3

- Sử dụng `this.add.graphics()` để vẽ các hình dạng đơn giản thay vì tạo sprite mới.
- Sử dụng `setOrigin(0.5, 0.5)` để đặt điểm gốc của sprite ở giữa.
- Sử dụng `setScale()` để điều chỉnh kích thước sprite thay vì thay đổi `width` và `height`.
- Sử dụng `this.physics.add.sprite()` thay vì `this.add.sprite()` nếu bạn cần xử lý va chạm.

### TypeScript

- Sử dụng kiểu dữ liệu cụ thể thay vì `any` khi có thể.
- Sử dụng interface để định nghĩa cấu trúc dữ liệu.
- Sử dụng access modifier (`private`, `public`, `protected`) để kiểm soát quyền truy cập vào các thuộc tính và phương thức.

### React

- Sử dụng hook `useRef` để lưu trữ tham chiếu đến đối tượng game Phaser.
- Sử dụng hook `useEffect` để khởi tạo và dọn dẹp game Phaser.
- Tránh render lại component Game không cần thiết bằng cách sử dụng `React.memo` hoặc `useMemo`.
