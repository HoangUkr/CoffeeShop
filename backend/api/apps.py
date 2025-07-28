from django.apps import AppConfig
from .cloudinary_config import cloudinary_config

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    
    def ready(self):
        cloudinary_config()  # Initialize Cloudinary configuration