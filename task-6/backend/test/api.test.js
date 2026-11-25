/**
 * ============================================================================
 * Backend API Test Suite: api.test.js
 * ============================================================================
 * Purpose:
 * Automatically tests all Express REST endpoints, Prisma queries, validation
 * middleware, and status codes.
 * Runs with: npm test
 * ============================================================================
 */

const { app } = require('../src/server');

const TEST_PORT = 5088;
const BASE_URL = `http://localhost:${TEST_PORT}`;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, name, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${name}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${name}`);
    if (details) console.error(`     Details: ${details}`);
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 Starting UserHub Backend REST API Test Suite');
  console.log('======================================================\n');

  const server = app.listen(TEST_PORT);

  try {
    // 1. Health Check
    console.log('📌 Testing Health & Root:');
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, 'GET /api/health returns HTTP 200 OK');
    assert(healthData.status === 'healthy', 'Health check reports healthy status');

    // 2. GET /api/users
    console.log('\n📌 Testing GET /api/users:');
    const getAllRes = await fetch(`${BASE_URL}/api/users`);
    const getAllData = await getAllRes.json();
    assert(getAllRes.status === 200, 'GET /api/users returns HTTP 200 OK');
    assert(Array.isArray(getAllData.data), 'Returns array of user records');
    assert(getAllData.data.length >= 3, 'Contains initial user seed');

    // 3. GET /api/users/stats
    console.log('\n📌 Testing Dashboard Stats:');
    const statsRes = await fetch(`${BASE_URL}/api/users/stats`);
    const statsData = await statsRes.json();
    assert(statsRes.status === 200, 'GET /api/users/stats returns HTTP 200 OK');
    assert(typeof statsData.data.totalUsers === 'number', 'Stats data contains totalUsers');

    // 4. GET /api/users/:id
    console.log('\n📌 Testing GET /api/users/:id:');
    const getOneRes = await fetch(`${BASE_URL}/api/users/1`);
    const getOneData = await getOneRes.json();
    assert(getOneRes.status === 200, 'GET /api/users/1 returns HTTP 200 OK');
    assert(getOneData.data.id === 1, 'Returns user with ID 1');

    // Nonexistent user 404
    const get404Res = await fetch(`${BASE_URL}/api/users/9999`);
    assert(get404Res.status === 404, 'GET /api/users/9999 returns HTTP 404 Not Found');

    // 5. POST /api/users (Create User)
    console.log('\n📌 Testing POST /api/users (Create):');
    const createRes = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Kassahun Belay',
        email: 'kassahun@example.com',
        age: 29,
        phone: '+251944556677',
        bio: 'Senior Backend Architect'
      })
    });
    const createData = await createRes.json();
    assert(createRes.status === 201, 'POST /api/users returns HTTP 201 Created');
    assert(createData.data.name === 'Kassahun Belay', 'Created user has correct name');

    // Duplicate email check (409)
    const dupRes = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate Abebe',
        email: 'abebe@example.com',
        age: 30
      })
    });
    assert(dupRes.status === 409, 'POST with existing email returns HTTP 409 Conflict');

    // 6. PUT /api/users/:id (Update)
    console.log('\n📌 Testing PUT /api/users/:id (Update):');
    const updateRes = await fetch(`${BASE_URL}/api/users/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Abebe Kebede (Lead FullStack)',
        age: 25
      })
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200, 'PUT /api/users/1 returns HTTP 200 OK');
    assert(updateData.data.name === 'Abebe Kebede (Lead FullStack)', 'User name updated');

    // 7. DELETE /api/users/:id (Delete)
    console.log('\n📌 Testing DELETE /api/users/:id (Delete):');
    const deleteRes = await fetch(`${BASE_URL}/api/users/1`, { method: 'DELETE' });
    assert(deleteRes.status === 200, 'DELETE /api/users/1 returns HTTP 200 OK');

    // Subsequent retrieval returns 404
    const verifyDelRes = await fetch(`${BASE_URL}/api/users/1`);
    assert(verifyDelRes.status === 404, 'Subsequent GET on deleted user returns HTTP 404 Not Found');

  } catch (err) {
    console.error('Test error:', err);
    failedTests++;
  } finally {
    server.close();
    console.log('\n======================================================');
    console.log(`📊 Test Results: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
    console.log('======================================================\n');
    if (failedTests > 0) process.exit(1);
  }
}

runTests();
