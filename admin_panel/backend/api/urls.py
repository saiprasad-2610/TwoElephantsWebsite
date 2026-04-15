from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'contacts', views.ContactSubmissionViewSet)
router.register(r'jobs', views.JobRoleViewSet)
router.register(r'applications', views.JobApplicationViewSet)
router.register(r'articles', views.ArticleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('public/contact/', views.submit_contact, name='submit-contact'),
    path('public/roles/', views.get_active_roles, name='get-active-roles'),
    path('public/apply/', views.submit_application, name='submit-application'),
    path('public/articles/', views.get_articles, name='get-articles'),
    path('public/articles/<str:slug>/', views.get_article_by_slug, name='get-article-by-slug'),
]
