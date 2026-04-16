#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Tests the complete API setup and configuration
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

// Configuration
const PROJECT_ROOT = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([a-zA-Z]):/, '$1:');
const API_BASE = process.env.API_BASE_URL || 'https://twoelephantswebsitebackend.onrender.com';

// Test configuration files
const configFiles = [
  'src/config/api.js',
  'admin_panel/src/config/api.js',
  '.env.example',
  'admin_panel/.env.example'
];

// React components that should use global API config
const frontendComponents = [
  'src/pages/Contact.jsx',
  'src/pages/Careers.jsx', 
  'src/pages/Home.jsx',
  'src/pages/ArticleDetail.jsx',
  'src/pages/Insights.jsx'
];

const adminComponents = [
  'admin_panel/src/pages/Contacts.jsx',
  'admin_panel/src/pages/Applications.jsx',
  'admin_panel/src/pages/Articles.jsx',
  'admin_panel/src/pages/Dashboard.jsx',
  'admin_panel/src/pages/Jobs.jsx'
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

// Check if file exists and contains expected content
function checkFile(filePath, expectedContent) {
  try {
    const fullPath = path.join(PROJECT_ROOT, filePath);
    if (!fs.existsSync(fullPath)) {
      logError(`${filePath} - File not found`);
      return false;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const hasExpectedContent = expectedContent.some(pattern => 
      content.includes(pattern)
    );

    if (hasExpectedContent) {
      logSuccess(`${filePath} - Contains expected content`);
      return true;
    } else {
      logError(`${filePath} - Missing expected content`);
      return false;
    }
  } catch (error) {
    logError(`${filePath} - Error reading file: ${error.message}`);
    return false;
  }
}

// Check if component uses global API config
function checkComponentUsesGlobalConfig(filePath) {
  try {
    const fullPath = path.join(PROJECT_ROOT, filePath);
    if (!fs.existsSync(fullPath)) {
      logError(`${filePath} - File not found`);
      return false;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Check for imports of global config
    const hasGlobalImport = content.includes('from \'../config/api\'') || 
                           content.includes('from \'../config/api.js\'') ||
                           content.includes('from \'../../config/api\'') ||
                           content.includes('from \'../../config/api.js\'');

    // Check for usage of buildApiUrl or API_CONFIG
    const hasGlobalUsage = content.includes('buildApiUrl(') || 
                          content.includes('API_CONFIG.');

    // Check for hardcoded URLs (should not exist)
    const hasHardcodedUrls = content.includes('https://twoelephantswebsitebackend.onrender.com') ||
                            content.includes('const API_BASE = import.meta.env.VITE_API_BASE_URL');

    if (hasGlobalImport && hasGlobalUsage && !hasHardcodedUrls) {
      logSuccess(`${filePath} - Uses global API configuration`);
      return true;
    } else {
      const issues = [];
      if (!hasGlobalImport) issues.push('Missing global import');
      if (!hasGlobalUsage) issues.push('Not using global API functions');
      if (hasHardcodedUrls) issues.push('Still has hardcoded URLs');
      
      logError(`${filePath} - ${issues.join(', ')}`);
      return false;
    }
  } catch (error) {
    logError(`${filePath} - Error reading file: ${error.message}`);
    return false;
  }
}

// Test API connectivity (simplified version)
async function testAPIConnectivity() {
  logInfo('Testing API connectivity...');
  
  const endpoints = [
    { path: '/api/public/roles/', method: 'GET' },
    { path: '/api/public/articles/', method: 'GET' }
  ];

  for (const endpoint of endpoints) {
    try {
      const url = `${API_BASE}${endpoint.path}`;
      logInfo(`Testing ${endpoint.method} ${url}`);
      
      // Simple HTTP request using Node.js built-in modules
      const client = url.startsWith('https') ? https : http;
      
      await new Promise((resolve, reject) => {
        const req = client.get(url, { timeout: 5000 }, (res) => {
          if (res.statusCode === 200) {
            logSuccess(`${endpoint.path} - Status: ${res.statusCode}`);
            resolve();
          } else {
            logError(`${endpoint.path} - Status: ${res.statusCode}`);
            reject(new Error(`HTTP ${res.statusCode}`));
          }
        });

        req.on('error', (error) => {
          logError(`${endpoint.path} - Connection error: ${error.message}`);
          reject(error);
        });

        req.on('timeout', () => {
          req.destroy();
          logError(`${endpoint.path} - Request timeout`);
          reject(new Error('Timeout'));
        });
      });
    } catch (error) {
      logError(`${endpoint.path} - Test failed: ${error.message}`);
    }
  }
}

// Main verification function
async function runVerification() {
  log('\n' + '='.repeat(70));
  log('DEPLOYMENT VERIFICATION', colors.cyan);
  log('='.repeat(70));
  logInfo(`Project Root: ${PROJECT_ROOT}`);
  logInfo(`API Base URL: ${API_BASE}`);
  log(''.repeat(70));

  let allChecksPassed = true;

  // Check configuration files
  log('CONFIGURATION FILES', colors.cyan);
  log(''.repeat(70));
  
  const configChecks = [
    {
      file: 'src/config/api.js',
      content: ['buildApiUrl', 'API_CONFIG', 'getApiBaseUrl']
    },
    {
      file: 'admin_panel/src/config/api.js', 
      content: ['buildApiUrl', 'API_CONFIG', 'getApiBaseUrl']
    },
    {
      file: '.env.example',
      content: ['VITE_API_BASE_URL', 'VITE_CONTACT_RECEIVER_EMAIL']
    },
    {
      file: 'admin_panel/.env.example',
      content: ['VITE_API_BASE_URL']
    }
  ];

  for (const check of configChecks) {
    if (!checkFile(check.file, check.content)) {
      allChecksPassed = false;
    }
  }

  // Check frontend components
  log('\nFRONTEND COMPONENTS', colors.cyan);
  log(''.repeat(70));
  
  for (const component of frontendComponents) {
    if (!checkComponentUsesGlobalConfig(component)) {
      allChecksPassed = false;
    }
  }

  // Check admin panel components
  log('\nADMIN PANEL COMPONENTS', colors.cyan);
  log(''.repeat(70));
  
  for (const component of adminComponents) {
    if (!checkComponentUsesGlobalConfig(component)) {
      allChecksPassed = false;
    }
  }

  // Test API connectivity
  log('\nAPI CONNECTIVITY', colors.cyan);
  log(''.repeat(70));
  
  try {
    await testAPIConnectivity();
  } catch (error) {
    logError(`API connectivity test failed: ${error.message}`);
    allChecksPassed = false;
  }

  // Summary
  log('\n' + '='.repeat(70));
  log('VERIFICATION SUMMARY', colors.cyan);
  log('='.repeat(70));
  
  if (allChecksPassed) {
    logSuccess('All checks passed! Your deployment is ready.');
    log('\nNext steps:');
    log('1. Deploy your code to Vercel and Render');
    log('2. Set environment variables in Vercel dashboard');
    log('3. Test the live applications');
  } else {
    logError('Some checks failed. Please fix the issues above before deploying.');
    log('\nCommon fixes:');
    log('1. Ensure all components import and use the global API config');
    log('2. Remove any hardcoded API URLs');
    log('3. Verify configuration files exist and have correct content');
    log('4. Check that your backend is running and accessible');
  }

  log(''.repeat(70));
  log('VERIFICATION COMPLETED', colors.cyan);
  log('='.repeat(70));
}

// Run the verification
runVerification().catch(error => {
  logError(`Verification failed: ${error.message}`);
  process.exit(1);
});
