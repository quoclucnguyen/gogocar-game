# Cấu trúc dự án

**Cập nhật lần cuối:** 24/06/2024

## Cấu trúc thư mục

```bash
src/
├── assets/                    # Chứa các tài nguyên của game (hình ảnh, âm thanh, v.v.)
│   ├── Car_1_Main_Positions/  # Chứa các hình ảnh xe ở các góc khác nhau
│   └── Road_01/               # Chứa các hình ảnh đường đua
├── components/                # Chứa các component React
│   └── Game.tsx               # Component React để khởi tạo và hiển thị game Phaser
├── game/                      # Chứa code game Phaser
│   ├── car/                   # Chứa các lớp liên quan đến xe
│   │   └── CarController.ts   # Xử lý việc điều khiển xe
│   ├── scenes/                # Chứa các scene của game
│   │   └── GameScene.ts       # Scene chính của game
│   ├── track/                 # Chứa các lớp liên quan đến đường đua
│   │   ├── TrackBuilder.ts    # Xử lý việc tạo đường đua
│   │   └── TrackDecorator.ts  # Xử lý việc trang trí đường đua
│   ├── utils/                 # Chứa các tiện ích
│   │   ├── Constants.ts       # Chứa các hằng số và cấu hình
│   │   └── DebugHelper.ts     # Chứa các hàm hỗ trợ debug
│   └── index.ts               # Export các module
└── App.tsx                    # Component gốc của ứng dụng React
```

## Mô tả chi tiết các file

### Components

#### `src/components/Game.tsx`

- **Vai trò**: Component React để khởi tạo và hiển thị game Phaser.
- **Nội dung**: Khởi tạo game Phaser với các cấu hình cần thiết và gắn nó vào DOM.
- **Tương tác**: Import và sử dụng `GameScene` từ module game.

### Game

#### `src/game/index.ts`

- **Vai trò**: Export các module từ thư mục game.
- **Nội dung**: Export các lớp và hằng số để sử dụng bên ngoài module game.

#### `src/game/scenes/GameScene.ts`

- **Vai trò**: Scene chính của game.
- **Nội dung**: Khởi tạo và quản lý các đối tượng trong game, xử lý vòng lặp game.
- **Tương tác**: Sử dụng `TrackBuilder`, `TrackDecorator`, `CarController` và các tiện ích khác.

#### `src/game/car/CarController.ts`

- **Vai trò**: Xử lý việc điều khiển xe.
- **Nội dung**: Tạo xe, xử lý chuyển động của xe, cập nhật sprite xe dựa trên góc.
- **Tương tác**: Sử dụng các hằng số từ `Constants.ts`.

#### `src/game/track/TrackBuilder.ts`

- **Vai trò**: Xử lý việc tạo đường đua.
- **Nội dung**: Tạo đường đua từ các hình ảnh, tính toán kích thước đường đua, tạo đường đi cho xe.
- **Tương tác**: Sử dụng các hằng số từ `Constants.ts`.

#### `src/game/track/TrackDecorator.ts`

- **Vai trò**: Xử lý việc trang trí đường đua.
- **Nội dung**: Thêm các chi tiết và trang trí cho đường đua như cỏ, cây, đá, rào chắn, v.v.
- **Tương tác**: Sử dụng các hằng số từ `Constants.ts`.

#### `src/game/utils/Constants.ts`

- **Vai trò**: Chứa các hằng số và cấu hình.
- **Nội dung**: Định nghĩa các hằng số và cấu hình cho game như kích thước đường đua, tốc độ xe, v.v.

#### `src/game/utils/DebugHelper.ts`

- **Vai trò**: Chứa các hàm hỗ trợ debug.
- **Nội dung**: Các hàm để hiển thị thông tin debug, tạo text debug, v.v.
- **Tương tác**: Sử dụng các hằng số từ `Constants.ts`.
