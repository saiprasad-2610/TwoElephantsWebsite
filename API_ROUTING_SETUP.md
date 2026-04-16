# API Routing Setup & Troubleshooting Guide

## Overview
This document explains the API routing configuration for your Two Elephants project and provides troubleshooting steps for 403 errors.

## Architecture
- **Backend**: Django on Render (https://twoelephantswebsitebackend.onrender.com)
- **Frontend**: React.js on Vercel 
- **Admin Panel**: React.js on Vercel
- **Database**: MySQL on Railway

## API Endpoints Structure

### Backend Django URLs
```
/admin/                    # Django admin
/api/                     # API routes
  /public/               # Public endpoints (no auth)
    /contact/           # POST - Contact form submissions
    /roles/             # GET - Active job roles
    /apply/             # POST - Job applications
    /articles/          # GET - All articles
    /articles/:slug/    # GET - Article by slug
  /contacts/            # GET, PATCH, DELETE - Contact management (admin)
  /jobs/               # GET, POST, PUT, DELETE - Job roles (admin)
  /applications/       # GET, POST, PUT, DELETE - Applications (admin)
  /articles/           # GET, POST, PUT, DELETE - Articles (admin)
```

## Global API Configuration

### Frontend Configuration (`src/config/api.js`)
- Automatically detects development vs production
- Uses environment variable `VITE_API_BASE_URL` or defaults
- Provides helper functions for building URLs

### Admin Panel Configuration (`admin_panel/src/config/api.js`)
- Similar structure to frontend
- Includes both admin and public endpoints
- Environment-aware URL resolution

## Environment Variables

### Frontend (.env)
```bash
VITE_API_BASE_URL=https://twoelephantswebsitebackend.onrender.com
VITE_CONTACT_RECEIVER_EMAIL=support@twoelephants.tech
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Admin Panel (.env)
```bash
VITE_API_BASE_URL=https://twoelephantswebsitebackend.onrender.com
VITE_ADMIN_APP_NAME=Two Elephants Admin Panel
VITE_ADMIN_VERSION=1.0.0
```

## CORS Configuration

The Django backend is configured to allow requests from:
- Your Vercel frontend URLs
- Your Vercel admin panel URLs  
- Local development servers (localhost:3000, localhost:5173)

## Troubleshooting 403 Errors

### 1. Check CORS Configuration
Ensure your Vercel URLs are added to `CORS_ALLOWED_ORIGINS` in `backend/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend.vercel.app",
    "https://your-admin-panel.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
]
```

### 2. Verify API Base URL
Check that `VITE_API_BASE_URL` is set correctly in your environment variables.

### 3. Check Backend Deployment
- Ensure Django backend is running on Render
- Verify the backend URL is accessible
- Check Render logs for any errors

### 4. Test API Endpoints Directly
Test the backend API directly:
```bash
curl https://twoelephantswebsitebackend.onrender.com/api/public/roles/
```

### 5. Check Network Requests
Open browser dev tools and check:
- Network tab for failed requests
- Console for any CORS errors
- Request headers and URLs

### 6. Verify Environment Variables
Ensure environment variables are properly set on Vercel:
- Go to Vercel dashboard
- Project settings > Environment Variables
- Add the required variables

## Common Issues & Solutions

### Issue: CORS Policy Error
**Solution**: Add your Vercel URL to `CORS_ALLOWED_ORIGINS` in Django settings.

### Issue: 403 Forbidden on API Calls
**Solution**: 
1. Check if the API endpoint exists in Django URLs
2. Verify the HTTP method matches the view
3. Ensure proper authentication for admin endpoints

### Issue: Network Error / Connection Refused
**Solution**:
1. Check if backend is deployed and running
2. Verify the API base URL is correct
3. Check if there are any firewall restrictions

### Issue: Environment Variables Not Working
**Solution**:
1. Ensure variables start with `VITE_` for Vite projects
2. Restart the development server after adding variables
3. Check Vercel deployment logs for variable injection

## Development Setup

### Local Development
1. Start Django backend: `python manage.py runserver`
2. Set `VITE_API_BASE_URL=http://localhost:8000`
3. Start frontend: `npm run dev`

### Production Deployment
1. Deploy backend to Render
2. Update `VITE_API_BASE_URL` to Render URL
3. Deploy frontend and admin panel to Vercel
4. Update CORS settings with Vercel URLs

## API Testing

Use these commands to test your API:

```bash
# Test public endpoints
curl -X GET https://your-backend.onrender.com/api/public/roles/
curl -X POST https://your-backend.onrender.com/api/public/contact/ \
  -H "Content-Type: application/json" \
  -d '{"fname":"Test","lname":"User","email":"test@example.com","message":"Test message"}'

# Test admin endpoints (requires authentication)
curl -X GET https://your-backend.onrender.com/api/contacts/
```

## Monitoring

### Backend Health Checks
- Monitor Render dashboard for deployment status
- Check application logs for errors
- Set up health check endpoints

### Frontend Monitoring
- Use Vercel Analytics for performance monitoring
- Check browser console for JavaScript errors
- Monitor network requests in dev tools

## Next Steps

1. Update your actual Vercel URLs in the CORS configuration
2. Set up environment variables in Vercel dashboard
3. Test all API endpoints after deployment
4. Set up monitoring and alerting

## Support

If you continue experiencing 403 errors:
1. Check the Django logs on Render
2. Verify the exact API URLs being called
3. Test with curl to isolate the issue
4. Check if there are any middleware blocking requests
