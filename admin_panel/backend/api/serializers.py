from rest_framework import serializers
from .models import ContactSubmission, JobRole, JobApplication, Article

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = '__all__'

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

    def get_img_url(self, obj):
        if obj.img:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.img.url)
            return obj.img.url
        return None

class ArticlePublicSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'cat', 'img', 'read_time', 'author', 'date', 'excerpt', 'content']

    def get_img(self, obj):
        if obj.img:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.img.url)
            return obj.img.url
        return None
