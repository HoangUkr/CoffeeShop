from django.db import models

# Import Cloudinary Storage
from cloudinary_storage.storage import MediaCloudinaryStorage

# Model for images (list image for product)
# Image -> Product (many-to-one)
class Images(models.Model):
    image = models.ImageField(
        upload_to='product/',
        storage= MediaCloudinaryStorage(),
        max_length=100,
        verbose_name='The image field for products',
        help_text='Please upload the image'
    )
    product = models.ForeignKey(
        'Product',
        on_delete=models.CASCADE,
        related_name='images'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Created Date of Images'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Updated Date of Images'
    )
    
    class Meta:
        db_table = 'image'
        verbose_name = 'Image'
        verbose_name_plural = 'Images'
        ordering = ['id']
        
    def __str__(self):
        return f'The image url: {self.url}.'