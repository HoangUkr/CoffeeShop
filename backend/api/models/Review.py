from django.db import models

# Class model for Review
class Review(models.Model):
    reviewer_name = models.CharField(
        max_length=100,
        verbose_name='Reviewer email',
        help_text='Enter the name of the reviewer'
    )
    reviewer_email = models.EmailField(
        max_length=100,
        verbose_name='Reviewer email',
        help_text='Enter the email of the reviewer'
    )
    reviewer_comment = models.TextField(
        verbose_name='Reviewer comment',
        help_text='Enter the comment of the reviewer'
    )
    product = models.ForeignKey(
        'Product',
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Created Date of Reviews'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Updated Date of Reviews'
    )
    
    class Meta:
        db_table = 'review'
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'
        ordering = ['-created_at']
        
    def __str__(self):
        return f'The reviewer name: {self.reviewer_name}. The reviewer comment: {self.reviewer_comment}.'