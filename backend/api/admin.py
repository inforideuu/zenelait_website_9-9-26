from django.contrib import admin
from .models import DemoRequest, JobApplication, PageSectionContent, Testimonial, OpenPosition

@admin.register(DemoRequest)
class DemoRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'service', 'status', 'is_read', 'created_at')
    list_filter = ('status', 'is_read', 'created_at')
    search_fields = ('name', 'email', 'phone', 'service')

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('applicant_name', 'job_title', 'email', 'phone', 'status', 'submitted_at')
    list_filter = ('job_title', 'status', 'submitted_at')
    search_fields = ('applicant_name', 'email', 'phone', 'job_title')

@admin.register(PageSectionContent)
class PageSectionContentAdmin(admin.ModelAdmin):
    list_display = ('section_key', 'title', 'updated_at')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author', 'role', 'company', 'page', 'rating', 'created_at')
    list_filter = ('page', 'rating')

@admin.register(OpenPosition)
class OpenPositionAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'location', 'type', 'is_active', 'created_at')
    list_filter = ('department', 'type', 'is_active')
