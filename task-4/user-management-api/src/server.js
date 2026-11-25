/**
 * ============================================================================
 * Express Server Entry Point: server.js
 * ============================================================================
 * Purpose:
 * This is the main starting point of our Node.js backend application.
 * It initializes Express, configures global middleware (like express.json()),
 * sets up the root welcome endpoint, mounts API route modules, registers
 * error-handling middleware, and boots up the HTTP server to listen for requests.
 * ============================================================================
 */

// Load environment variables from a .env file if present
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import routes and middleware
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Initialize the Express application
const app = express();

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// ============================================================================
// Global Middleware
// ============================================================================

// Enable CORS (Cross-Origin Resource Sharing) for frontend & external client access
app.use(cors());

// Parse incoming requests with JSON payloads (essential for reading req.body)
app.use(express.json());

// ============================================================================
// Routes
// ============================================================================

/**
 * Root Welcome Endpoint
 * GET /
 * Returns a friendly welcome message, version info, and available endpoints map.
 */
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the User Management REST API! 🚀",
    version: "1.0.0",
    documentation: {
      endpoints: [
        { method: "GET", path: "/api/users", description: "Retrieve all registered users" },
        { method: "GET", path: "/api/users/:id", description: "Retrieve a single user by ID" },
        { method: "POST", path: "/api/users", description: "Create a new user (requires name, email, age in JSON body)" },
        { method: "PUT", path: "/api/users/:id", description: "Update an existing user by ID" },
        { method: "DELETE", path: "/api/users/:id", description: "Delete a user by ID" }
      ]
    }
  });
});

// Mount user management routes under the '/api/users' prefix
app.use('/api/users', userRoutes);

// ============================================================================
// Error Handling Middleware (MUST be registered after all route definitions)
// ============================================================================

// Handle undefined routes with 404
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

// ============================================================================
// Server Listener
// ============================================================================

// Start the server only if run directly (allows importing app in tests if needed)
let server;
if (require.main === module) {
  server = app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 User Management API is running!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📝 Root info: http://localhost:${PORT}/`);
    console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
    console.log(`======================================================\n`);
  });
}

module.exports = { app, server };
