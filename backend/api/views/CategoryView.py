from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny

from api.serializers import CategorySerializer
from api.models import Category
from api.permissions import IsAdminUserRole

from django.shortcuts import get_object_or_404

from django.core.cache import cache

# Create category view
class CategoryCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated, IsAdminUserRole]
    
    def post(self, request, *args, **kwargs):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            cache.delete('categories')  # Clear cache after creating a new category
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Update category view
class CategoryModifyView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated, IsAdminUserRole]
    
    def put(self, request, pk, *args, **kwargs):
        category = get_object_or_404(Category, pk=pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            cache.delete('categories')  # Clear cache after updating a category
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk, *args, **kwargs):
        category = get_object_or_404(Category, pk=pk)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            cache.delete('categories')  # Clear cache after partially updating a category
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete category view
class CategoryDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]
    def delete(self, request, pk, *args, **kwargs):
        category = get_object_or_404(Category, pk=pk)
        category.delete()
        cache.delete('categories')  # Clear cache after deleting a category
        return Response({'detail': 'Successfully deleted.'},status=status.HTTP_204_NO_CONTENT)
    
# List all categories
class CategoryListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
        categories = cache.get('categories')
        if not categories:
            queryset = Category.objects.all()
            serializer = CategorySerializer(queryset, many=True)
            categories = serializer.data
            cache.set('categories', categories, timeout=60*60) # Cache for 1 hour
        return Response(categories, status=status.HTTP_200_OK)