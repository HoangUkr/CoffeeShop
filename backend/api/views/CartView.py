from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from django.conf import settings

from .models import Cart, CartItem, Product
from .serializers import CartSerializer, CartItemSerializer

def get_or_create_cart(request):
    sessio

class CartView(APIView):
    def get(self, request):
        