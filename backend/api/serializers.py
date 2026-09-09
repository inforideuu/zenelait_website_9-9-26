from rest_framework import serializers
from .models import DemoRequest, JobApplication, PageSectionContent, Testimonial, OpenPosition

class DemoRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemoRequest
        fields = '__all__'

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'

class PageSectionContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageSectionContent
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class OpenPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenPosition
        fields = '__all__'
