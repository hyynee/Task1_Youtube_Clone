# YouTube Clone Backend

Đây là phần Backend của dự án YouTube Clone, được xây dựng bằng NestJS và MongoDB.

## Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:

1. [Node.js](https://nodejs.org/) (phiên bản 18 trở lên)
2. [MongoDB](https://www.mongodb.com/try/download/community) (phiên bản mới nhất)
3. [Git](https://git-scm.com/downloads) (để clone code)

## Các bước cài đặt và chạy dự án

### 1. Clone dự án

```bash
git clone <link-repository>
cd youtube_clone_be
```

### 2. Cài đặt các dependencies

```bash
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env` trong thư mục gốc của dự án và thêm các biến môi trường sau:

```env
# Cấu hình MongoDB
MONGODB_URI=mongodb://localhost:27017/youtube_clone

# Cấu hình Cloudinary (cho upload ảnh)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Chạy dự án

Có 3 cách để chạy dự án:

1. Chạy ở chế độ development (có hot-reload):

```bash
npm run start:dev
```

2. Chạy ở chế độ production:

```bash
npm run build
npm run start:prod
```

3. Chạy ở chế độ debug:

```bash
npm run start:debug
```

## API Documentation

Sau khi chạy server, bạn có thể truy cập API documentation tại:
`http://localhost:8080/swagger`

## Cấu trúc thư mục

```
src/
├── config/         # Cấu hình ứng dụng
├── controllers/    # Xử lý request/response
├── dto/           # Data Transfer Objects
├── guards/        # Authentication guards
├── models/        # Database models
├── services/      # Business logic
└── main.ts        # Entry point của ứng dụng
```

## Các lệnh hữu ích

- `npm run build`: Build dự án
- `npm run start`: Chạy dự án
- `npm run start:dev`: Chạy dự án với chế độ hot-reload
- `npm run start:debug`: Chạy dự án với chế độ debug
- `npm run start:prod`: Chạy dự án ở chế độ production
- `npm run lint`: Kiểm tra lỗi code style
- `npm run test`: Chạy unit tests
- `npm run test:e2e`: Chạy end-to-end tests

## Xử lý lỗi thường gặp

1. Lỗi "Module not found":

   - Chạy lại `npm install`
   - Xóa thư mục `node_modules` và file `package-lock.json`, sau đó chạy lại `npm install`

2. Lỗi kết nối MongoDB:

   - Kiểm tra MongoDB đã được cài đặt và đang chạy
   - Kiểm tra lại MONGODB_URI trong file .env

3. Lỗi port đã được sử dụng:
   - Đóng các ứng dụng đang sử dụng port 8080
   - Hoặc thay đổi port trong file cấu hình
