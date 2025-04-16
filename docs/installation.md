# Hướng dẫn cài đặt và chạy dự án

**Cập nhật lần cuối:** 24/06/2024

## Yêu cầu hệ thống

- Node.js (v14.0.0 trở lên)
- npm (v6.0.0 trở lên)

## Cài đặt

1. Clone dự án từ repository:

```bash
git clone <repository-url>
cd gogocar-game
```

2. Cài đặt các dependency:

```bash
npm install
```

## Chạy dự án

### Môi trường phát triển

Để chạy dự án trong môi trường phát triển:

```bash
npm run dev
```

Sau khi chạy lệnh này, dự án sẽ được khởi chạy và bạn có thể truy cập vào địa chỉ [http://localhost:5173](http://localhost:5173) để xem game.

### Build cho môi trường production

Để build dự án cho môi trường production:

```bash
npm run build
```

Các file build sẽ được tạo trong thư mục `dist`.

### Preview bản build

Để xem trước bản build production:

```bash
npm run preview
```

## Cấu trúc dự án

Xem thêm chi tiết về cấu trúc dự án tại [Cấu trúc dự án](./project-structure.md).

## Khắc phục sự cố

### Lỗi "Module not found"

Nếu bạn gặp lỗi "Module not found", hãy thử:

```bash
npm install
```

### Lỗi "Port 5173 is already in use"

Nếu bạn gặp lỗi "Port 5173 is already in use", hãy thử:

```bash
# Tìm và kill process đang sử dụng port 5173
npx kill-port 5173

# Hoặc chạy với port khác
npm run dev -- --port 3000
```

### Lỗi liên quan đến Phaser

Nếu bạn gặp lỗi liên quan đến Phaser, hãy kiểm tra:

1. Phiên bản Phaser trong `package.json`
2. Cấu hình game trong `src/components/Game.tsx`
3. Các asset đã được load đúng trong `preload()` của `GameScene.ts`

## Tài liệu tham khảo

- [Tài liệu Phaser 3](https://photonstorm.github.io/phaser3-docs/)
- [Tài liệu React](https://reactjs.org/docs/getting-started.html)
- [Tài liệu TypeScript](https://www.typescriptlang.org/docs/)
- [Tài liệu Vite](https://vitejs.dev/guide/)
