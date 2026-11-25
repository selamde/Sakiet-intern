/**
 * ============================================================================
 * Automated API Test Suite: api.test.js
 * ============================================================================
 * Purpose:
 * Programmatically tests every CRUD endpoint, status code, JSON response shape,
 * and negative validation scenario without requiring external test runners.
 * Runs with: npm test
 * ============================================================================
 */

const { app } = require('../src/server');

const TEST_PORT = 5099;
const BASE_URL = `http://localhost:${TEST_PORT}`;

// Test tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${testName}`);
    if (details) console.error(`     Details: ${details}`);
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 Starting User Management API Automated Tests');
  console.log('======================================================\n');

  // Start temporary test server
  const server = app.listen(TEST_PORT);

  try {
    // ------------------------------------------------------------------------
    // 1. Root Welcome Endpoint
    // ------------------------------------------------------------------------
    console.log('📌 Testing Root Welcome Endpoint:');
    const rootRes = await fetch(`${BASE_URL}/`);
    const rootData = await rootRes.json();
    assert(rootRes.status === 200, 'GET / returns HTTP 200 OK');
    assert(rootData.success === true, 'Root response contains success: true');
    assert(typeof rootData.message === 'string', 'Root response contains message string');

    // ------------------------------------------------------------------------
    // 2. GET /api/users - Retrieve all users
    // ------------------------------------------------------------------------
    console.log('\n📌 Testing GET /api/users:');
    const getAllRes = await fetch(`${BASE_URL}/api/users`);
    const getAllData = await getAllRes.json();
    assert(getAllRes.status === 200, 'GET /api/users returns HTTP 200 OK');
    assert(Array.isArray(getAllData.data), 'Response data is an array');
    assert(getAllData.data.length >= 3, 'Initial seed contains at least 3 users');

    // ------------------------------------------------------------------------
    // 3. GET /api/users/:id - Retrieve single user
    // ------------------------------------------------------------------------
    console.log('\n📌 Testing GET /api/users/:id:');
    // Valid ID
    const getOneRes = await fetch(`${BASE_URL}/api/users/1`);
    const getOneData = await getOneRes.json();
    assert(getOneRes.status === 200, 'GET /api/users/1 returns HTTP 200 OK');
    assert(getOneData.data.id === 1, 'Returned user has ID 1');
    assert(getOneData.data.name === 'Abebe Kebede', 'Returned user is Abebe Kebede');

    // Nonexistent ID (404)
    const getNonexistentRes = await fetch(`${BASE_URL}/api/users/9999`);
    const getNonexistentData = await getNonexistentRes.json();
    assert(getNonexistentRes.status === 404, 'GET /api/users/9999 returns HTTP 404 Not Found');
    assert(getNonexistentData.success === false, 'Error response has success: false');

    // Invalid ID format (400)
    const getInvalidIdRes = await fetch(`${BASE_URL}/api/users/abc`);
    assert(getInvalidIdRes.status === 400, 'GET /api/users/abc returns HTTP 400 Bad Request');

    // ------------------------------------------------------------------------
    // 4. POST /api/users - Create User (Positive & Negative)
    // ------------------------------------------------------------------------
    console.log('\n📌 Testing POST /api/users:');
    
    // Positive creation
    const validUserPayload = {
      name: 'Selamawit Desta',
      email: 'selamawit@example.com',
      age: 26
    };
    const createRes = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validUserPayload)
    });
    const createData = await createRes.json();
    assert(createRes.status === 201, 'POST /api/users returns HTTP 201 Created');
    assert(createData.data.name === 'Selamawit Desta', 'Created user has correct name');
    assert(createData.data.email === 'selamawit@example.com', 'Created user has correct email');
    assert(typeof createData.data.id === 'number', 'Created user received auto-generated ID');

    // Negative: Missing name
    const missingNameRes = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'noname@example.com', age: 30 })
    });
    assert(missingNameRes.status === 400, 'POST without name returns HTTP 400 Bad Request');

    // Negative: Invalid email format
    const invalidEmailRes = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Bob', email: 'not-an-email', age: 25 })
    });
    assert(invalidEmailRes.status === 400, 'POST with invalid email returns HTTP 400 Bad Request');

    // Negative: Negative age
    const negativeAgeRes = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Charlie', email: 'charlie@example.com', age: -5 })
    });
    assert(negativeAgeRes.status === 400, 'POST with negative age returns HTTP 400 Bad Request');

    // Negative: Duplicate email
    const duplicateEmailRes = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Another Abebe', email: 'abebe@example.com', age: 24 })
    });
    assert(duplicateEmailRes.status === 400, 'POST with duplicate email returns HTTP 400 Bad Request');

    // ------------------------------------------------------------------------
    // 5. PUT /api/users/:id - Update User (Positive & Negative)
    // ------------------------------------------------------------------------
    console.log('\n📌 Testing PUT /api/users/:id:');
    
    // Positive update
    const updateRes = await fetch(`${BASE_URL}/api/users/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Abebe Kebede (Lead)', age: 25 })
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200, 'PUT /api/users/1 returns HTTP 200 OK');
    assert(updateData.data.name === 'Abebe Kebede (Lead)', 'User name was updated');
    assert(updateData.data.age === 25, 'User age was updated');

    // Negative: Update nonexistent user (404)
    const updateNonexistentRes = await fetch(`${BASE_URL}/api/users/9999`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Ghost' })
    });
    assert(updateNonexistentRes.status === 404, 'PUT /api/users/9999 returns HTTP 404 Not Found');

    // Negative: Duplicate email collision on update
    const updateDuplicateRes = await fetch(`${BASE_URL}/api/users/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sara@example.com' })
    });
    assert(updateDuplicateRes.status === 400, 'PUT with email of another user returns HTTP 400 Bad Request');

    // ------------------------------------------------------------------------
    // 6. DELETE /api/users/:id - Delete User
    // ------------------------------------------------------------------------
    console.log('\n📌 Testing DELETE /api/users/:id:');
    
    // Delete existing user
    const deleteRes = await fetch(`${BASE_URL}/api/users/1`, { method: 'DELETE' });
    const deleteData = await deleteRes.json();
    assert(deleteRes.status === 200, 'DELETE /api/users/1 returns HTTP 200 OK');
    assert(deleteData.success === true, 'Delete response contains success: true');

    // Verify deletion: user 1 should now be 404
    const verifyDeleteRes = await fetch(`${BASE_URL}/api/users/1`);
    assert(verifyDeleteRes.status === 404, 'Subsequent GET on deleted user returns HTTP 404 Not Found');

    // Delete nonexistent user (404)
    const deleteNonexistentRes = await fetch(`${BASE_URL}/api/users/9999`, { method: 'DELETE' });
    assert(deleteNonexistentRes.status === 404, 'DELETE on nonexistent user returns HTTP 404 Not Found');

    // ------------------------------------------------------------------------
    // 7. Route & Middleware edge cases
    // ------------------------------------------------------------------------
    console.log('\n📌 Testing 404 & Middleware:');
    const unknownRouteRes = await fetch(`${BASE_URL}/api/unknown-endpoint`);
    assert(unknownRouteRes.status === 404, 'Undefined route returns HTTP 404 Not Found JSON');

  } catch (err) {
    console.error('Test execution error:', err);
    failedTests++;
  } finally {
    // Cleanly shut down test server
    server.close();
    console.log('\n======================================================');
    console.log(`📊 Test Results: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
    console.log('======================================================\n');
    if (failedTests > 0) process.exit(1);
  }
}

runTests();
