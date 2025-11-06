from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication
from django.utils import timezone
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from api.models import Cart, CartItem, Product
from api.serializers import CartSerializer, CartItemSerializer

class CsrfExemptSessionAuthentication(SessionAuthentication):
    """Session authentication without CSRF validation."""
    def enforce_csrf(self, request):
        return  # Skip CSRF validation

def get_or_create_cart(request):
    """Retrieve or create a cart for the current session."""
    session_key = request.session.session_key
    if not session_key:
        request.session.create()
        session_key = request.session.session_key

    cart, created = Cart.objects.get_or_create(session_key=session_key)
    return cart

class CartItemAddView(APIView):
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [AllowAny]  # Allow anyone to add to cart
    
    def post(self, request):
        # Debug information
        print(f"🛒 Cart item add request data: {request.data}")
        print(f"🛒 Session key: {request.session.session_key}")
        print(f"🛒 User: {request.user}")
        
        cart = get_or_create_cart(request)
        print(f"🛒 Cart: {cart}")
        
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            print(f"🛒 Validated data: {serializer.validated_data}")
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
            
            cart.updated_at = timezone.now()
            cart.save(update_fields=['updated_at'])

            return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)
        else:
            print(f"❌ Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CartItemUpdateView(APIView):
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [AllowAny]  # Allow anyone to update cart
    
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
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [AllowAny]  # Allow anyone to delete from cart
    
    def delete(self, request, pk):
        cart = get_or_create_cart(request)
        deleted, _ = cart.items.filter(pk=pk).delete()
        if deleted:
            cart.updated_at = timezone.now()
            cart.save(update_fields=['updated_at'])
            return Response(CartSerializer(cart).data)
        return Response({'detail': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)