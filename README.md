# YouTube Clone

A full-stack YouTube clone application built with the MEVN stack (MongoDB, Express.js, Vue.js, Node.js).

## 📦 Features

- User authentication and authorization
- Video upload and streaming
- Video search and filtering
- User profiles and channels
- Comments and likes system
- Responsive design
- Real-time interactions

## 🧰 Tech Stack

### Backend:

- NestJS (Node.js framework)
- MongoDB + Mongoose
- TypeScript
- JWT Authentication
- Cloudinary for media storage

### Frontend:

- Vue.js 3
- Vite
- Tailwind CSS
- Axios for API calls

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have installed:

1. [Node.js](https://nodejs.org/) (version 18 or higher)
2. [MongoDB](https://www.mongodb.com/try/download/community)
3. [Git](https://git-scm.com/downloads)

# clone dự án

`git clone https://github.com/hyynee/Task1_Youtube_Clone.git`

### Backend Setup

1. Navigate to the backend directory:

```bash
cd youtube_clone_be
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/youtube_clone

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start the backend server:

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## 📘 API Documentation

Once the backend server is running, you can access the API documentation at:
`http://localhost:8080/swagger`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd youtube_clone_fe
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## 📘 API Documentation

Once the backend server is running, you can access the API documentation at:
`http://localhost:8080/swagger`

## 🏗 Project Structure

### Backend Structure

```
youtube_clone_be/
├── src/
│   ├── config/         # Application configuration
│   ├── controllers/    # Request handlers
│   ├── dto/           # Data Transfer Objects
│   ├── guards/        # Authentication guards
│   ├── models/        # Database models
│   ├── services/      # Business logic
│   └── main.ts        # Application entry point
```

### Frontend Structure

```
youtube_clone_fe/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Vue components
│   ├── views/         # Page components
│   ├── router/        # Vue Router configuration
│   ├── store/         # Vuex store
│   └── App.vue        # Root component
```

## 🛠 Available Scripts

### Backend

- `npm run build`: Build the project
- `npm run start`: Start the server
- `npm run start:dev`: Start in development mode with hot-reload
- `npm run start:debug`: Start in debug mode
- `npm run start:prod`: Start in production mode
- `npm run lint`: Run linting
- `npm run test`: Run unit tests
- `npm run test:e2e`: Run end-to-end tests

### Frontend

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run linting

## 🔧 Troubleshooting

1. MongoDB Connection Issues:

   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify network connectivity

2. Port Conflicts:

   - Check if port 8080 is available
   - Modify port in configuration if needed

3. Module Not Found:
   - Delete node_modules and package-lock.json
   - Run npm install again

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Made with ❤️ by [nguyễn anh huy]
