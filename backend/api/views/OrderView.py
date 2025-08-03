from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny

from api.serializers import OrderSerializer
from api.models import Order
from api.permissions import IsAdminUserRole

from django.shortcuts import get_object_or_404

# View create Order
class OrderCreateView(APIView):
    # parser_classes = [MultiPartParser, FormParser]
    # permission_classes = [AllowAny]
    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View modify Order
class OrderModifyView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def put(self, request, pk, *args, **kwargs):
        order = get_object_or_404(Order, pk=pk)
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk, *args, **kwargs):
        order = get_object_or_404(Order, pk=pk)
        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View delete Order
class OrderDeleteView(APIView):
    def delete(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        order.delete()     
        return Response({'detail': 'Successfully deleted.'}, status=status.HTTP_204_NO_CONTENT)

# View get all order, get order by customer name and uuid
class OrderListView(APIView):
    def get(self, request, uuid=None, customer_name=None):
        if uuid and customer_name:
            orders = Order.objects.filter(order_uuid=uuid, customer_name__icontains=customer_name)
        elif uuid:
            orders = Order.objects.filter(order_uuid=uuid)
        elif customer_name:
            orders = Order.objects.filter(customer_name__icontains=customer_name)
        else:
            orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)    
        