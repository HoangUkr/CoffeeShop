"""
JWT Authentication test utility
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger(__name__)
User = get_user_model()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def jwt_test_view(request):
    """
    Test endpoint to verify JWT authentication is working
    Returns authenticated user information
    """
    user = request.user
    
    # Log the test access
    logger.info(f"JWT test endpoint accessed by user: {user.email} (ID: {user.id})")
    
    # Return user information to verify JWT is working
    return Response({
        'message': 'JWT Authentication successful!',
        'user': {
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'role': getattr(user, 'role', 'customer'),
            'is_staff': user.is_staff,
            'is_active': user.is_active,
            'last_login': user.last_login.isoformat() if user.last_login else None,
        },
        'token_info': {
            'algorithm': 'HS256',
            'token_type': 'Bearer',
            'access_lifetime': '15 minutes',
            'refresh_lifetime': '7 days',
        },
        'request_info': {
            'ip_address': get_client_ip(request),
            'user_agent': request.META.get('HTTP_USER_AGENT', 'Unknown'),
            'method': request.method,
            'path': request.path,
        }
    }, status=status.HTTP_200_OK)


def get_client_ip(request):
    """
    Get the client IP address from request
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


@api_view(['GET'])
def jwt_info_view(request):
    """
    Public endpoint that returns JWT configuration information
    """
    return Response({
        'jwt_config': {
            'access_token_lifetime': '15 minutes',
            'refresh_token_lifetime': '7 days',
            'algorithm': 'HS256',
            'issuer': 'coffee-shop-api',
            'token_rotation': True,
            'blacklist_enabled': True,
        },
        'endpoints': {
            'login': '/api/auth/login/',
            'refresh': '/api/auth/refresh/',
            'verify': '/api/auth/verify/',
            'logout': '/api/auth/logout/',
            'test': '/api/auth/test/',
        },
        'usage': {
            'headers': {
                'Authorization': 'Bearer <your_access_token>'
            },
            'rate_limits': {
                'anonymous': '100/hour',
                'authenticated': '1000/hour',
                'login_attempts': '5/minute'
            }
        }
    }, status=status.HTTP_200_OK)
