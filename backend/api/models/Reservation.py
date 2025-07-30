from django.db import models

# Class model for Reservation
class Reservation(models.Model):
    customer_name = models.CharField(
        max_length=100,
        verbose_name='Customer name',
        help_text='Enter the name of the customer',
        
    )
    customer_email = models.EmailField(
        max_length=100,
        verbose_name='Customer email',
        help_text='Enter the email of the customer'
    )
    customer_phone = models.CharField(
        max_length=100,
        verbose_name='Customer phone number',
        help_text='Enter the phone number of the customer'
    )
    reservation_date = models.DateTimeField(
        null=False,
        blank=False,
        verbose_name='Reservation Date',
        help_text='Select the date and time of reservation'
    )
    customer_message = models.CharField(
        max_length=2000,
        verbose_name='Customer message',
        help_text='Enter the message of the customer'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Created Date of Reservation'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Updated Date of Reservation'
    )
    
    class Meta:
        db_table = 'reservation'
        verbose_name = 'Reservation'
        verbose_name_plural = 'Reservations'
        ordering = ['-created_at']
        
    def __str__(self):
        return f'Customer name: {self.customer_name}. Reservation Date: {self.reservation_date.strftime("%m/%d/%Y, %H:%M:%S")}.'