/**
 * ============================================================================
 * Error Handling Middleware: errorHandler.js
 * ============================================================================
 * Purpose:
 * Centralized error management for uncaught runtime errors, Prisma database
 * constraint violations, and malformed request bodies.
 * ============================================================================
 */

/**
 * 404 Not Found Middleware
 * Intercepts requests that do not match any defined route.
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: Cannot ${req.method} ${req.originalUrl}`
  });
};

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[Error Handler] ${err.name || 'Error'}: ${err.message}`);

  // Malformed JSON body error from express.json()
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: "Malformed JSON syntax in request body."
    });
  }

  // Prisma Unique Constraint Violation (Error Code P2002)
  if (err.code === 'P2002') {
    const target = err.meta?.target ? err.meta.target.join(', ') : 'field';
    return res.status(409).json({
      success: false,
      message: `Conflict Error: A record with this ${target} already exists.`
    });
  }

  // Prisma Record Not Found (Error Code P2025)
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: "The requested record could not be found."
    });
  }

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

module.exports = {
  notFound,
  errorHandler
};
