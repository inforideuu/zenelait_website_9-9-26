from django.db import models

class DemoRequest(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    service = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, default="Pending")
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service}"

class JobApplication(models.Model):
    job_title = models.CharField(max_length=255)
    applicant_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    experience = models.CharField(max_length=100)
    portfolio_link = models.TextField(blank=True, null=True)
    resume_note = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50, default="Submitted")
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.applicant_name} ({self.job_title})"

class PageSectionContent(models.Model):
    SECTION_CHOICES = [
        ('home_intro', 'Home Company Introduction'),
        ('home_stats', 'Home Statistics'),
        ('home_calculator', 'Home Calculator & Estimator'),
        ('home_knowledge_hub', 'Home Knowledge Hub & Guides'),
        ('home_faqs', 'Frequently Asked Questions (FAQ)'),
        ('about_who_we_are', 'About Who We Are'),
        ('about_mission', 'About Mission'),
        ('about_vision', 'About Vision'),
        ('about_values', 'About Product Values'),
    ]
    section_key = models.CharField(max_length=100, choices=SECTION_CHOICES, unique=True)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=500, blank=True, null=True)
    body = models.TextField()
    extra_json = models.JSONField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.get_section_key_display()

class Testimonial(models.Model):
    PAGE_CHOICES = [
        ('home', 'Home Page'),
        ('it_products', 'IT Product Page'),
    ]
    page = models.CharField(max_length=50, choices=PAGE_CHOICES, default='home')
    author = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField()
    rating = models.IntegerField(default=5)
    avatar_url = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author} ({self.page})"

class OpenPosition(models.Model):
    title = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    location = models.CharField(max_length=255, default="Chennai, Tamil Nadu")
    type = models.CharField(max_length=100, default="Full-time")
    experience = models.CharField(max_length=100)
    description = models.TextField()
    requirements = models.JSONField(default=list)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
