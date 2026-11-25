/**
 * ============================================================================
 * Routes: userRoutes.js
 * ============================================================================
 * Purpose:
 * Maps URL paths and HTTP verbs directly to the corresponding validation
 * middleware and controller logic.
 *
 * Endpoints:
 * - GET    /api/users       -> Retrieve all users (with optional ?search=&minAge=&maxAge=)
 * - POST   /api/users       -> Validate and create a new user
 * - GET    /api/users/stats -> Retrieve summary metrics for the dashboard
 * - GET    /api/users/:id   -> Retrieve a single user by ID
 * - PUT    /api/users/:id   -> Validate and update a user by ID
 * - DELETE /api/users/:id   -> Delete a user by ID
 * ============================================================================
 */

const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getDashboardStats
} = require('../controllers/userController');

const {
  validateUserCreation,
  validateUserUpdate
} = require('../middleware/validateUser');

// Dashboard statistics endpoint (must be declared BEFORE /:id to prevent route shadowing)
router.get('/stats', getDashboardStats);

// Collection routes
router.route('/')
  .get(getAllUsers)
  .post(validateUserCreation, createUser);

// Individual resource routes
router.route('/:id')
  .get(getUserById)
  .put(validateUserUpdate, updateUser)
  .delete(deleteUser);

module.exports = router;
