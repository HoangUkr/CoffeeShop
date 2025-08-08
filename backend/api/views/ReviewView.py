from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny

from api.serializers import ReviewSerializer
from api.models import Review, Product
from api.permissions import IsAdminUserRole

from django.shortcuts import get_object_or_404

# View List of Review
class ReviewListView(APIView):
    # permission_classes = [AllowAny]
    
    def get(self, request):
        # Get all reviews
        reviews = Review.objects.all()
        
        # Get the id from request query params
        product_id = request.query_params.get('product_id', None)
        if product_id:
            reviews = reviews.filter(product_id=product_id)
            
        reviews = reviews.order_by('-created_at')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

# View Create of Review
class ReviewCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    # permission_classes = [AllowAny]
    def post(self, request, product_id):
        product = get_object_or_404(Product, pk=product_id)
        data = request.data.copy()
        data['product'] = product.id
        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View to delete Review
class ReviewDeleteView(APIView):
    # permission_classes = [IsAuthenticated, IsAdminUserRole]
    def delete(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        review.delete()
        return Response({'detail': 'Successfully deleted.'}, status=status.HTTP_204_NO_CONTENT)
            
