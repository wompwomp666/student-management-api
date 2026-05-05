# 🎓 Student Management System (Full Stack)

A complete full-stack web application to manage student records with a clean UI and a RESTful backend.

This project demonstrates real-world architecture using:
- Spring Boot (Backend API)
- HTML, CSS, JavaScript (Frontend)
- Deployment on Render & Vercel

---

## 🌐 Live Demo

🔗 Frontend (User Interface):  
https://student-management-api-sand.vercel.app  

🔗 Backend API:  
https://student-management-api-sxdc.onrender.com  

---

## 🚀 Features

### 👤 Frontend
- Add Student via UI form
- View all students in table
- Edit student details
- Delete student
- Toast notifications (success/error)
- Live API integration

### ⚙️ Backend
- REST API with full CRUD operations
- Layered architecture:
  - Controller → Service → Repository
- Global Exception Handling
- CORS configured for frontend integration
- In-memory database (H2)

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript (Fetch API)

### Backend
- Java
- Spring Boot
- Spring Data JPA
- H2 Database

### Deployment
- Backend → Render
- Frontend → Vercel

---

## 📌 API Endpoints

| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| POST   | /students      | Create student       |
| GET    | /students      | Get all students     |
| GET    | /students/{id} | Get student by ID    |
| PUT    | /students/{id} | Update student       |
| DELETE | /students/{id} | Delete student       |

---

## ⚠️ Important Notes

- Backend uses **H2 in-memory database**
  - Data will reset when server restarts
- First request may take time (Render free tier sleeps)

---

## 🧠 Architecture Overview
