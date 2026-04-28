from django.db import models
from django.utils import timezone

class ContactSubmission(models.Model):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    email = models.EmailField()
    location = models.CharField(max_length=200, blank=True)
    interest = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-submitted_at']
        verbose_name = 'Contact Submission'
        verbose_name_plural = 'Contact Submissions'

    def __str__(self):
        return f"{self.fname} {self.lname} - {self.email}"


class JobRole(models.Model):
    DEPARTMENT_CHOICES = [
        ('Engineering', 'Engineering'),
        ('AI & Research', 'AI & Research'),
        ('Design', 'Design'),
        ('Marketing', 'Marketing'),
        ('Sales', 'Sales'),
        ('HR', 'HR'),
        ('Other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    department = models.CharField(max_length=100, choices=DEPARTMENT_CHOICES)
    location = models.CharField(max_length=200)
    description = models.TextField()
    points = models.JSONField(default=list)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Job Role'
        verbose_name_plural = 'Job Roles'

    def __str__(self):
        return self.title


class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('reviewing', 'Under Review'),
        ('shortlisted', 'Shortlisted'),
        ('rejected', 'Rejected'),
        ('accepted', 'Accepted'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=200)
    linkedin = models.URLField(blank=True)
    portfolio = models.URLField(blank=True)
    github = models.URLField(blank=True)
    current_company = models.CharField(max_length=200, blank=True)
    current_designation = models.CharField(max_length=200, blank=True)
    years_experience = models.CharField(max_length=50)
    notice_period = models.CharField(max_length=100)
    expected_ctc = models.CharField(max_length=100)
    current_ctc = models.CharField(max_length=100)
    resume = models.FileField(upload_to='resumes/')
    cover_letter = models.TextField(blank=True)
    role = models.ForeignKey(JobRole, on_delete=models.SET_NULL, null=True, related_name='applications')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    applied_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-applied_at']
        verbose_name = 'Job Application'
        verbose_name_plural = 'Job Applications'

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.role.title if self.role else 'N/A'}"


class Article(models.Model):
    CATEGORY_CHOICES = [
        ('BFSI', 'BFSI'),
        ('OIL & GAS', 'Oil & Gas'),
        ('SOLAPUR', 'Solapur'),
        ('Technology', 'Technology'),
        ('Innovation', 'Innovation'),
        ('Other', 'Other'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    cat = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    img = models.ImageField(upload_to='articles/', blank=True, null=True)
    read_time = models.CharField(max_length=20)
    author = models.CharField(max_length=100)
    date = models.DateField()
    excerpt = models.TextField()
    content = models.JSONField(default=list)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Article'
        verbose_name_plural = 'Articles'

    def __str__(self):
        return self.title
