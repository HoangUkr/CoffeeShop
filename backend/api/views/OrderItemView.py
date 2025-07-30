from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from api.serializers import OrderItemSerializer
from api.models import OrderItem, Order, Product

from django.shortcuts import get_object_or_404

# View create new items to order
class OrderItemCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, product_id, order_id):
        product = get_object_or_404(Product, pk=product_id)
        order = get_object_or_404(Order, pk=order_id)
        data = request.data.copy()
        data['product'] = product.id
        data['order'] = order.id
        serializer = OrderItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# View to update item in order
class OrderItemModifyView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def put(self, request, product_id, order_id):
        item = get_object_or_404(OrderItem, product_id=product_id, order_id=order_id)
        if item.product.id != product_id or item.order.id != order_id:
            return Response({'detail': 'Product does not belong to this order.'}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        data['product'] = product_id
        data['order'] = order_id
        serializer = OrderItemSerializer(item, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, product_id, order_id):
        item = get_object_or_404(OrderItem, product_id=product_id, order_id=order_id)
        if item.product.id != product_id or item.order.id != order_id:
            return Response({'detail': 'Product does not belong to this order.'}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        data['product'] = product_id
        data['order'] = order_id
        serializer = OrderItemSerializer(item, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# View delete item from order
class OrderItemDeleteView(APIView):
    def delete(self, request, pk):
        item = get_object_or_404(OrderItem, pk=pk)
        item.delete()     
        return Response({'detail': 'Successfully deleted.'}, status=status.HTTP_204_NO_CONTENT)
# View all item in order
class OrderItemListView(APIView):
    def get(self, request, order_id):
        items = OrderItem.objects.filter(order_id=order_id)
        serializer = OrderItemSerializer(items, many=True)
        return Response(serializer.data)    