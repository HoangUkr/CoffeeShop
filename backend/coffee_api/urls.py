"""
URL configuration for coffee_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenVerifyView,
    TokenBlacklistView
)
from api.jwt_views import CustomTokenObtainPairView, CustomTokenRefreshView
from api.jwt_test_views import jwt_test_view, jwt_info_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    
    # Enhanced JWT Authentication endpoints with custom views
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/auth/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    
    # JWT Testing and Info endpoints
    path('api/auth/test/', jwt_test_view, name='jwt_test'),
    path('api/auth/info/', jwt_info_view, name='jwt_info'),
    
    # Legacy endpoints (for backward compatibility)
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair_legacy'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh_legacy'),
]

# Serve static files in development and production
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    # In production, serve static files through Django (temporary solution)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
