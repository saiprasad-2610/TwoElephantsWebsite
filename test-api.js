#!/usr/bin/env node

/**
 * API Connectivity Test Script
 * Tests all API endpoints to verify routing and connectivity
 */

const axios = require('axios');

// Configuration
const API_BASE = process.env.API_BASE_URL || 'https://twoelephantswebsitebackend.onrender.com';

// Test endpoints
const endpoints = [
  // Public endpoints
  { method: 'GET', path: '/api/public/roles/', description: 'Get active job roles' },
  { method: 'GET', path: '/api/public/articles/', description: 'Get all articles' },
  { method: 'POST', path: '/api/public/contact/', description: 'Submit contact form', 
    data: { fname: 'Test', lname: 'User', email: 'test@example.com', location: 'Test', interest: 'General', message: 'Test message' } },
  
  // Admin endpoints (may require authentication)
  { method: 'GET', path: '/api/contacts/', description: 'Get contacts (admin)' },
  { method: 'GET', path: '/api/jobs/', description: 'Get jobs (admin)' },
  { method: 'GET', path: '/api/applications/', description: 'Get applications (admin)' },
  { method: 'GET', path: '/api/articles/', description: 'Get articles (admin)' },
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`\u2713 ${message}`, colors.green);
}

function logError(message) {
  log(`\u2717 ${message}`, colors.red);
}

function logInfo(message) {
  log(`\u2139 ${message}`, colors.blue);
}

function logWarning(message) {
  log(`\u26a0 ${message}`, colors.yellow);
}

async function testEndpoint(endpoint) {
  const url = `${API_BASE}${endpoint.path}`;
  
  try {
    logInfo(`Testing ${endpoint.method} ${url}`);
    
    const config = {
      method: endpoint.method,
      url: url,
      timeout: 10000, // 10 seconds timeout
    };

    if (endpoint.data) {
      config.data = endpoint.data;
      config.headers = { 'Content-Type': 'application/json' };
    }

    const response = await axios(config);
    
    logSuccess(`${endpoint.description} - Status: ${response.status}`);
    return { success: true, status: response.status, data: response.data };
    
  } catch (error) {
    const status = error.response?.status || 'No Response';
    const message = error.response?.statusText || error.message;
    
    if (status === 403) {
      logError(`${endpoint.description} - Status: ${status} (CORS/Authentication Issue)`);
    } else if (status === 404) {
      logError(`${endpoint.description} - Status: ${status} (Endpoint Not Found)`);
    } else if (status === 500) {
      logError(`${endpoint.description} - Status: ${status} (Server Error)`);
    } else {
      logError(`${endpoint.description} - Status: ${status} - ${message}`);
    }
    
    return { success: false, status, error: message };
  }
}

async function runTests() {
  log('\n' + '='.repeat(60));
  log('API CONNECTIVITY TEST', colors.cyan);
  log('='.repeat(60));
  logInfo(`Testing API Base URL: ${API_BASE}`);
  log(''.repeat(60));

  const results = [];
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    results.push({ ...endpoint, ...result });
    
    // Add delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  log(''.repeat(60));
  log('TEST SUMMARY', colors.cyan);
  log('='.repeat(60));
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  logSuccess(`Successful: ${successful}/${results.length}`);
  if (failed > 0) {
    logError(`Failed: ${failed}/${results.length}`);
  }

  // Detailed results
  log(''.repeat(60));
  log('DETAILED RESULTS', colors.cyan);
  log(''.repeat(60));
  
  results.forEach(result => {
    if (result.success) {
      logSuccess(`${result.method} ${result.path} - ${result.description}`);
    } else {
      logError(`${result.method} ${result.path} - ${result.description}`);
      logWarning(`  Error: ${result.error}`);
    }
  });

  // Troubleshooting tips
  if (failed > 0) {
    log(''.repeat(60));
    log('TROUBLESHOOTING TIPS', colors.yellow);
    log(''.repeat(60));
    
    const corsErrors = results.filter(r => r.status === 403);
    const notFoundErrors = results.filter(r => r.status === 404);
    const serverErrors = results.filter(r => r.status === 500);
    
    if (corsErrors.length > 0) {
      logWarning('CORS Issues Detected:');
      log('  1. Check CORS_ALLOWED_ORIGINS in Django settings.py');
      log('  2. Ensure your Vercel URLs are added to CORS configuration');
      log('  3. Verify environment variables are set on Vercel');
      log('');
    }
    
    if (notFoundErrors.length > 0) {
      logWarning('404 Errors Detected:');
      log('  1. Check if API endpoints exist in Django urls.py');
      log('  2. Verify the URL patterns are correct');
      log('  3. Check if the backend is deployed and running');
      log('');
    }
    
    if (serverErrors.length > 0) {
      logWarning('Server Errors Detected:');
      log('  1. Check Django logs on Render');
      log('  2. Verify database connection');
      log('  3. Check for any syntax errors in views');
      log('');
    }
  }

  log(''.repeat(60));
  log('TEST COMPLETED', colors.cyan);
  log('='.repeat(60));
}

// Check if axios is available, if not, provide instructions
try {
  require('axios');
  runTests().catch(error => {
    logError(`Test failed: ${error.message}`);
    process.exit(1);
  });
} catch (error) {
  logError('Axios is not installed. Please install it with:');
  log('npm install axios');
  log('');
  log('Or run the test with curl commands:');
  log('');
  endpoints.forEach(endpoint => {
    const curlCommand = endpoint.data 
      ? `curl -X ${endpoint.method} "${API_BASE}${endpoint.path}" -H "Content-Type: application/json" -d '${JSON.stringify(endpoint.data)}'`
      : `curl -X ${endpoint.method} "${API_BASE}${endpoint.path}"`;
    log(curlCommand);
  });
}
