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
    # permission_classes = [AllowAny]
    def get(self, request):
        # Get all products
        products = Product.objects.all()
        
        # Get the id from request query params
        id = request.query_params.get('id', None)
        if id:
            products = products.filter(id=id)
            
        # Get the category from request query params
        category_id = request.query_params.get('category', None)
        if category_id:
            products = products.filter(category_id=category_id)

        # Get the product from request query params
        name = request.query_params.get('product_name', None)
        if name:
            products = products.filter(name__icontains=name)

        # Get the product max price from request query params
        max_price = request.query_params.get('max_price', None)
        if max_price:
            try:
                max_price = float(max_price)
                products = products.filter(product_price__lte=max_price)
            except (ValueError, TypeError):
                pass
        min_price = request.query_params.get('min_price', None)
        if min_price:
            try:
                min_price = float(min_price)
                products = products.filter(product_price__gte=min_price)
            except (ValueError, TypeError):
                pass
            
        # Order by id
        products = products.order_by('id')
        
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
    # permission_classes = [IsAuthenticated]

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
    # permission_classes = [IsAuthenticated, IsAdminUserRole]
    def delete(self, request, pk):
        products = get_object_or_404(Product, pk=pk)
        products.delete()
        return Response({'detail': 'Successfully deleted.'}, status=status.HTTP_204_NO_CONTENT)

# Get category by product id
class ProductCategoryView(APIView):
    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        if product.category_id:
            category = get_object_or_404(Category, pk=product.category_id)
            return Response({
                'id': category.id,
                'name': category.category_name
            }, status=status.HTTP_200_OK)
        return Response({'detail': 'Category not found.'}, status=status.HTTP_404_NOT_FOUND)