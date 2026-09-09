from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import DemoRequest, JobApplication, PageSectionContent, Testimonial, OpenPosition
from .serializers import (
    DemoRequestSerializer, 
    JobApplicationSerializer, 
    PageSectionContentSerializer, 
    TestimonialSerializer, 
    OpenPositionSerializer
)

class DemoRequestViewSet(viewsets.ModelViewSet):
    queryset = DemoRequest.objects.all().order_by('-created_at')
    serializer_class = DemoRequestSerializer

    @action(detail=False, methods=['get'])
    def notifications(self, request):
        unread = DemoRequest.objects.filter(is_read=False).order_by('-created_at')
        serializer = self.get_serializer(unread, many=True)
        return Response({
            'count': unread.count(),
            'notifications': serializer.data
        })

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        instance = self.get_object()
        instance.is_read = True
        instance.save()
        return Response({'status': 'marked as read'})

class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all().order_by('-submitted_at')
    serializer_class = JobApplicationSerializer

class PageSectionContentViewSet(viewsets.ModelViewSet):
    queryset = PageSectionContent.objects.all()
    serializer_class = PageSectionContentSerializer
    lookup_field = 'section_key'

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all().order_by('-created_at')
    serializer_class = TestimonialSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        page = self.request.query_params.get('page')
        if page:
            queryset = queryset.filter(page=page)
        return queryset

class OpenPositionViewSet(viewsets.ModelViewSet):
    queryset = OpenPosition.objects.all().order_by('-created_at')
    serializer_class = OpenPositionSerializer
