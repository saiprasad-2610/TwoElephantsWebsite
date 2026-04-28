from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
from .models import ContactSubmission, JobRole, JobApplication, Article
from .serializers import (
    ContactSubmissionSerializer,
    JobRoleSerializer,
    JobRolePublicSerializer,
    JobApplicationSerializer,
    ArticleSerializer,
    ArticlePublicSerializer
)

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact(request):
    serializer = ContactSubmissionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'message': 'Contact form submitted successfully'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_active_roles(request):
    roles = JobRole.objects.filter(is_active=True)
    serializer = JobRolePublicSerializer(roles, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_application(request):
    serializer = JobApplicationSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'message': 'Application submitted successfully'}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_articles(request):
    articles = Article.objects.filter(is_published=True)
    serializer = ArticlePublicSerializer(articles, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_article_by_slug(request, slug):
    try:
        article = Article.objects.get(slug=slug, is_published=True)
        serializer = ArticlePublicSerializer(article, context={'request': request})
        return Response(serializer.data)
    except Article.DoesNotExist:
        return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)

class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [AllowAny]

    def perform_update(self, serializer):
        serializer.save()

class JobRoleViewSet(viewsets.ModelViewSet):
    queryset = JobRole.objects.all()
    serializer_class = JobRoleSerializer
    permission_classes = [AllowAny]

class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    permission_classes = [AllowAny]

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]
