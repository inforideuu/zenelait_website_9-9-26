from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DemoRequestViewSet, 
    JobApplicationViewSet, 
    PageSectionContentViewSet, 
    TestimonialViewSet, 
    OpenPositionViewSet
)

router = DefaultRouter()
router.register(r'demo-requests', DemoRequestViewSet, basename='demorequest')
router.register(r'job-applications', JobApplicationViewSet, basename='jobapplication')
router.register(r'page-sections', PageSectionContentViewSet, basename='pagesectioncontent')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'open-positions', OpenPositionViewSet, basename='openposition')

urlpatterns = [
    path('', include(router.urls)),
]
