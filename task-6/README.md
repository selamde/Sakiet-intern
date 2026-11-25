# UserHub — Full Stack User Management System

**UserHub** is a modern, enterprise-grade, full-stack User Management application built with **React.js (Vite + Tailwind CSS)** on the frontend, **Node.js + Express.js** on the backend, and **PostgreSQL** persisted through the **Prisma ORM**.

Designed and engineered following industry standard architectural patterns, clean separation of concerns, and beginner-friendly, educational principles.

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [Technology Stack](#-technology-stack)
3. [System Architecture & Data Flow](#-system-architecture--data-flow)
4. [Project Structure](#-project-structure)
5. [Prerequisites](#-prerequisites)
6. [Installation & Setup](#-installation--setup)
7. [PostgreSQL Database & Prisma Setup](#-postgresql-database--prisma-setup)
8. [Running the Application](#-running-the-application)
9. [REST API Documentation](#-rest-api-documentation)
10. [Postman Testing Guide](#-postman-testing-guide)
11. [Automated Testing Suite](#-automated-testing-suite)
12. [Educational Guide & Full-Stack Concepts](#-educational-guide--full-stack-concepts)

---

## 🌟 Project Overview

**UserHub** allows organizations to manage user profiles through a reactive, responsive dashboard. It supports complete Create, Read, Update, and Delete (CRUD) operations, live search and multi-criteria filtering, demographic analytics, and safe deletion modals.

### Core Capabilities:
- **Responsive SaaS Dashboard**: Real-time KPI statistics (Total Users, Average Age, Recent Registrations, Database Status).
- **Users Table & Card Views**: Switch between tabular data view on desktop and card grid on mobile/tablet.
- **Search & Filter**: Real-time name and email search, age range filtering (min/max), and sorting by creation date, age, or name.
- **Full Profile Inspector**: Inspect user details, registration timestamps, primary keys, and raw JSON API payloads.
- **Safety Confirmations**: Accessible modal dialogues before permanent deletions from PostgreSQL.
- **Dual-Mode Resilient Database Layer**: Built for genuine PostgreSQL with Prisma ORM; automatically activates an in-memory repository if local PostgreSQL is temporarily offline so frontend development and evaluation never halt.

---

## 🛠 Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend UI** | React 18, TypeScript, Vite 6, Tailwind CSS 3, shadcn/ui, Radix UI, Recharts |
| **Icons & Styling** | Lucide React, Plus Jakarta Sans, PostCSS, Autoprefixer, tailwindcss-animate |
| **HTTP Client** | Axios (configured with base URL, error interceptors, timeout) |
| **Backend API** | Node.js (v18+), Express.js (v4) |
| **ORM & Database** | Prisma ORM (v5), PostgreSQL |
| **Dev & Quality Tools** | Nodemon, Dotenv, CORS, Node Test Runner |

---

## 🏗 System Architecture & Data Flow

```
┌────────────────────────────────────────────────────────┐
│               Frontend (Client Tier)                   │
│  React.js (Port 5173) + Tailwind CSS + Lucide Icons    │
│  Components: Navbar, Sidebar, UserTable, UserForm ...  │
└───────────────────────────┬────────────────────────────┘
                            │
               Axios HTTP (JSON over REST)
                            │
┌───────────────────────────▼────────────────────────────┐
│               Backend (Application Tier)               │
│  Node.js + Express.js REST API (Port 5000)             │
│  Middlewares: CORS, express.json(), validateUser       │
│  Controllers: userController.js (CRUD business logic)  │
└───────────────────────────┬────────────────────────────┘
                            │
              Prisma Client Database Driver
                            │
┌───────────────────────────▼────────────────────────────┐
│               Database (Persistence Tier)              │
│  PostgreSQL Database (Port 5432)                       │
│  Schema: User Table (id, name, email, age, bio, etc.)  │
└────────────────────────────────────────────────────────┘
```

> **Security Rule**: The React frontend **never** connects directly to PostgreSQL. All database interactions are mediated by the Express REST API and authenticated/validated on the backend.

---

## 📁 Project Structure

```
user-management-system/
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma         # Prisma schema defining User model & PostgreSQL connection
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js       # Prisma client initialization & resilient repository fallback
│   │   ├── controllers/
│   │   │   └── userController.js # CRUD business logic, query handling & stats computation
│   │   ├── middleware/
│   │   │   ├── errorHandler.js   # 404 handler and central error response middleware
│   │   │   └── validateUser.js   # Request body validation for create and update operations
│   │   ├── routes/
│   │   │   └── userRoutes.js     # Express router mapping REST endpoints to controllers
│   │   └── server.js             # Express app entry point, CORS config, health check route
│   │
│   ├── test/
│   │   └── api.test.js           # Automated end-to-end REST API integration test suite
│   ├── .env                      # Backend environment variables (PORT, DATABASE_URL)
│   ├── .env.example              # Environment template for PostgreSQL connection string
│   ├── .gitignore
│   └── package.json              # Backend dependencies and scripts
│
├── frontend/
│   ├── public/                   # Static assets and icons
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── DeleteModal.jsx   # Accessible confirmation modal for deleting users
│   │   │   ├── Navbar.jsx        # Top navigation with live backend health status badge
│   │   │   ├── SearchBar.jsx     # Keyword search, age filter sliders, and sorting controls
│   │   │   ├── Sidebar.jsx       # Navigation drawer with active route highlights
│   │   │   ├── StatsCard.jsx     # Metric summary cards for dashboard KPIs
│   │   │   ├── UserCard.jsx      # Mobile card representation of user record
│   │   │   ├── UserForm.jsx      # Reusable form component with client-side validations
│   │   │   └── UserTable.jsx     # Responsive tabular view with initials avatar generation
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx     # Analytics, age demographic bars, and recent signups
│   │   │   ├── Users.jsx         # User directory with table/card view switcher & search
│   │   │   ├── AddUser.jsx       # Form page to create a new user profile
│   │   │   ├── UserDetails.jsx   # Profile view with raw JSON preview and delete trigger
│   │   │   └── EditUser.jsx      # Edit page to update existing profile details
│   │   │
│   │   ├── services/
│   │   │   └── userService.js    # Centralized Axios service layer for all backend calls
│   │   ├── App.jsx               # React Router routes, toast notifications, layout
│   │   ├── main.jsx              # React 18 createRoot mount
│   │   └── index.css             # Tailwind base styles and custom animations
│   │
│   ├── index.html                # Single-page HTML container with Google Fonts
│   ├── vite.config.js            # Vite configuration (Port 5173)
│   ├── tailwind.config.js        # Tailwind color palette and typography configuration
│   ├── postcss.config.js
│   ├── .env                      # Frontend environment variable (VITE_API_URL)
│   ├── .env.example
│   └── package.json              # Frontend dependencies and build scripts
│
├── package.json                  # Root monorepo workspace scripts
├── .gitignore
└── README.md                     # Comprehensive documentation and learning guide
```

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
- **Node.js**: v18.0.0 or later (Tested on v24.18.0)
- **npm**: v9.0.0 or later (Tested on v11.16.0)
- **PostgreSQL**: v13+ or a Docker container (Optional for immediate evaluation due to resilient fallback)

---

## 🚀 Installation & Setup

### 1. Clone or Open the Repository
```bash
cd c:\Users\Nebyou\Desktop\saiket-internship\task-6\user-management-system
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

## 🐘 PostgreSQL Database & Prisma Setup

### 1. Database Connection String
Open `backend/.env` and configure your PostgreSQL credentials:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/userhub_db?schema=public"
```

### 2. Run Prisma Migrations
Generate the Prisma Client and migrate the schema into your PostgreSQL database:
```bash
cd backend

# Generate the Prisma Client
npx prisma generate

# Apply the migration to create the User table in PostgreSQL
npx prisma migrate dev --name init
```

### 3. Launch Prisma Studio (Optional GUI)
To visually browse and manage your PostgreSQL tables via Prisma's visual GUI:
```bash
npx prisma studio
```
This opens Prisma Studio in your browser at `http://localhost:5555`.

### 4. Running PostgreSQL with Docker (Alternative)
If you do not have PostgreSQL installed locally, you can start a temporary container:
```bash
docker run --name postgres-userhub -e POSTGRES_PASSWORD=password -e POSTGRES_DB=userhub_db -p 5432:5432 -d postgres:15
```

---

## ⚡ Running the Application

### Method A: Start Backend and Frontend in Separate Terminals

#### Terminal 1 — Backend API (Port 5000)
```bash
cd backend
npm run dev
```
*Output:*
```
🚀 Server running on http://localhost:5000
📡 REST API endpoints mounted at http://localhost:5000/api/users
🩺 Health check: http://localhost:5000/api/health
```

#### Terminal 2 — Frontend Application (Port 5173)
```bash
cd frontend
npm run dev
```
*Output:*
```
  VITE v6.4.6  ready in 220 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser at **`http://localhost:5173`** to access the UserHub dashboard.

---

## 📡 REST API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/health` | Check backend server & database status | `200 OK` |
| **GET** | `/users/stats` | Dashboard aggregated statistics | `200 OK` |
| **GET** | `/users` | Retrieve all users (with search & filters) | `200 OK` |
| **GET** | `/users/:id` | Retrieve a single user profile by ID | `200 OK`, `404 Not Found` |
| **POST** | `/users` | Create a new user profile | `201 Created`, `400 Bad Request`, `409 Conflict` |
| **PUT** | `/users/:id` | Update an existing user profile | `200 OK`, `400 Bad Request`, `404`, `409` |
| **DELETE** | `/users/:id` | Delete a user profile permanently | `200 OK`, `404 Not Found` |

---

### Detailed Endpoint Specifications

#### 1. GET `/api/health`
Returns system status and database provider info.
```json
{
  "success": true,
  "message": "UserHub REST API is operational",
  "status": "healthy",
  "database": {
    "connected": true,
    "provider": "PostgreSQL"
  },
  "timestamp": "2026-11-19T17:00:00.000Z"
}
```

#### 2. POST `/api/users` (Create User)
**Request Headers:** `Content-Type: application/json`  
**Request Body:**
```json
{
  "name": "Abebe Kebede",
  "email": "abebe@example.com",
  "age": 24,
  "phone": "+251912345678",
  "bio": "Full-stack software developer specializing in React and Node.js."
}
```
**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "Abebe Kebede",
    "email": "abebe@example.com",
    "age": 24,
    "phone": "+251912345678",
    "bio": "Full-stack software developer specializing in React and Node.js.",
    "createdAt": "2026-11-19T17:01:00.000Z",
    "updatedAt": "2026-11-19T17:01:00.000Z"
  }
}
```

#### 3. GET `/api/users` (Get All Users with Query Filters)
**Supported Query Parameters:**
- `search`: Filter by name or email (e.g. `?search=abebe`)
- `minAge`: Filter users with age $\ge$ value (e.g. `?minAge=20`)
- `maxAge`: Filter users with age $\le$ value (e.g. `?maxAge=35`)
- `sortBy`: `createdAt`, `name`, `age`, `email`
- `sortOrder`: `asc` or `desc`

**Response (`200 OK`):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "Abebe Kebede",
      "email": "abebe@example.com",
      "age": 24,
      "phone": "+251912345678",
      "bio": "Full-stack software developer specializing in React and Node.js.",
      "createdAt": "2026-11-19T17:01:00.000Z",
      "updatedAt": "2026-11-19T17:01:00.000Z"
    }
  ]
}
```

#### 4. GET `/api/users/:id` (Get Single User)
**Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Abebe Kebede",
    "email": "abebe@example.com",
    "age": 24,
    "phone": "+251912345678",
    "bio": "Full-stack software developer...",
    "createdAt": "2026-11-19T17:01:00.000Z",
    "updatedAt": "2026-11-19T17:01:00.000Z"
  }
}
```
**Error Response (`404 Not Found`):**
```json
{
  "success": false,
  "message": "User with ID 9999 was not found"
}
```

#### 5. PUT `/api/users/:id` (Update User)
**Request Body:**
```json
{
  "name": "Abebe K. Kebede",
  "age": 25,
  "bio": "Senior Full-Stack Engineer"
}
```
**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Abebe K. Kebede",
    "email": "abebe@example.com",
    "age": 25,
    "phone": "+251912345678",
    "bio": "Senior Full-Stack Engineer",
    "createdAt": "2026-11-19T17:01:00.000Z",
    "updatedAt": "2026-11-19T17:05:00.000Z"
  }
}
```

#### 6. DELETE `/api/users/:id` (Delete User)
**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "User with ID 1 was successfully deleted",
  "deletedUser": {
    "id": 1,
    "name": "Abebe K. Kebede"
  }
}
```

---

## 📮 Postman Testing Guide

Follow these steps to test each endpoint with Postman:

1. **Verify Server Health**:
   - Method: `GET`
   - URL: `http://localhost:5000/api/health`
   - Expected status: `200 OK`.

2. **Create a User**:
   - Method: `POST`
   - URL: `http://localhost:5000/api/users`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "name": "Sara Alula",
       "email": "sara.alula@example.com",
       "age": 26,
       "phone": "+251922334455",
       "bio": "Cloud architect and DevOps enthusiast"
     }
     ```
   - Expected status: `201 Created`.

3. **Retrieve All Users**:
   - Method: `GET`
   - URL: `http://localhost:5000/api/users`
   - Expected status: `200 OK`.

4. **Retrieve Single User by ID**:
   - Method: `GET`
   - URL: `http://localhost:5000/api/users/1`
   - Expected status: `200 OK`.

5. **Update User**:
   - Method: `PUT`
   - URL: `http://localhost:5000/api/users/1`
   - Body (raw JSON):
     ```json
     {
       "name": "Sara A. Alula",
       "age": 27
     }
     ```
   - Expected status: `200 OK`.

6. **Delete User**:
   - Method: `DELETE`
   - URL: `http://localhost:5000/api/users/1`
   - Expected status: `200 OK`.

7. **Negative Test — Duplicate Email Prevention**:
   - POST a user with an email that is already in use.
   - Expected status: `409 Conflict`.
   - Message: `"A user with email '...' already exists"`.

8. **Negative Test — Validation Failure**:
   - POST with an empty name or negative age (`"age": -5`).
   - Expected status: `400 Bad Request`.

9. **Negative Test — Nonexistent ID**:
   - GET `http://localhost:5000/api/users/99999`
   - Expected status: `404 Not Found`.

---

## 🧪 Automated Testing Suite

UserHub includes an automated test suite verifying all 17 integration test assertions without external test runners:

```bash
cd backend
npm test
```

### Test Suite Output:
```
======================================================
🧪 Starting UserHub Backend REST API Test Suite
======================================================

📌 Testing Health & Root:
  ✅ PASS: GET /api/health returns HTTP 200 OK
  ✅ PASS: Health check reports healthy status

📌 Testing GET /api/users:
  ✅ PASS: GET /api/users returns HTTP 200 OK
  ✅ PASS: Returns array of user records
  ✅ PASS: Contains initial user seed

📌 Testing Dashboard Stats:
  ✅ PASS: GET /api/users/stats returns HTTP 200 OK
  ✅ PASS: Stats data contains totalUsers

📌 Testing GET /api/users/:id:
  ✅ PASS: GET /api/users/1 returns HTTP 200 OK
  ✅ PASS: Returns user with ID 1
  ✅ PASS: GET /api/users/9999 returns HTTP 404 Not Found

📌 Testing POST /api/users (Create):
  ✅ PASS: POST /api/users returns HTTP 201 Created
  ✅ PASS: Created user has correct name
  ✅ PASS: POST with existing email returns HTTP 409 Conflict

📌 Testing PUT /api/users/:id (Update):
  ✅ PASS: PUT /api/users/1 returns HTTP 200 OK
  ✅ PASS: User name updated

📌 Testing DELETE /api/users/:id (Delete):
  ✅ PASS: DELETE /api/users/1 returns HTTP 200 OK
  ✅ PASS: Subsequent GET on deleted user returns HTTP 404 Not Found

======================================================
📊 Test Results: 17/17 Passed (0 Failed)
======================================================
```

---

## 📚 Educational Guide & Full-Stack Concepts

This section provides clear, in-depth explanations of full-stack engineering fundamentals required in **Section 14 of the specification**.

---

### 1. What is Frontend Development?
**Frontend development** is the creation of the graphical user interface (GUI) of an application that runs directly on the user's client device (e.g. in a web browser like Chrome or Safari).
- **Core technologies**: HTML (structure), CSS (presentation/styling), and JavaScript (interactivity).
- **Modern frameworks**: React, Vue, Angular simplify building complex state-driven, component-based user interfaces.
- **Role in UserHub**: The React frontend renders the forms, tables, modals, handles client-side input validation, and delivers a fast, responsive user experience without refreshing the entire page.

---

### 2. What is Backend Development?
**Backend development** encompasses the server-side logic, data processing, business rules, and database communication that powers an application behind the scenes.
- **Core technologies**: Node.js, Express, Python, Go, Java, databases (PostgreSQL, MySQL, MongoDB).
- **Role in UserHub**: The Node.js and Express backend exposes secure REST endpoints, validates incoming payloads, talks to PostgreSQL via Prisma ORM, enforces uniqueness constraints on emails, and sends structured JSON responses back to the frontend.

---

### 3. How Does a Client Communicate with a Server?
Clients and servers communicate using the **Hypertext Transfer Protocol (HTTP)** through a standard **Request-Response cycle**:
1. **Request**: The client (React app using Axios) constructs an HTTP request containing:
   - A **Method** (e.g., `GET`, `POST`, `PUT`, `DELETE`).
   - A **URL / Path** (e.g., `http://localhost:5000/api/users`).
   - **Headers** (e.g., `Content-Type: application/json`).
   - An optional **Body** containing data formatted as JSON.
2. **Transmission**: The request travels over the network (TCP/IP) to the host and port where the Express server listens.
3. **Processing**: Express processes the request through middleware, executes controller logic, and interfaces with the database.
4. **Response**: Express sends back an HTTP response containing:
   - An **HTTP Status Code** (e.g., `200 OK`, `201 Created`, `400 Bad Request`).
   - Response **Headers**.
   - A **JSON Response Body** (e.g., `{ success: true, data: [...] }`).
5. **Consumption**: Axios parses the JSON body and resolves a JavaScript Promise, allowing React to update its component state.

---

### 4. What is a REST API?
**REST (Representational State Transfer)** is an architectural style for designing networked web services.
- **Resource-Oriented**: Resources are identified by standard URI paths (e.g., `/api/users`).
- **Standard HTTP Methods**:
  - `GET`: Read / retrieve resources.
  - `POST`: Create a new resource.
  - `PUT`: Update / replace an existing resource.
  - `DELETE`: Remove a resource.
- **Statelessness**: Every request contains all the information the server needs to fulfill it. The server does not store client session state between requests.
- **Standard Status Codes**:
  - `200 OK`: Request succeeded.
  - `201 Created`: New resource successfully created.
  - `400 Bad Request`: Invalid client input.
  - `404 Not Found`: Requested resource does not exist.
  - `409 Conflict`: Resource already exists (e.g., duplicate email).
  - `500 Internal Server Error`: Server encountered an unhandled exception.

---

### 5. What is a Database? Relational vs. Non-Relational
A **database** is an organized, persistent repository for storing, querying, and managing structured data.
- **Relational Databases (SQL / RDBMS)**:
  - Store data in structured tables composed of rows and columns with strict data types.
  - Support relationships (one-to-one, one-to-many, many-to-many) via Primary Keys and Foreign Keys.
  - Enforce ACID properties (Atomicity, Consistency, Isolation, Durability).
  - Examples: **PostgreSQL**, MySQL, SQLite.
- **Non-Relational Databases (NoSQL)**:
  - Store data as flexible JSON-like documents, key-value pairs, or graphs without strict schemas.
  - Examples: MongoDB, Redis.
- **Why PostgreSQL for UserHub**: User profiles have structured attributes (`name`, `email`, `age`) where unique constraints and transactional integrity are paramount.

---

### 6. What is PostgreSQL?
**PostgreSQL** is an advanced, open-source object-relational database management system (ORDBMS). It is renowned for reliability, SQL standard compliance, concurrency (MVCC), and enterprise data integrity.

In UserHub, PostgreSQL holds the `User` table, ensuring that no two users can share the same email address (`@unique` index) and auto-incrementing integer Primary Keys (`id`).

---

### 7. What is Prisma ORM?
An **ORM (Object-Relational Mapping)** tool allows developers to interact with a SQL database using the native programming language (JavaScript) instead of writing raw SQL strings (`SELECT * FROM "User"`).

**Prisma ORM** provides:
1. **Prisma Schema (`schema.prisma`)**: A single declarative source of truth defining database models and connections.
2. **Prisma Client**: An auto-generated query builder that provides complete type-safety, auto-completion, and methods like `prisma.user.findMany()`, `prisma.user.create()`, `prisma.user.update()`.
3. **Prisma Migrate**: A migration engine that translates model changes in `schema.prisma` into versioned SQL migration scripts (`CREATE TABLE "User" ...`).
4. **Prisma Studio**: A built-in GUI for visualizing and editing database records.

---

### 8. What is Axios?
**Axios** is a promise-based HTTP client library for the browser and Node.js.
- **Advantages over native `fetch()`**:
  - Automatically transforms JSON responses (no need to call `.then(res => res.json())`).
  - Automatically throws errors for HTTP status codes outside the 2xx range (whereas `fetch` only rejects on network failures).
  - Built-in support for request/response interceptors, request cancellation, and configurable default baseURL and timeouts.

---

### 9. What is CORS?
**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism that restricts a web page from making requests to a different domain, protocol, or port than the one that served the web page (Same-Origin Policy).

- In development, the React frontend runs on `http://localhost:5173` while Express runs on `http://localhost:5000`.
- Because the ports differ, browsers consider this a cross-origin request and block it unless the server explicitly grants permission.
- **Solution in Express**:
  ```javascript
  const cors = require('cors');
  app.use(cors({ origin: 'http://localhost:5173' }));
  ```
  This attaches the HTTP response header `Access-Control-Allow-Origin: http://localhost:5173`, instructing the browser that communication is authorized.

---

### 10. How Do React `useState` and `useEffect` Work?

#### `useState` (State Management):
Allows functional components to store and update dynamic data that triggers UI re-renders when changed.
```javascript
const [users, setUsers] = useState([]);
// When setUsers(newUsers) is called, React re-renders the component with the new data.
```

#### `useEffect` (Side Effects):
Allows functional components to execute side effects—such as fetching data from an API, subscribing to events, or manipulating the DOM—after the component renders.
```javascript
useEffect(() => {
  // Executes once when the component mounts because the dependency array is empty []
  fetchUsers();
}, []);
```
If values are placed in the dependency array (e.g. `[searchTerm, minAge]`), the effect re-runs whenever those dependencies change.

---

### 11. How Do API Requests Work in React?
React components do not directly query databases. Instead:
1. When a component mounts or a user takes an action (clicks submit, types in search), a handler function triggers an API call via Axios.
2. Before the request, state is updated to indicate loading (`setIsLoading(true)`).
3. The asynchronous HTTP promise resolves with the data.
4. The component saves the data into local state (`setUsers(response.data)`).
5. The loading flag is cleared (`setIsLoading(false)`).
6. React automatically computes the virtual DOM diff and updates the real DOM with the new records.

---

### 12. How Does CRUD Work Across the Entire Stack?

| Operation | React Frontend | Axios Request | Express Controller | Prisma ORM | PostgreSQL Database |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Create** | Fill `UserForm` -> Submit | `POST /api/users` | `createUser()` | `prisma.user.create()` | `INSERT INTO "User"` |
| **Read** | Render `UserTable` | `GET /api/users` | `getAllUsers()` | `prisma.user.findMany()` | `SELECT * FROM "User"` |
| **Update** | Edit form -> Save | `PUT /api/users/:id` | `updateUser()` | `prisma.user.update()` | `UPDATE "User" SET ...` |
| **Delete** | Modal confirm | `DELETE /api/users/:id` | `deleteUser()` | `prisma.user.delete()` | `DELETE FROM "User"` |

---

### 13. What Are Environment Variables?
**Environment variables** are external configuration values stored outside application source code in `.env` files or operating system environments.
- **Why use them?**
  1. **Security**: Avoid hardcoding sensitive credentials (such as database passwords, API keys, or JWT secrets) into version control.
  2. **Portability**: Allows the exact same codebase to run in different environments (Development, Staging, Production) with different configuration (e.g. `DATABASE_URL` pointing to localhost in dev and Amazon RDS in production).
- In Node.js/Express, variables are loaded via `dotenv` and accessed with `process.env.PORT`.
- In Vite/React, variables prefixed with `VITE_` are exposed via `import.meta.env.VITE_API_URL`.

---

### 14. Complete End-to-End Walkthrough: Creating a User Profile

Here is the exact step-by-step lifecycle of what happens when a user registers a profile in UserHub:

1. **User Action (React UI)**:
   The user navigates to `/users/new`, enters `"Abebe Kebede"`, `"abebe@example.com"`, and `"24"`, and clicks **Create User Profile**.
2. **Client-side Validation (React)**:
   `UserForm.jsx` validates that the name is at least 2 characters, the email matches a valid email regex, and the age is a positive integer.
3. **HTTP Dispatch (Axios)**:
   `userService.createUser(userData)` sends an HTTP `POST` request to `http://localhost:5000/api/users` with headers `Content-Type: application/json` and a JSON string body.
4. **CORS & JSON Parsing (Express Middleware)**:
   Express receives the TCP packet. `cors()` verifies the origin. `express.json()` parses the raw stream into `req.body`.
5. **Server Validation (validateUser Middleware)**:
   `validateUserCreation` verifies that all mandatory fields are present and correctly formatted.
6. **Controller Logic (userController.js)**:
   The controller invokes `prisma.user.findUnique({ where: { email } })` to confirm no conflict exists.
7. **Database Persistence (Prisma -> PostgreSQL)**:
   Prisma executes `prisma.user.create({ data: { name, email, age, phone, bio } })`.
   PostgreSQL executes the parameterized SQL statement:
   ```sql
   INSERT INTO "User" ("name", "email", "age", "phone", "bio", "createdAt", "updatedAt")
   VALUES ('Abebe Kebede', 'abebe@example.com', 24, NULL, NULL, NOW(), NOW())
   RETURNING *;
   ```
   PostgreSQL assigns an auto-incremented primary key (`id = 1`) and commits the transaction.
8. **HTTP Response (Express)**:
   The controller wraps the newly saved record in a standardized JSON payload and responds with `HTTP 201 Created`.
9. **UI Update (React DOM)**:
   Axios resolves the promise. `AddUser.jsx` navigates to `/users` with a success toast notification.
10. **Refreshed Table**:
    `Users.jsx` calls `userService.getUsers()`, the new user appears at the top of the table, and the dashboard statistics update instantaneously.

---

## 📜 License
This project is open-source under the MIT License. Developed for the Saiket Systems Full-Stack Software Engineering Internship.
