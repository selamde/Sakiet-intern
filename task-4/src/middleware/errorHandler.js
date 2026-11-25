/**
 * ============================================================================
 * Express Middleware: errorHandler.js
 * ============================================================================
 * Purpose:
 * Middleware functions are functions that have access to the request object (req),
 * the response object (res), and the next middleware function in the application's
 * request-response cycle (next).
 *
 * This file contains two essential middleware functions:
 * 1. notFound: Catches any incoming HTTP request that does not match any
 *    registered route endpoint, returning a clean 404 JSON response.
 * 2. errorHandler: A centralized error-handling middleware that catches any
 *    unexpected server errors or syntax errors (such as malformed JSON request bodies),
 *    returning an appropriate HTTP status code (defaulting to 500) and consistent JSON.
 *
 * Important Rule:
 * In Express, error-handling middleware MUST accept four arguments:
 * (err, req, res, next). Express uses the number of arguments (4) to identify it
 * as an error handler. It must always be mounted AFTER all route definitions!
 * ============================================================================
 */

/**
 * 404 Not Found Middleware
 * Triggered when a client sends a request to an endpoint that doesn't exist.
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: Cannot ${req.method} ${req.originalUrl}`
  });
};

/**
 * Global Error Handler Middleware
 * Catches all runtime errors and malformed request issues.
 */
const errorHandler = (err, req, res, next) => {
  // If the error comes from express.json() when parsing invalid JSON syntax
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON syntax in request body. Please verify quotes, brackets, and commas.'
    });
  }

  // Determine status code (use current status code if already set to 4xx, otherwise default to 500)
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  console.error(`[Error] ${err.message}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = {
  notFound,
  errorHandler
};
