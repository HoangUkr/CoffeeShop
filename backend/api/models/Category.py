from django.db import models

# Model class for Category
class Category(models.Model):
    category_name = models.CharField(
        max_length=100,
        verbose_name='Category Name',
        help_text='Enter the name of the category'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Created Date of Category'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Updated Date of Category'
    )
    
    class Meta:
        db_table = 'category'
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['id']
        
    def __str__(self):
        return f'Category Name: {self.category_name}.'