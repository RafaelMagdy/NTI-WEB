# 🔐 Authentication Module

This module provides a secure user authentication system using **Node.js**, **Express**, **MongoDB**, and **JWT**.

---

## 📌 What the Module Does

This module enables:
- User registration and login
- Password hashing using **bcryptjs**
- Token generation using **jsonwebtoken**
- Protection of private routes using a custom middleware
- Modular code structure for scalability

It is built as part of the graduation project backend and is ready to integrate with role-based user flows.

---

## 👤 Chosen User Roles

The following user roles are supported:

- `admin`
- `doctor`
- `patient`

You can easily extend this to include other roles like `instructor`, `student`, `client`, etc., by updating the `role` field in the user model schema.

---

## 📍 Routes List + Examples

### 🔸 POST `/api/v1/auth/signup`  
Registers a new user and returns a JWT token.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "phone": "123456789",
  "role": "doctor"
}
