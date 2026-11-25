/**
 * ============================================================================
 * Controller: userController.js
 * ============================================================================
 * Purpose:
 * The controller acts as the "brain" of the application.
 * While routes define the URL path and HTTP method, the controller contains
 * the actual business logic: extracting data from the request, validating input,
 * querying or modifying the data source, and constructing the HTTP response.
 *
 * Responsibilities:
 * - getAllUsers: Retrieve and return all users (GET /api/users)
 * - getUserById: Retrieve a single user by ID (GET /api/users/:id)
 * - createUser: Validate input and create a new user (POST /api/users)
 * - updateUser: Validate input and update an existing user (PUT /api/users/:id)
 * - deleteUser: Remove an existing user by ID (DELETE /api/users/:id)
 * ============================================================================
 */

// Import the in-memory users array
const users = require('../data/users');

// Standard Email Validation Regular Expression
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Public
 */
const getAllUsers = (req, res) => {
  // Respond with 200 OK and the complete array of users
  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    count: users.length,
    data: users
  });
};

/**
 * @desc    Get a single user by ID
 * @route   GET /api/users/:id
 * @access  Public
 */
const getUserById = (req, res) => {
  const { id } = req.params;

  // 1. Validate ID format (must be a positive integer)
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID parameter. User ID must be a positive integer."
    });
  }

  // 2. Find user in the in-memory array
  const user = users.find((u) => u.id === parsedId);

  // 3. Return 404 if user does not exist
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User not found with ID ${parsedId}`
    });
  }

  // 4. Return 200 OK with the found user object
  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user
  });
};

/**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Public
 */
const createUser = (req, res) => {
  const { name, email, age } = req.body;

  // 1. Check for missing required fields
  if (name === undefined || email === undefined || age === undefined) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'name', 'email', and 'age' are all required fields."
    });
  }

  // 2. Validate 'name' (non-empty string)
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'name' must be a non-empty string."
    });
  }

  // 3. Validate 'email' format using regex
  const trimmedEmail = String(email).trim().toLowerCase();
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Please provide a valid email address (e.g. user@example.com)."
    });
  }

  // 4. Validate 'age' (must be a positive integer)
  const parsedAge = Number(age);
  if (!Number.isInteger(parsedAge) || parsedAge <= 0) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: 'age' must be a valid positive integer."
    });
  }

  // 5. Check for duplicate email (emails must be unique)
  const emailExists = users.some((u) => u.email.toLowerCase() === trimmedEmail);
  if (emailExists) {
    return res.status(400).json({
      success: false,
      message: `Validation Error: A user with the email '${trimmedEmail}' already exists.`
    });
  }

  // 6. Automatically generate next unique ID
  const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  // 7. Create new user object and append to array
  const newUser = {
    id: nextId,
    name: name.trim(),
    email: trimmedEmail,
    age: parsedAge
  };

  users.push(newUser);

  // 8. Respond with 201 Created and the new user
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser
  });
};

/**
 * @desc    Update an existing user by ID
 * @route   PUT /api/users/:id
 * @access  Public
 */
const updateUser = (req, res) => {
  const { id } = req.params;

  // 1. Validate ID format
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID parameter. User ID must be a positive integer."
    });
  }

  // 2. Find index of user in array
  const userIndex = users.findIndex((u) => u.id === parsedId);
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User not found with ID ${parsedId}`
    });
  }

  const { name, email, age } = req.body;

  // 3. Ensure at least one field was provided to update
  if (name === undefined && email === undefined && age === undefined) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update ('name', 'email', or 'age')."
    });
  }

  // 4. Validate 'name' if provided
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Validation Error: 'name' must be a non-empty string."
      });
    }
  }

  // 5. Validate 'email' if provided
  let formattedEmail;
  if (email !== undefined) {
    formattedEmail = String(email).trim().toLowerCase();
    if (!EMAIL_REGEX.test(formattedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: Please provide a valid email address (e.g. user@example.com)."
      });
    }

    // Check duplicate email (cannot collide with ANOTHER user's email)
    const emailConflict = users.some(
      (u) => u.id !== parsedId && u.email.toLowerCase() === formattedEmail
    );
    if (emailConflict) {
      return res.status(400).json({
        success: false,
        message: `Validation Error: A user with the email '${formattedEmail}' already exists.`
      });
    }
  }

  // 6. Validate 'age' if provided
  let parsedAge;
  if (age !== undefined) {
    parsedAge = Number(age);
    if (!Number.isInteger(parsedAge) || parsedAge <= 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Error: 'age' must be a valid positive integer."
      });
    }
  }

  // 7. Apply updates to the user in memory
  if (name !== undefined) users[userIndex].name = name.trim();
  if (email !== undefined) users[userIndex].email = formattedEmail;
  if (age !== undefined) users[userIndex].age = parsedAge;

  // 8. Respond with 200 OK and updated user object
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: users[userIndex]
  });
};

/**
 * @desc    Delete a user by ID
 * @route   DELETE /api/users/:id
 * @access  Public
 */
const deleteUser = (req, res) => {
  const { id } = req.params;

  // 1. Validate ID format
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID parameter. User ID must be a positive integer."
    });
  }

  // 2. Find index of user to delete
  const userIndex = users.findIndex((u) => u.id === parsedId);
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User not found with ID ${parsedId}`
    });
  }

  // 3. Remove user from array
  const deletedUser = users.splice(userIndex, 1)[0];

  // 4. Respond with 200 OK and confirmation
  res.status(200).json({
    success: true,
    message: `User with ID ${parsedId} deleted successfully`,
    data: deletedUser
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
