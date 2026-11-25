/**
 * ============================================================================
 * Validation Middleware: validateUser.js
 * ============================================================================
 * Purpose:
 * Intercepts incoming requests before reaching the controller to validate that
 * required fields are present, properly typed, and meet business requirements.
 * Rejects invalid payloads early with HTTP 400 Bad Request.
 * ============================================================================
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate payload for POST /api/users (Create User)
 */
const validateUserCreation = (req, res, next) => {
  const { name, email, age, phone, bio } = req.body;

  // 1. Check required fields
  if (name === undefined || email === undefined || age === undefined) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'name', 'email', and 'age' are required fields."
    });
  }

  // 2. Validate 'name' (non-empty string)
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'name' must be a non-empty string."
    });
  }

  // 3. Validate 'email' format
  const trimmedEmail = String(email).trim().toLowerCase();
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Please provide a valid email address (e.g., user@example.com)."
    });
  }

  // 4. Validate 'age' (positive integer)
  const parsedAge = Number(age);
  if (!Number.isInteger(parsedAge) || parsedAge <= 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'age' must be a positive integer greater than 0."
    });
  }

  // 5. Sanitize request body and proceed
  req.body.name = name.trim();
  req.body.email = trimmedEmail;
  req.body.age = parsedAge;
  req.body.phone = phone ? String(phone).trim() : null;
  req.body.bio = bio ? String(bio).trim() : null;

  next();
};

/**
 * Validate payload for PUT /api/users/:id (Update User)
 */
const validateUserUpdate = (req, res, next) => {
  const { name, email, age, phone, bio } = req.body;

  // 1. Ensure at least one field is provided
  if (name === undefined && email === undefined && age === undefined && phone === undefined && bio === undefined) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Please provide at least one field to update (name, email, age, phone, or bio)."
    });
  }

  // 2. Validate 'name' if provided
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Validation Error: 'name' must be a non-empty string."
      });
    }
    req.body.name = name.trim();
  }

  // 3. Validate 'email' if provided
  if (email !== undefined) {
    const trimmedEmail = String(email).trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: Please provide a valid email address (e.g., user@example.com)."
      });
    }
    req.body.email = trimmedEmail;
  }

  // 4. Validate 'age' if provided
  if (age !== undefined) {
    const parsedAge = Number(age);
    if (!Number.isInteger(parsedAge) || parsedAge <= 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: 'age' must be a positive integer greater than 0."
      });
    }
    req.body.age = parsedAge;
  }

  if (phone !== undefined) {
    req.body.phone = phone ? String(phone).trim() : null;
  }

  if (bio !== undefined) {
    req.body.bio = bio ? String(bio).trim() : null;
  }

  next();
};

module.exports = {
  validateUserCreation,
  validateUserUpdate
};
