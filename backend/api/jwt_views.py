"""
Custom JWT views with enhanced security and rate limiting
"""
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger(__name__)


class LoginRateThrottle(AnonRateThrottle):
    """
    Custom rate throttle for login attempts
    """
    scope = 'login'


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom login view with enhanced security and logging
    """
    throttle_classes = [LoginRateThrottle]
    
    def post(self, request, *args, **kwargs):
        """
        Enhanced login with security logging
        """
        # Log login attempt with IP address
        ip_address = self.get_client_ip(request)
        email = request.data.get('email', 'Unknown')
        
        logger.info(f"Login attempt from IP: {ip_address}, Email: {email}")
        
        # Process the login
        response = super().post(request, *args, **kwargs)
        
        # Log the result
        if response.status_code == 200:
            logger.info(f"Successful login from IP: {ip_address}, Email: {email}")
        else:
            logger.warning(f"Failed login attempt from IP: {ip_address}, Email: {email}")
        
        return response
    
    def get_client_ip(self, request):
        """
        Get the client IP address from request
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class CustomTokenRefreshView(TokenRefreshView):
    """
    Custom token refresh view with logging
    """
    
    def post(self, request, *args, **kwargs):
        """
        Enhanced token refresh with logging
        """
        ip_address = self.get_client_ip(request)
        logger.info(f"Token refresh attempt from IP: {ip_address}")
        
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            logger.info(f"Successful token refresh from IP: {ip_address}")
        else:
            logger.warning(f"Failed token refresh from IP: {ip_address}")
        
        return response
    
    def get_client_ip(self, request):
        """
        Get the client IP address from request
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
