# Task 4 – Basic REST API

A REST API for managing user records, developed with Node.js and Express for the SaiKet Systems Full Stack Development Internship.

## Overview

The task is to build a basic REST API with CRUD endpoints for a `User` entity. Each user should contain fields such as name, email, and age. The API should be tested using Postman.

## Requirements

- Build the server with Node.js and Express.
- Create a User entity with name, email, and age.
- Implement CRUD operations:
  - Create a user.
  - Read one or more users.
  - Update a user.
  - Delete a user.
- Test the endpoints using Postman.

## Technologies

- Node.js
- Express.js
- JavaScript
- JSON
- Postman

## API Endpoints

Replace the example paths below with the exact routes implemented in your project.

| Method | Example endpoint | Purpose               |
| ------ | ---------------- | --------------------- |
| GET    | `/api/users`     | Retrieve all users    |
| GET    | `/api/users/:id` | Retrieve a user by ID |
| POST   | `/api/users`     | Create a user         |
| PUT    | `/api/users/:id` | Update a user         |
| DELETE | `/api/users/:id` | Delete a user         |

## Example User

```json
{
  "name": "Alex",
  "email": "alex@example.com",
  "age": 25
}
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the server using the script defined in `package.json`. Common examples are:

```bash
npm run dev
```

or

```bash
npm start
```

Check the terminal for the server URL and port.

## Testing

1. Open Postman.
2. Send requests to the API endpoints.
3. Test successful and unsuccessful requests.
4. Verify that create, read, update, and delete operations behave as expected.

## Learning Outcomes

- Node.js fundamentals.
- Express routing.
- REST API design.
- JSON request and response handling.
- Testing APIs with Postman.
