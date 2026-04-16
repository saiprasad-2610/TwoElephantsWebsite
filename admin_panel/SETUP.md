# Two Elephants Admin Panel - Setup Guide

## Project Structure

```
TwoElephantsWebsite/
├── admin_panel/
│   ├── backend/           # Django Backend (API)
│   │   ├── api/           # Django app with models, views, serializers
│   │   ├── media/         # Uploaded files (resumes)
│   │   ├── manage.py
│   │   ├── settings.py
│   │   └── requirements.txt
│   └── src/               # React Admin Panel Frontend
│       ├── pages/         # Admin pages
│       ├── components/    # Layout and components
│       └── context/       # Auth context
└── src/                   # Website Frontend (updated)
```

## Backend Setup (Django + MySQL)

### 1. Database Setup
Create a MySQL database named `twoelephants_db`:

```sql
CREATE DATABASE twoelephants_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Install Dependencies
```bash
cd admin_panel/backend
pip install -r requirements.txt
```

### 3. Run Migrations
```bash
python manage.py makemigrations api
python manage.py migrate
```

### 4. Create Admin User
```bash
python manage.py createsuperuser
```

### 5. Run Backend Server
```bash
python manage.py runserver 8000
```

## Admin Panel Frontend Setup

### 1. Install Dependencies
```bash
cd admin_panel
npm install
```

### 2. Run Admin Panel
```bash
npm run dev
```

Admin panel will run at: `http://localhost:3000/admin`

## Website Frontend Connection

The website frontend connects to the backend at `https://twoelephantswebsitebackend.onrender.com`.

To configure the API URL, add to your `.env` file:
```
VITE_API_BASE_URL=https://twoelephantswebsitebackend.onrender.com
```

## Admin Panel Features

### Dashboard
- Overview of all data (contacts, jobs, applications, articles)
- Recent activity feed

### Contact Inquiries
- View all contact form submissions
- Mark as read/unread
- Delete inquiries

### Job Roles
- Add, edit, delete job openings
- Set department, location, description, requirements
- Activate/deactivate roles

### Job Applications
- View all applications with resume downloads
- Filter by job role and status
- Update application status (New, Under Review, Shortlisted, etc.)

### Articles
- Create, edit, delete articles
- Set category, author, read time, featured image
- Publish/unpublish articles

## Default Admin Credentials
- Email: admin@twoelephants.com
- Password: admin123

## API Endpoints

### Public Endpoints (Website uses these)
- `POST /api/public/contact/` - Submit contact form
- `GET /api/public/roles/` - Get active job roles
- `POST /api/public/apply/` - Submit job application
- `GET /api/public/articles/` - Get published articles
- `GET /api/public/articles/<slug>/` - Get article by slug

### Admin Endpoints
- `/api/contacts/` - Contact CRUD
- `/api/jobs/` - Job roles CRUD
- `/api/applications/` - Applications CRUD
- `/api/articles/` - Articles CRUD
