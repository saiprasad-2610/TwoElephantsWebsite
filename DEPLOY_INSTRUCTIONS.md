# Deployment Instructions

## Quick Summary
Your API routing has been fixed! The backend is responding correctly (200 status). Here's how to deploy:

## Step 1: Update Your Vercel URLs in Django

Edit `backend/settings.py` and replace the placeholder URLs with your actual Vercel URLs:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-actual-frontend-url.vercel.app",      # Replace with your frontend URL
    "https://your-actual-admin-panel-url.vercel.app",   # Replace with your admin panel URL
    "http://localhost:3000",
    "http://localhost:5173",
]
```

## Step 2: Deploy Backend to Render

1. Push your backend changes to GitHub
2. Trigger a new deployment on Render
3. Verify the deployment is healthy

## Step 3: Set Environment Variables on Vercel

### Frontend Environment Variables
In your Vercel dashboard for the frontend:
```
VITE_API_BASE_URL=https://twoelephantswebsitebackend.onrender.com
VITE_CONTACT_RECEIVER_EMAIL=support@twoelephants.tech
```

### Admin Panel Environment Variables  
In your Vercel dashboard for the admin panel:
```
VITE_API_BASE_URL=https://twoelephantswebsitebackend.onrender.com
```

## Step 4: Deploy Frontend and Admin Panel to Vercel

1. Push your frontend changes to GitHub
2. Trigger new deployments on Vercel
3. Wait for deployments to complete

## Step 5: Test Everything

### Test API Endpoints
```bash
# Test public endpoints
curl "https://twoelephantswebsitebackend.onrender.com/api/public/roles/"
curl "https://twoelephantswebsitebackend.onrender.com/api/public/articles/"

# Test contact form
curl -X POST "https://twoelephantswebsitebackend.onrender.com/api/public/contact/" \
  -H "Content-Type: application/json" \
  -d '{"fname":"Test","lname":"User","email":"test@example.com","location":"Test","interest":"General","message":"Test message"}'
```

### Test Frontend Features
- [ ] Website loads without errors
- [ ] Contact form submission works
- [ ] Job listings display correctly
- [ ] Articles load properly
- [ ] No 403 errors in browser console

### Test Admin Panel
- [ ] Admin panel loads
- [ ] Dashboard shows data
- [ ] Contact management works
- [ ] Job posting works
- [ ] Article management works

## What Was Fixed

### 1. Global API Configuration
- Created centralized API configuration files
- All components now use `buildApiUrl()` helper function
- Environment-aware URL resolution

### 2. Updated Components
**Frontend**: Contact.jsx, Careers.jsx, Home.jsx, ArticleDetail.jsx, Insights.jsx
**Admin Panel**: Contacts.jsx, Applications.jsx, Articles.jsx, Dashboard.jsx, Jobs.jsx

### 3. CORS Configuration
- Updated Django settings for your Vercel domains
- Added development environment support
- Configured proper credentials handling

### 4. Environment Setup
- Updated `.env.example` files
- Created deployment verification scripts
- Added comprehensive documentation

## Troubleshooting

### If You Still Get 403 Errors:
1. **Check CORS Settings**: Ensure your exact Vercel URLs are in Django `CORS_ALLOWED_ORIGINS`
2. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R) to clear cached responses
3. **Check Environment Variables**: Verify `VITE_API_BASE_URL` is set correctly on Vercel
4. **Wait for Propagation**: DNS and environment changes may take a few minutes

### If API Calls Time Out:
1. **Check Backend Status**: Verify your Render deployment is healthy
2. **Check Render Logs**: Look for any errors in the Render dashboard
3. **Test Directly**: Try calling the API directly with curl

### If Contact Form Doesn't Work:
1. **Check EmailJS**: If using EmailJS, verify your credentials
2. **Check Backend**: Verify the contact endpoint is accessible
3. **Check Network**: Look at browser network tab for failed requests

## Final Verification

Once deployed, run this test in your browser console:

```javascript
// Test API connectivity from frontend
fetch('https://twoelephantswebsitebackend.onrender.com/api/public/roles/')
  .then(response => response.json())
  .then(data => console.log('API working:', data))
  .catch(error => console.error('API error:', error));
```

## Support

If you encounter issues:
1. Check the browser console for JavaScript errors
2. Look at the network tab for failed requests
3. Check Render logs for backend errors
4. Verify Vercel build logs for frontend errors

Your project is now configured with proper API routing and should work without 403 errors!
