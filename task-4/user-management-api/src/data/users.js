/**
 * ============================================================================
 * In-Memory Data Store: users.js
 * ============================================================================
 * Purpose:
 * This file acts as our temporary data storage layer (simulating a database).
 * In beginner backend projects, storing data in an in-memory JavaScript array
 * allows us to learn REST API design, HTTP methods, and CRUD operations
 * without having to set up and manage database systems like MongoDB or PostgreSQL.
 *
 * Important Note on In-Memory Storage:
 * Since this array lives in server memory (RAM), any changes made (creating,
 * updating, or deleting users) will persist only as long as the server is running.
 * Restarting the Node server resets the array back to this initial state.
 * ============================================================================
 */

// Initial seed data for testing
const users = [
  {
    id: 1,
    name: "Abebe Kebede",
    email: "abebe@example.com",
    age: 24
  },
  {
    id: 2,
    name: "Sara Alula",
    email: "sara@example.com",
    age: 28
  },
  {
    id: 3,
    name: "Dawit Haile",
    email: "dawit@example.com",
    age: 31
  }
];

module.exports = users;
