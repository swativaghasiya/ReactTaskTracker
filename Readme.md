# ✅ Task Tracker App

A full-stack task tracking application built with:

- 🖥️ **Frontend**: React + React Router + Fetch API
- ⚙️ **Backend**: Node.js + Express + MongoDB
- 🔐 **Auth**: JWT (JSON Web Tokens)
- 📦 **Persistence**: MongoDB
- 💅 Modern UI with clean styling

---

## 📁 Project Structure

### task-tracker/

- backend/ # Node.js + Express + MongoDB API
- frontend/ # React UI for users

## 🚀 Features

### ✅ Auth

- Signup and login
- JWT token stored in localStorage
- Protected routes for tasks

### ✅ Tasks

- Create, Read, Update, Delete (CRUD)
- Mark as complete/incomplete
- Due date support

### ✅ UI

- Dashboard listing all tasks
- Create Task form
- Task Details page
- Responsive and styled layout

---

## ⚙️ Setup Instructions

### 🔹 Prerequisites

- Node.js installed
- MongoDB running locally (or use MongoDB Atlas)

# 🛠️ Task Tracker Backend

This is the **backend API** for the Task Tracker application built with **Node.js**, **Express**, and **MongoDB**. It handles user authentication, task CRUD operations, and JWT-based route protection.

---

## 🚀 Features

- User Signup/Login (with JWT)
- Protected routes using middleware
- Task CRUD (Create, Read, Update, Delete)
- MongoDB with Mongoose
- Simple project structure

---

## 📁 Folder Structure

# backend/

- controllers/ # Business logic for auth and tasks
- middleware/ # JWT auth middleware
- models/ # Mongoose schemas
- routes/ # Express route definitions
- .env # Environment variables
- server.js # Main server entry point

---

## 📦 Setup Instructions

### 1. Install dependencies

```bash
cd backend
npm install

```

### 2. Create .env file

PORT=5000
MONGO_URI=mongodb://localhost:27017/task-tracker
JWT_SECRET=your_jwt_secret_key

### 3. Run the server

npx nodemon server.js

📬 API Endpoints
🔐 Auth

## Method Endpoint Description

- POST /api/auth/signup Register a new user
- POST /api/auth/login Login and get token

## 📋 Tasks (Protected)

### Method Endpoint Description

- GET /api/tasks Get all tasks
- GET /api/tasks/:id Get single task
- POST /api/tasks Create task
- PUT /api/tasks/:id Update task
- DELETE /api/tasks/:id Delete task

# 🌐 Task Tracker Frontend

This is the **React frontend** for the Task Tracker app. It lets users sign up, log in, create tasks, and view/manage them via a clean UI.

---

## 🚀 Features

- React (with Hooks + Router)
- User Signup/Login via Fetch
- Dashboard with Task List
- Create Task Form
- Task Detail View
- Protected Routes using JWT
- JWT stored in `localStorage`
- Basic CSS styling
- Error and loading states

---

## 📁 Folder Structure

###frontend/

- src/
  - auth/ # Login/logout utils
  - components/ # Navbar
  - pages/ # All page components
  - App.js # Routes
  - index.js # App entry point
- public/
  - env # (Optional) Proxy settings

## 📦 Setup Instructions

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Run the React app

    - npm start (Visit: http://localhost:3000)

🔐 Authentication

- On login/signup, JWT is stored in localStorage

- All protected pages check for token presence

- If missing/invalid, user is redirected to /login

🛠️ Backend Connection
By default, frontend fetches API from: http://localhost:5000/api/

📬 Routes Overview

## Pages

- /signup => Register page
- /login=> Login page
- /=> Dashboard (tasks)
- /task/new => Create task form
- /task/:id => Task details view
