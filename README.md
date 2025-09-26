EduConnect Punjab - Teacher Authentication (MERN)

Quick start

1) Prerequisites
- Node.js 18+
- MongoDB running locally (mongodb://127.0.0.1:27017)

2) Backend setup

```
cd backend
copy env.example .env   # On Windows PowerShell: Copy-Item env.example .env
npm install
npm run dev
```

Backend will start at http://localhost:5000 and expose:
- POST /api/teachers/signup
- POST /api/teachers/login
- GET /api/teachers/me

3) Frontend setup

```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The Vite dev server proxies /api to http://localhost:5000.

Environment

See backend/env.example for variables:
- PORT
- MONGO_URI
- JWT_SECRET
- JWT_EXPIRES_IN

Project structure

- backend/
  - server.js
  - src/
    - models/Teacher.js
    - controllers/teacherController.js
    - routes/teacherRoutes.js
    - middleware/authMiddleware.js
- frontend/
  - src/
    - pages/{Login,Signup,Dashboard}.jsx
    - lib/api.js
    - App.jsx, main.jsx
  - vite.config.js


