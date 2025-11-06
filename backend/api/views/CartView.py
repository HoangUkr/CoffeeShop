from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication
from django.utils import timezone
from django.conf import settings

from api.models import Cart, CartItem, Product
from api.serializers import CartSerializer, CartItemSerializer

class CsrfExemptSessionAuthentication(SessionAuthentication):
    """Session authentication without CSRF validation."""
    def enforce_csrf(self, request):
        return  # Skip CSRF validation

def get_or_create_cart(request):
    session_key = request.session.session_key
    if not session_key:
        request.session.create()
        session_key = request.session.session_key
    cart, created = Cart.objects.get_or_create(session_key=session_key)
    return cart

class CartView(APIView):
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [AllowAny]  # Allow anyone to view cart
    
    def get(self, request):
        cart = get_or_create_cart(request)
        serializer = CartSerializer(cart)
        return Response(serializer.data)