from pathlib import Path
from decouple import config
import dj_database_url
import os

BASE_DIR = Path(__file__).resolve().parent.parent

# ✅ Secret key from environment variable
SECRET_KEY = config('SECRET_KEY', default='django-insecure-two-elephants-admin-panel-2024')

# ✅ Debug from environment variable
DEBUG = config('DEBUG', default=False, cast=bool)

# ✅ Allow localhost + all Render subdomains
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.onrender.com',
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',          # ✅ CORS - must be first
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',      # ✅ Whitenoise for static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'wsgi.application'

# ✅ Database - uses DATABASE_URL env var on Render, falls back to local MySQL
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL')
    )
}
# ✅ Add charset separately
DATABASES['default']['OPTIONS'] = {
    'charset': 'utf8mb4',
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# ✅ Static files - Whitenoise handles this on Render
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ✅ Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ✅ CORS - Allow your Vercel frontend and admin panel
CORS_ALLOWED_ORIGINS = [
    "https://two-elephants-website-df4xg5qa3-sais-projects-14551cbf.vercel.app",   # Main frontend
    "https://two-elephants-website-ejxd.vercel.app",                              # Frontend alternative
    "https://two-elephants-admin-panel.vercel.app",                               # Admin panel (update with actual URL)
    "https://two-elephants-admin-df4xg5qa3-sais-projects-14551cbf.vercel.app",    # Admin panel alternative
    "http://localhost:3000",                                                      # React dev server
    "http://localhost:5173",                                                       # Vite dev server
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

# For development, allow all origins (remove in production)
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
