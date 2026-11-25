/**
 * ============================================================================
 * Controller: userController.js
 * ============================================================================
 * Purpose:
 * Contains the core business logic for the UserHub REST API.
 * Interacts with PostgreSQL through Prisma ORM to perform complete CRUD
 * operations (Create, Read, Update, Delete) and compute dashboard statistics.
 * ============================================================================
 */

const { db } = require('../config/database');

/**
 * @desc    Get all users (supports search and age filtering)
 * @route   GET /api/users
 * @access  Public
 */
const getAllUsers = async (req, res, next) => {
  try {
    const { search, minAge, maxAge, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const whereClause = {};

    // Search by name or email
    if (search && search.trim() !== '') {
      const searchTerm = search.trim();
      whereClause.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } }
      ];
    }

    // Filter by age range
    if (minAge || maxAge) {
      whereClause.age = {};
      if (minAge && !isNaN(minAge)) whereClause.age.gte = Number(minAge);
      if (maxAge && !isNaN(maxAge)) whereClause.age.lte = Number(maxAge);
    }

    // Safe sorting
    const validSortFields = ['id', 'name', 'email', 'age', 'createdAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const direction = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

    const users = await db.user.findMany({
      where: whereClause,
      orderBy: { [sortField]: direction }
    });

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single user by ID
 * @route   GET /api/users/:id
 * @access  Public
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID parameter. ID must be a positive integer."
      });
    }

    const user = await db.user.findUnique({
      where: { id: parsedId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found with ID ${parsedId}`
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Public
 */
const createUser = async (req, res, next) => {
  try {
    const { name, email, age, phone, bio } = req.body;

    // Check duplicate email
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: `A user with the email '${email}' already exists.`
      });
    }

    // Create user in PostgreSQL via Prisma
    const newUser = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        age: Number(age),
        phone: phone || null,
        bio: bio || null
      }
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing user by ID
 * @route   PUT /api/users/:id
 * @access  Public
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID parameter. ID must be a positive integer."
      });
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { id: parsedId }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: `User not found with ID ${parsedId}`
      });
    }

    const { name, email, age, phone, bio } = req.body;

    // If email is changing, verify no other user holds this email
    if (email && email.toLowerCase() !== existingUser.email.toLowerCase()) {
      const emailConflict = await db.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (emailConflict) {
        return res.status(409).json({
          success: false,
          message: `A user with the email '${email}' already exists.`
        });
      }
    }

    // Construct update payload with provided values
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email.toLowerCase();
    if (age !== undefined) updateData.age = Number(age);
    if (phone !== undefined) updateData.phone = phone || null;
    if (bio !== undefined) updateData.bio = bio || null;

    const updatedUser = await db.user.update({
      where: { id: parsedId },
      data: updateData
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a user by ID
 * @route   DELETE /api/users/:id
 * @access  Public
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID parameter. ID must be a positive integer."
      });
    }

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id: parsedId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found with ID ${parsedId}`
      });
    }

    const deletedUser = await db.user.delete({
      where: { id: parsedId }
    });

    res.status(200).json({
      success: true,
      message: `User '${deletedUser.name}' deleted successfully`,
      data: deletedUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get dashboard metrics & summary statistics
 * @route   GET /api/users/stats
 * @access  Public
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const allUsers = await db.user.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const totalUsers = allUsers.length;
    const recentUsers = allUsers.slice(0, 5);

    // Compute age metrics
    const ages = allUsers.map(u => u.age).filter(a => typeof a === 'number');
    const averageAge = ages.length > 0
      ? Math.round((ages.reduce((sum, a) => sum + a, 0) / ages.length) * 10) / 10
      : 0;

    // Age distribution brackets
    const ageGroups = {
      'Under 25': allUsers.filter(u => u.age < 25).length,
      '25 - 34': allUsers.filter(u => u.age >= 25 && u.age <= 34).length,
      '35 - 49': allUsers.filter(u => u.age >= 35 && u.age <= 49).length,
      '50+': allUsers.filter(u => u.age >= 50).length
    };

    res.status(200).json({
      success: true,
      message: "Dashboard statistics retrieved successfully",
      data: {
        totalUsers,
        averageAge,
        recentUsers,
        ageGroups,
        databaseConnected: db.isPostgresActive()
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getDashboardStats
};
