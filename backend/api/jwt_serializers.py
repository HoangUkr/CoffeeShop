"""
Custom JWT serializers for enhanced authentication
"""
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
import logging

logger = logging.getLogger(__name__)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT token serializer that includes additional user information
    and enhanced security logging
    """
    
    def validate(self, attrs):
        # Get user credentials
        email = attrs.get('email')
        password = attrs.get('password')
        
        # Log authentication attempt (without password)
        logger.info(f"Authentication attempt for email: {email}")
        
        # Perform authentication
        data = super().validate(attrs)
        
        # Add custom user data to the token response
        user = self.user
        data.update({
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': getattr(user, 'role', 'customer'),  # Assuming you have a role field
                'is_staff': user.is_staff,
                'is_active': user.is_active,
                'date_joined': user.date_joined.isoformat(),
                'last_login': user.last_login.isoformat() if user.last_login else None,
            },
            'token_type': 'Bearer',
            'expires_in': 900,  # 15 minutes in seconds
        })
        
        # Update last login
        update_last_login(None, user)
        
        # Log successful authentication
        logger.info(f"Successful authentication for user ID: {user.id}, email: {user.email}")
        
        return data

    @classmethod
    def get_token(cls, user):
        """
        Override to add custom claims to the JWT token
        """
        token = super().get_token(user)
        
        # Add custom claims
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['role'] = getattr(user, 'role', 'customer')
        token['is_staff'] = user.is_staff
        
        return token


class CustomTokenRefreshSerializer(serializers.Serializer):
    """
    Custom refresh token serializer with enhanced security
    """
    refresh = serializers.CharField()
    
    def validate(self, attrs):
        refresh = RefreshToken(attrs['refresh'])
        
        # Log token refresh
        user_id = refresh.payload.get('user_id')
        logger.info(f"Token refresh for user ID: {user_id}")
        
        data = {
            'access': str(refresh.access_token),
            'expires_in': 900,  # 15 minutes in seconds
        }
        
        # If rotation is enabled, provide new refresh token
        if hasattr(refresh, 'rotate'):
            refresh.rotate()
            data['refresh'] = str(refresh)
        
        return data


class LogoutSerializer(serializers.Serializer):
    """
    Logout serializer for token blacklisting
    """
    refresh = serializers.CharField()
    
    def validate(self, attrs):
        try:
            refresh_token = RefreshToken(attrs['refresh'])
            user_id = refresh_token.payload.get('user_id')
            
            # Log logout attempt
            logger.info(f"Logout attempt for user ID: {user_id}")
            
            # Blacklist the token
            refresh_token.blacklist()
            
            logger.info(f"Successful logout for user ID: {user_id}")
            
        except Exception as e:
            logger.error(f"Logout error: {str(e)}")
            raise serializers.ValidationError("Invalid token")
        
        return attrs
