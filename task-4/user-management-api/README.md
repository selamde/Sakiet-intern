# User Management REST API

A beginner-friendly, robust, and well-structured RESTful API for managing users built using **Node.js** and **Express.js** with an in-memory data store.

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Project Structure & Architecture](#project-structure--architecture)
4. [How a Request Travels Through the App](#how-a-request-travels-through-the-app)
5. [Installation & Setup](#installation--setup)
6. [Running the Server](#running-the-server)
7. [API Endpoints Documentation](#api-endpoints-documentation)
8. [Postman Testing Guide](#postman-testing-guide)
9. [Automated Test Suite](#automated-test-suite)
10. [Key Backend Concepts Explained](#key-backend-concepts-explained)

---

## 1. Project Overview

The **User Management API** provides standard CRUD (Create, Read, Update, Delete) capabilities over a collection of user resources. Each user object has the following schema:

| Property | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `id` | Number | Unique identifier (auto-incremented integer) | `1` |
| `name` | String | Full name of the user (required, non-empty) | `"Abebe Kebede"` |
| `email` | String | Unique, valid email address (required) | `"abebe@example.com"` |
| `age` | Number | Age as a positive integer (required) | `24` |

---

## 2. Technologies Used

- **Node.js**: Asynchronous event-driven JavaScript runtime environment.
- **Express.js**: Minimalist and flexible Node.js web application framework.
- **JavaScript (ES6+)**: Modern JavaScript syntax (destructuring, arrow functions, template literals).
- **Nodemon**: Development utility that automatically restarts the server when code changes.
- **Postman**: API development and testing tool.

---

## 3. Project Structure & Architecture

```text
user-management-api/
│
├── src/
│   ├── data/
│   │   └── users.js            # In-memory array of user objects (mock database)
│   │
│   ├── routes/
│   │   └── userRoutes.js       # Maps HTTP methods & URL paths to controller actions
│   │
│   ├── controllers/
│   │   └── userController.js   # Business logic, validations, & CRUD operations
│   │
│   ├── middleware/
│   │   └── errorHandler.js     # 404 handler and global error-handling middleware
│   │
│   └── server.js               # Application entry point, server configuration & listener
│
├── postman/
│   └── User_Management_API.postman_collection.json # 1-Click Importable Postman Collection
│
├── test/
│   └── api.test.js             # Automated 30-case integration test suite
│
├── package.json                # Project dependencies and script commands
├── .gitignore                  # Git ignore file
└── README.md                   # Comprehensive documentation & guide
```

### Purpose of Each File:
- **`src/server.js`**: Boots the Express server, applies global middleware (`express.json()`, `cors()`), defines the root welcome route (`/`), mounts the user routes (`/api/users`), and registers error handling.
- **`src/routes/userRoutes.js`**: Declares endpoints (`/` and `/:id`) and specifies which controller function handles each HTTP method (`GET`, `POST`, `PUT`, `DELETE`).
- **`src/controllers/userController.js`**: Extracts incoming data from `req.body` and `req.params`, performs input validation, manipulates the `users` array, and returns standardized JSON responses.
- **`src/data/users.js`**: Stores the in-memory array of user objects, initialized with sample records.
- **`src/middleware/errorHandler.js`**: Catches undefined URLs (404 Not Found) and centralized application errors (500 Internal Server Error, malformed JSON).

---

## 4. How a Request Travels Through the App

Here is the step-by-step lifecycle of an API request:

```text
+-------------------+
|  Client (Postman) |
+---------+---------+
          |  (1) Sends HTTP Request: POST /api/users with JSON Body
          v
+-------------------+
|   server.js       | -> Runs express.json() to parse incoming JSON body into req.body
+---------+---------+
          |  (2) Matches path prefix '/api/users'
          v
+-------------------+
|   userRoutes.js   | -> Matches HTTP method (POST) and route ('/')
+---------+---------+
          |  (3) Calls the mapped controller function: createUser()
          v
+-------------------+
| userController.js | -> Validates fields (name, email, age, duplicate check)
+---------+---------+
          |  (4) Modifies in-memory store
          v
+-------------------+
|    users.js       | -> Appends new user object: users.push(newUser)
+---------+---------+
          |  (5) Controller responds with HTTP Status 201 Created & JSON
          v
+-------------------+
|  Client (Postman) | -> Receives: { "success": true, "message": "...", "data": {...} }
+-------------------+
```

---

## 5. Installation & Setup

1. **Clone or navigate** to the project folder:
   ```bash
   cd user-management-api
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## 6. Running the Server

### Development Mode (with automatic restart via Nodemon):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

When started, you will see:
```text
======================================================
🚀 User Management API is running!
📡 URL: http://localhost:5000
📝 Root info: http://localhost:5000/
👥 Users API: http://localhost:5000/api/users
======================================================
```

---

## 7. API Endpoints Documentation

All responses follow a consistent JSON format:
- **Success**: `{ "success": true, "message": "...", "data": ... }`
- **Error**: `{ "success": false, "message": "..." }`

### Endpoint Summary

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API welcome message & route directory | `200 OK` |
| `GET` | `/api/users` | Retrieve all users | `200 OK` |
| `GET` | `/api/users/:id` | Retrieve single user by ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/users` | Create a new user | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/users/:id` | Update an existing user by ID | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `DELETE` | `/api/users/:id` | Delete a user by ID | `200 OK` / `404 Not Found` |

---

### Detailed Endpoint Specifications

#### 1. Root Welcome
- **Method**: `GET`
- **URL**: `http://localhost:5000/`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Welcome to the User Management REST API! 🚀",
  "version": "1.0.0",
  "documentation": { ... }
}
```

---

#### 2. Get All Users
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/users`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Abebe Kebede",
      "email": "abebe@example.com",
      "age": 24
    },
    {
      "id": 2,
      "name": "Sara Alula",
      "email": "sara@example.com",
      "age": 28
    },
    {
      "id": 3,
      "name": "Dawit Haile",
      "email": "dawit@example.com",
      "age": 31
    }
  ]
}
```

---

#### 3. Get User by ID
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/users/1`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "Abebe Kebede",
    "email": "abebe@example.com",
    "age": 24
  }
}
```
- **Error Response (404 Not Found - e.g. ID 999)**:
```json
{
  "success": false,
  "message": "User not found with ID 999"
}
```

---

#### 4. Create a User
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/users`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Bethelhem Tadesse",
  "email": "bethelhem@example.com",
  "age": 22
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 4,
    "name": "Bethelhem Tadesse",
    "email": "bethelhem@example.com",
    "age": 22
  }
}
```
- **Error Response (400 Bad Request - Duplicate Email)**:
```json
{
  "success": false,
  "message": "Validation Error: A user with the email 'abebe@example.com' already exists."
}
```

---

#### 5. Update a User
- **Method**: `PUT`
- **URL**: `http://localhost:5000/api/users/1`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Abebe Kebede (Lead Engineer)",
  "age": 25
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Abebe Kebede (Lead Engineer)",
    "email": "abebe@example.com",
    "age": 25
  }
}
```

---

#### 6. Delete a User
- **Method**: `DELETE`
- **URL**: `http://localhost:5000/api/users/1`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "User with ID 1 deleted successfully",
  "data": {
    "id": 1,
    "name": "Abebe Kebede",
    "email": "abebe@example.com",
    "age": 24
  }
}
```

---

## 8. Postman Testing Guide

### Option 1: 1-Click Import (Recommended)
1. Open Postman.
2. Click **Import** in the upper left corner.
3. Select the file: `postman/User_Management_API.postman_collection.json`.
4. All 16 positive and negative requests are pre-configured with URLs, headers, and request bodies!

---

### Option 2: Manual Testing Steps

#### 1. Create a User (POST)
- Method: `POST`
- URL: `http://localhost:5000/api/users`
- Under **Body**, select **raw** and choose **JSON** from the dropdown.
- Enter:
  ```json
  {
    "name": "Tigist Alemu",
    "email": "tigist@example.com",
    "age": 27
  }
  ```
- Click **Send**. Expected status: `201 Created`.

#### 2. Get All Users (GET)
- Method: `GET`
- URL: `http://localhost:5000/api/users`
- Click **Send**. Expected status: `200 OK`. You should see `Tigist Alemu` in the array.

#### 3. Get User by ID (GET)
- Method: `GET`
- URL: `http://localhost:5000/api/users/1`
- Click **Send**. Expected status: `200 OK`.

#### 4. Update a User (PUT)
- Method: `PUT`
- URL: `http://localhost:5000/api/users/1`
- Body -> raw -> JSON:
  ```json
  {
    "name": "Abebe K. Senior",
    "age": 26
  }
  ```
- Click **Send**. Expected status: `200 OK`.

#### 5. Delete a User (DELETE)
- Method: `DELETE`
- URL: `http://localhost:5000/api/users/1`
- Click **Send**. Expected status: `200 OK`.

---

### Negative Test Cases & Validation Testing

| Test Case | Method | URL | Body / Parameter | Expected Status | Expected Error Message |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Missing Name** | `POST` | `/api/users` | `{"email": "test@test.com", "age": 20}` | `400 Bad Request` | `'name', 'email', and 'age' are all required fields.` |
| **Invalid Email** | `POST` | `/api/users` | `{"name": "Bob", "email": "invalid-email", "age": 20}` | `400 Bad Request` | `Please provide a valid email address.` |
| **Negative Age** | `POST` | `/api/users` | `{"name": "Bob", "email": "bob@test.com", "age": -5}` | `400 Bad Request` | `'age' must be a valid positive integer.` |
| **Duplicate Email** | `POST` | `/api/users` | `{"name": "Copy", "email": "sara@example.com", "age": 28}` | `400 Bad Request` | `A user with the email 'sara@example.com' already exists.` |
| **Nonexistent User** | `GET` | `/api/users/999` | None | `404 Not Found` | `User not found with ID 999` |
| **Invalid ID Format** | `GET` | `/api/users/abc` | None | `400 Bad Request` | `User ID must be a positive integer.` |
| **Delete Nonexistent**| `DELETE` | `/api/users/999` | None | `404 Not Found` | `User not found with ID 999` |

---

## 9. Automated Test Suite

An automated integration test script is provided in `test/api.test.js`. It runs 30 distinct assertion checks covering every success path, error path, and edge case.

To run tests:
```bash
npm test
```

Expected output:
```text
======================================================
📊 Test Results: 30/30 Passed (0 Failed)
======================================================
```

---

## 10. Key Backend Concepts Explained

### 1. What is Node.js?
Node.js is an open-source, cross-platform JavaScript runtime built on Chrome's V8 engine. It allows developers to run JavaScript code outside of a web browser, enabling backend server-side execution.

### 2. What is Express.js?
Express is a fast, unopinionated, minimalist web framework for Node.js. It simplifies routing, middleware integration, HTTP request handling, and response delivery.

### 3. What is a REST API?
A **REST** (Representational State Transfer) API is an architectural style for networked systems. In a REST API, resources (such as `users`) are identified by URIs (`/api/users`), and operations on those resources are performed using standard HTTP methods.

### 4. What are HTTP Methods?
HTTP methods define the desired action to be performed on a given resource:
- **GET**: Safely read/retrieve data.
- **POST**: Submit data to create a new resource.
- **PUT**: Replace/update an existing resource.
- **DELETE**: Remove a resource.

### 5. What is CRUD?
CRUD represents the four fundamental operations of persistent storage:
- **C**reate -> `POST`
- **R**ead -> `GET`
- **U**pdate -> `PUT`
- **D**elete -> `DELETE`

### 6. What is Middleware?
Middleware functions are functions executed between the receipt of an incoming HTTP request and the final response. They can inspect, modify, or reject requests before passing control to the next handler using `next()`.

### 7. What is `express.json()`?
By default, Node.js streams raw bytes from incoming HTTP request bodies. `express.json()` is a built-in Express middleware that intercepts incoming requests with a `Content-Type: application/json` header, parses the raw JSON string into a native JavaScript object, and populates `req.body`.

### 8. What are Route Parameters (`req.params`)?
Route parameters are named URL segments used to capture values at specified positions in the URL path. In the route `/api/users/:id`, `:id` is a route parameter. When a request hits `/api/users/42`, Express populates `req.params.id` with `"42"`.

### 9. What is `req.body`?
`req.body` contains key-value pairs of data submitted in the request payload (typically used in `POST` and `PUT` requests).

### 10. What are HTTP Status Codes?
Standard 3-digit numbers returned by the server to inform the client of the outcome:
- **200 OK**: Request succeeded.
- **201 Created**: Resource successfully created.
- **400 Bad Request**: Client sent invalid data (e.g. missing name, invalid email).
- **404 Not Found**: Resource does not exist.
- **500 Internal Server Error**: Unexpected server-side failure.

### 11. Difference Between Routes and Controllers
- **Routes (`userRoutes.js`)**: Focus on **mapping** (which URL path and HTTP verb leads to which function).
- **Controllers (`userController.js`)**: Focus on **business logic** (validating data, accessing storage, computing responses). Separating them keeps code clean, maintainable, and modular.
