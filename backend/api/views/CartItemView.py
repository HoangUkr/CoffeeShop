from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from django.conf import settings

from api.models import Cart, CartItem, Product
from api.serializers import CartSerializer, CartItemSerializer

def get_or_create_cart(request):
    """Retrieve or create a cart for the current session."""
    session_key = request.session.session_key
    if not session_key:
        request.session.create()
        session_key = request.session.session_key

    cart, created = Cart.objects.get_or_create(session_key=session_key)
    return cart

class CartItemAddView(APIView):
    def post(self, request):
        cart = get_or_create_cart(request)
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.validated_data['product']
            quantity = serializer.validated_data['quantity']

            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product,
                defaults={'quantity': quantity}
            )
            if not created:
                cart_item.quantity += quantity
            cart_item.save()
            
            cart_item.update_at = timezone.now()
            cart.save(update_fields=['updated_at'])

            return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CartItemUpdateView(APIView):
    def put(self, request, pk):
        cart = get_or_create_cart(request)
        try:
            cart_item = cart.items.get(pk=pk)
        except CartItem.DoesNotExist:
            return Response({'detail': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CartItemSerializer(cart_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            cart.updated_at = timezone.now()
            cart.save(update_fields=['updated_at'])
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CartItemDeleteView(APIView):
    def delete(self, request, pk):
        cart = get_or_create_cart(request)
        deleted, _ = cart.items.filter(pk=pk).delete()
        if deleted:
            cart.updated_at = timezone.now()
            cart.save(update_fields=['updated_at'])
            return Response(CartSerializer(cart).data)
        return Response({'detail': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)