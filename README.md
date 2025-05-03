# 📝 Task Tracker Application

A full-stack task management app built with React (Vite), Express.js, MongoDB, and JWT-based authentication.

**Backend Hosted Url: https://task-tracker-890.up.railway.app/**

---

## 📁 Folder Structure

task-tracker/

├── backend/ # Express.js Backend API

└── frontend/ # React (Vite) Frontend UI


---

## 🚀 Getting Started

### ⚙️ Prerequisites

- Node.js (v16 or above)
- MongoDB (local or cloud e.g., MongoDB Atlas)
- npm or yarn

---

## 🖥️ Local Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
```

### 🔧 Backend Setup
```bash
cd backend
npm install
```
**Create a ```.env``` file**
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:5173
```
**Run the backend server**
```bash
npm run dev
```

### 🌐 Frontend Setup
```bash
cd frontend
npm install
```
**In your frontend code (e.g., inside a config.js or directly in fetch calls), make sure API requests point to:**
```http://localhost:3000/api/v1/```

**Run frontend**
```bash
npm run dev
```
---

## ✅ Features
- JWT Authentication

- Add/Edit/Delete Projects

- Add/Edit/Delete Tasks

- Task Status Management: To-Do / In-Progress / Done

- Responsive UI with TailwindCSS and Shadcn UI

---

## 🐛 Issue
If you run into any issues, feel free to open an Issue.

---

Let me know if you also want deployment instructions added for Vercel (frontend) and Render/Railway (backend).
