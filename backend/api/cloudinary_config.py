import cloudinary
import os
from dotenv import load_dotenv

def cloudinary_config():
    # Load environment variables
    load_dotenv()
    
    # Required Cloudinary configurations
    required_configs = {
        'CLOUD_NAME': os.getenv('CLOUD_NAME'),
        'API_KEY': os.getenv('API_KEY'),
        'API_SECRET': os.getenv('API_SECRET')
    }
    
    # Check if all required configurations are set
    for key, value in required_configs.items():
        if not value or value.strip() == '':
            raise ValueError(f"Missing required Cloudinary configuration: {key}")
        
    # Apply the configurations
    cloudinary.config(
        cloud_name=required_configs['CLOUD_NAME'],
        api_key=required_configs['API_KEY'],
        api_secret=required_configs['API_SECRET'],
        secure=True  # Use secure URLs
    )