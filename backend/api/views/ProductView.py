from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny

from api.serializers import ProductSerializer
from api.models import Product, Category, Images
from api.permissions import IsAdminUserRole

from django.shortcuts import get_object_or_404

# List of product by category or not
class ProductListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, category_id=None):
        if category_id:
            category = get_object_or_404(Category, pk=category_id)
            products = Product.objects.filter(category=category)
        else:
            products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

# Create product with category
class ProductCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    # permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            
            # Add image handling
            images = request.FILES.getlist('images')
            Images.objects.bulk_create([
                Images(product=product, image=image) for image in images
            ])
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Update product
class ProductModifyView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            product = serializer.save()
            
            # Replace image
            Images.objects.filter(product=product).delete()
            images = request.FILES.getlist('images')
            Images.objects.bulk_create([
                Images(product=product, image=image) for image in images
            ])
            return Response(ProductSerializer(product).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Delete product
class ProductDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]
    def delete(self, request, pk):
        products = get_object_or_404(Product, pk=pk)
        products.delete()
        return Response({'detail': 'Successfully deleted.'}, status=status.HTTP_204_NO_CONTENT)