# Student Management API

A Spring Boot REST API to manage student records using CRUD operations.

This project demonstrates how a backend application is structured using Controller → Service → Repository architecture along with proper exception handling.

---

## 🚀 Features
- Create Student
- Get All Students
- Get Student by ID
- Update Student
- Delete Student
- Global Exception Handling (`@RestControllerAdvice`)

---

## 🛠 Tech Stack
- Java
- Spring Boot
- Spring Data JPA
- H2 / MySQL

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

## 🔍 Example Error Response

```json
{
  "message": "Student not found",
  "status": 404
}
