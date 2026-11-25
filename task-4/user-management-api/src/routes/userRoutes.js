/**
 * ============================================================================
 * Routes: userRoutes.js
 * ============================================================================
 * Purpose:
 * Routes define the API endpoints (URL paths + HTTP methods) and map them
 * directly to the appropriate controller functions that handle the request.
 *
 * Route Mapping:
 * - GET    /api/users     -> getAllUsers  (Retrieve all users)
 * - POST   /api/users     -> createUser   (Create a new user)
 * - GET    /api/users/:id -> getUserById  (Retrieve a user by ID)
 * - PUT    /api/users/:id -> updateUser   (Update an existing user by ID)
 * - DELETE /api/users/:id -> deleteUser   (Delete a user by ID)
 *
 * Notice the route parameter ":id".
 * The colon (:) tells Express that "id" is dynamic variable that changes with
 * every request (e.g. /api/users/1, /api/users/2). Express parses this into
 * req.params.id for our controller to inspect.
 * ============================================================================
 */

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Routes for '/api/users'
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// Routes for '/api/users/:id'
router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
