from django.contrib import admin
from .models import ContactSubmission, JobRole, JobApplication, Article

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('fname', 'lname', 'email', 'interest', 'submitted_at', 'is_read')
    list_filter = ('is_read', 'interest', 'submitted_at')
    search_fields = ('fname', 'lname', 'email', 'message')
    readonly_fields = ('submitted_at',)

@admin.register(JobRole)
class JobRoleAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'location', 'is_active', 'created_at')
    list_filter = ('department', 'is_active')
    search_fields = ('title', 'description')

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'role', 'status', 'applied_at')
    list_filter = ('status', 'role', 'applied_at')
    search_fields = ('first_name', 'last_name', 'email')
    readonly_fields = ('applied_at',)

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'cat', 'author', 'date', 'is_published')
    list_filter = ('cat', 'is_published', 'date')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
