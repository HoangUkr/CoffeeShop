from django.db import models

# Model class for Product
class Product(models.Model):
    product_name = models.CharField(
        max_length=100,
        verbose_name='Product name',
        help_text='Enter the name of product'
    )
    product_price = models.FloatField(
        verbose_name='Product price',
        help_text='Enter the price of product'
    )
    product_like_count = models.PositiveIntegerField(
        default=0,
        verbose_name='Product like count',
        help_text='Enter the like count of product'
    )
    category = models.ForeignKey(
        'Category',
        on_delete=models.CASCADE,
        related_name='products'
    )
    
    class Meta:
        db_table = 'product'
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['id']