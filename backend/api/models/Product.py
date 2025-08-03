from django.db import models

# Model class for Product
class Product(models.Model):
    product_name = models.CharField(
        max_length=100,
        verbose_name='Product name',
        help_text='Enter the name of product'
    )
    product_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Product price',
        help_text='Enter the price of product'
    )
    product_like_count = models.PositiveIntegerField(
        default=0,
        verbose_name='Product like count',
        help_text='Enter the like count of product'
    )
    thumbnail = models.ImageField(
        upload_to='products/',
        verbose_name='Product thumbnail',
        help_text='Upload the thumbnail image of product'
    )
    category = models.ForeignKey(
        'Category',
        on_delete=models.CASCADE,
        related_name='products'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Created Date of Product'
    )
    updated_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Updated Date of Product'
    )
    
    class Meta:
        db_table = 'product'
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['id']