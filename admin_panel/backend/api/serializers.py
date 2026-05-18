import re

from rest_framework import serializers
from .models import ContactSubmission, JobRole, JobApplication, Article

MALICIOUS_CONTENT_MESSAGE = 'Message cannot include HTML, scripts, or executable content.'
CONTROL_CHARACTER_PATTERN = re.compile(r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]')
DANGEROUS_MESSAGE_PATTERN = re.compile(
    r'(?:<\s*/?\s*[a-z][^>]*>|&lt;\s*/?\s*[a-z][\s\S]*?&gt;|javascript\s*:|data\s*:\s*text/html|on[a-z]+\s*=)',
    re.IGNORECASE,
)

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = '__all__'

    def validate_message(self, value):
        sanitized_value = CONTROL_CHARACTER_PATTERN.sub('', value).strip()

        if DANGEROUS_MESSAGE_PATTERN.search(sanitized_value):
            raise serializers.ValidationError(MALICIOUS_CONTENT_MESSAGE)

        return sanitized_value

class JobRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRole
        fields = '__all__'

class JobRolePublicSerializer(serializers.ModelSerializer):
    link = serializers.SerializerMethodField()

    class Meta:
        model = JobRole
        fields = ['id', 'title', 'department', 'location', 'description', 'points', 'link']

    def get_link(self, obj):
        return f"mailto:support@twoelephants.org?subject=Application - {obj.title}"

class JobApplicationSerializer(serializers.ModelSerializer):
    role_title = serializers.CharField(source='role.title', read_only=True)
    resume_url = serializers.SerializerMethodField()

    class Meta:
        model = JobApplication
        fields = '__all__'

    def get_resume_url(self, obj):
        if obj.resume:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.resume.url)
            return obj.resume.url
        return None

class ArticleSerializer(serializers.ModelSerializer):
    img_url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = '__all__'

    # def get_img_url(self, obj):
    #     if obj.img:
    #         request = self.context.get('request')
    #         if request:
    #             return request.build_absolute_uri(obj.img.url)
    #         return obj.img.url
    #     return None
    def get_img_url(self, obj):
        if obj.img:
            return obj.img.url
        return None
    
class ArticlePublicSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'cat', 'img', 'read_time', 'author', 'date', 'excerpt', 'content']

    # def get_img(self, obj):
    #     if obj.img:
    #         request = self.context.get('request')
    #         if request:
    #             return request.build_absolute_uri(obj.img.url)
    #         return obj.img.url
    #     return None
    def get_img(self, obj):
        if obj.img:
            return obj.img.url   # <-- IMPORTANT
        return None
