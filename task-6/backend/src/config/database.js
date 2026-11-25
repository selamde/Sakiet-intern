/**
 * ============================================================================
 * Database Configuration & Prisma Client Initializer
 * ============================================================================
 * Purpose:
 * Connects the Express backend to the PostgreSQL database using Prisma ORM.
 *
 * Architecture:
 * React Frontend -> Express API -> Prisma ORM -> PostgreSQL Database
 *
 * Resilience Feature:
 * Attempts to connect to PostgreSQL via Prisma. If PostgreSQL is offline or
 * unreachable on the developer's local machine, it logs a helpful warning with
 * setup instructions and safely falls back to a mirrored in-memory store so
 * that development, endpoint testing, and frontend interactions remain 100%
 * functional without crashing the server.
 * ============================================================================
 */

const { PrismaClient } = require('@prisma/client');

// Initialize the Prisma Client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});

// Seed data used if PostgreSQL is offline
let fallbackUsers = [
  {
    id: 1,
    name: "Abebe Kebede",
    email: "abebe@example.com",
    age: 24,
    phone: "+251911223344",
    bio: "Senior Frontend Engineer specializing in React and modern UI systems.",
    createdAt: new Date(Date.now() - 86400000 * 5),
    updatedAt: new Date(Date.now() - 86400000 * 2)
  },
  {
    id: 2,
    name: "Sara Alula",
    email: "sara@example.com",
    age: 28,
    phone: "+251922334455",
    bio: "Full Stack Developer passionate about Node.js and scalable architectures.",
    createdAt: new Date(Date.now() - 86400000 * 3),
    updatedAt: new Date(Date.now() - 86400000 * 1)
  },
  {
    id: 3,
    name: "Dawit Haile",
    email: "dawit@example.com",
    age: 31,
    phone: "+251933445566",
    bio: "DevOps Engineer and database performance enthusiast.",
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date()
  }
];

let isDatabaseConnected = false;

// Verify connection to PostgreSQL
async function connectDatabase() {
  try {
    await prisma.$connect();
    isDatabaseConnected = true;
    console.log(`✅ [Database] Successfully connected to PostgreSQL via Prisma ORM!`);
  } catch (error) {
    isDatabaseConnected = false;
    console.warn(`\n⚠️  [Database Warning] Could not connect to PostgreSQL at: ${process.env.DATABASE_URL}`);
    console.warn(`   Reason: ${error.message}`);
    console.warn(`   💡 Tip: Ensure PostgreSQL is installed, running, and DATABASE_URL is configured.`);
    console.warn(`   🔄 Active fallback store enabled to keep server operational for local testing.\n`);
  }
}

// User Model Repository wrapper providing identical Prisma API
const db = {
  isPostgresActive: () => isDatabaseConnected,
  prisma,

  user: {
    findMany: async (args = {}) => {
      if (isDatabaseConnected) {
        return await prisma.user.findMany(args);
      }
      
      let list = [...fallbackUsers];

      // Handle search filter
      if (args.where?.OR) {
        const terms = args.where.OR;
        list = list.filter(u => {
          return terms.some(term => {
            if (term.name?.contains) {
              return u.name.toLowerCase().includes(term.name.contains.toLowerCase());
            }
            if (term.email?.contains) {
              return u.email.toLowerCase().includes(term.email.contains.toLowerCase());
            }
            return false;
          });
        });
      }

      // Handle sorting
      if (args.orderBy) {
        const [field, order] = Object.entries(args.orderBy)[0] || ['id', 'asc'];
        list.sort((a, b) => {
          if (order === 'desc') return a[field] < b[field] ? 1 : -1;
          return a[field] > b[field] ? 1 : -1;
        });
      }

      return list;
    },

    findUnique: async ({ where }) => {
      if (isDatabaseConnected) {
        return await prisma.user.findUnique({ where });
      }

      if (where.id !== undefined) {
        return fallbackUsers.find(u => u.id === Number(where.id)) || null;
      }
      if (where.email !== undefined) {
        return fallbackUsers.find(u => u.email.toLowerCase() === where.email.toLowerCase()) || null;
      }
      return null;
    },

    create: async ({ data }) => {
      if (isDatabaseConnected) {
        return await prisma.user.create({ data });
      }

      const nextId = fallbackUsers.length > 0 ? Math.max(...fallbackUsers.map(u => u.id)) + 1 : 1;
      const newUser = {
        id: nextId,
        name: data.name,
        email: data.email.toLowerCase(),
        age: Number(data.age),
        phone: data.phone || null,
        bio: data.bio || null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      fallbackUsers.push(newUser);
      return newUser;
    },

    update: async ({ where, data }) => {
      if (isDatabaseConnected) {
        return await prisma.user.update({ where, data });
      }

      const index = fallbackUsers.findIndex(u => u.id === Number(where.id));
      if (index === -1) {
        const error = new Error(`Record to update not found.`);
        error.code = 'P2025';
        throw error;
      }

      fallbackUsers[index] = {
        ...fallbackUsers[index],
        ...data,
        updatedAt: new Date()
      };
      return fallbackUsers[index];
    },

    delete: async ({ where }) => {
      if (isDatabaseConnected) {
        return await prisma.user.delete({ where });
      }

      const index = fallbackUsers.findIndex(u => u.id === Number(where.id));
      if (index === -1) {
        const error = new Error(`Record to delete not found.`);
        error.code = 'P2025';
        throw error;
      }

      const deleted = fallbackUsers.splice(index, 1)[0];
      return deleted;
    },

    count: async () => {
      if (isDatabaseConnected) {
        return await prisma.user.count();
      }
      return fallbackUsers.length;
    }
  }
};

module.exports = {
  prisma,
  db,
  connectDatabase
};
