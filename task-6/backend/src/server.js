/**
 * ============================================================================
 * Server Entry Point: server.js (UserHub Backend)
 * ============================================================================
 * Purpose:
 * Boots up the Express REST API, applies CORS and body parsers, connects
 * to the PostgreSQL database via Prisma, mounts resource routes, and provides
 * a health check endpoint.
 * ============================================================================
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { connectDatabase, db } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================================
// Global Middleware
// ============================================================================

// Enable CORS for React frontend (Vite runs on port 5173 or any origin in dev)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse incoming JSON request bodies
app.use(express.json());

// ============================================================================
// Health & Root Endpoints
// ============================================================================

/**
 * Health Check Endpoint
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      type: "PostgreSQL",
      connected: db.isPostgresActive(),
      orm: "Prisma ORM"
    },
    message: "UserHub REST API is operational."
  });
});

/**
 * Root Welcome & Documentation Map
 * GET /
 */
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    name: "UserHub – Full Stack User Management System API",
    version: "1.0.0",
    documentation: {
      health: "/api/health",
      users: "/api/users",
      dashboardStats: "/api/users/stats"
    }
  });
});

// ============================================================================
// Resource Routes
// ============================================================================

app.use('/api/users', userRoutes);

// ============================================================================
// Error Handling Middleware
// ============================================================================

app.use(notFound);
app.use(errorHandler);

// ============================================================================
// Server Listener
// ============================================================================

let server;
if (require.main === module) {
  server = app.listen(PORT, async () => {
    console.log(`\n======================================================`);
    console.log(`🚀 UserHub REST API Server Started`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
    console.log(`👥 Users: http://localhost:${PORT}/api/users`);
    console.log(`======================================================`);

    // Connect to database on startup
    await connectDatabase();
  });
}

module.exports = { app, server };
