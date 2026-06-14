# AI Code Reviewer (PERN Stack + AI Simulation)

---

##  Project Title
AI Code Reviewer - Full Stack PERN Application

---

## Project Description

AI Code Reviewer is a full-stack web application built using the PERN stack (PostgreSQL, Express, React, Node.js). The purpose of this project is to allow users to write/paste code and receive AI-like structured code review feedback.

The system simulates an AI review engine that analyzes code and returns suggestions for improvement. All reviews are stored in a PostgreSQL database and displayed in a user-specific history section.

This project demonstrates full-stack development skills including authentication, REST API creation, database integration, frontend UI development, and state management.

---

## ⚙️ Tech Stack

### Frontend
- React (Vite)
- TypeScript
- JavaScript (ES6+)
- Inline CSS styling

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- bcryptjs (Password Hashing)
- JSON Web Token (JWT)

---

## ✨ Features

### 🔐 Authentication System
- User Registration
- User Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes using userId

---

### 🧠 AI Code Review System
- Accepts user code input
- Generates structured AI-like review
- Suggests improvements in:
  - Code readability
  - Naming conventions
  - Performance
  - Error handling
  - Best practices

---

### 📜 History System
- Stores all reviews in PostgreSQL
- Fetches user-specific history
- Displays previous code + reviews
- Sorted by latest first

---

### 🎨 Frontend Features
- Clean UI with dark/light layout
- Code editor textarea
- Generate Review button
- Copy to clipboard button
- Logout button
- Loading state handling
- Streaming typing effect (AI simulation)

---

## 🧠 System Architecture

User Flow:

1. User registers account
2. User logs in
3. Backend returns JWT + userId
4. Frontend stores userId in localStorage
5. User submits code
6. Backend generates AI-like review
7. Review is stored in PostgreSQL
8. Frontend displays:
   - Latest review (streaming effect)
   - History of previous reviews

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  password TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);