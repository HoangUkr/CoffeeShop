from django.contrib import admin
from django.urls import path, include

# Team API Urls
from api.views import (
    TeamCreateView, TeamModifyView, TeamDeleteView, TeamListView,
    CategoryListView, CategoryDeleteView, CategoryModifyView, CategoryCreateView,
    ReviewListView, ReviewCreateView, ReviewDeleteView,
    ProductModifyView, ProductCreateView, ProductDeleteView, ProductListView,
    OrderItemModifyView, OrderItemCreateView, OrderItemDeleteView, OrderItemListView,
    OrderCreateView, OrderDeleteView, OrderListView, OrderModifyView,
    CustomUserModifyView, CustomUserCreateView, CustomUserDeleteView, CustomUserListView
)

urlpatterns = [
    path('v1/teams/create/', TeamCreateView.as_view(), name='team-create'),
    path('v1/teams/<int:pk>/update/', TeamModifyView.as_view(), name='team-update'),
    path('v1/teams/<int:pk>/delete/', TeamDeleteView.as_view(), name='team-delete'),
    path('v1/teams/', TeamListView.as_view(), name='team-list'),
    
    # Url for category
    path('v1/categories/', CategoryListView.as_view(), name='category-list'),
    path('v1/categories/create/', CategoryCreateView.as_view(), name='category-create'),
    path('v1/categories/<int:pk>/update/', CategoryModifyView.as_view(), name='category-update'),
    path('v1/categories/<int:pk>/delete/', CategoryDeleteView.as_view(), name='category-delete'),

    # Url for reviews
    path('v1/reviews/', ReviewListView.as_view(), name='review-list-all'),  # All reviews
    path('v1/products/<int:product_id>/reviews/', ReviewListView.as_view(), name='review-list-by-product'),  # Reviews for product
    path('v1/products/<int:product_id>/reviews/create/', ReviewCreateView.as_view(), name='review-create'),  # Create review
    path('vi/reviews/<int:pk>/delete/', ReviewDeleteView.as_view(), name='review-delete'),  # Delete review

    # Url for product
    path('v1/products/', ProductListView.as_view(), name='product-list'),  # List all products
    path('v1/products/category/<int:category_id>/', ProductListView.as_view(), name='product-list-by-category'),   # # List all products by category
    path('v1/products/create/', ProductCreateView.as_view(), name='product-create'),   # Create product with upload image
    path('v1/products/<int:pk>/update/', ProductModifyView.as_view(), name='product-update'),  # Modify product with upload image
    path('v1/products/<int:pk>/delete/', ProductDeleteView.as_view(), name='product-delete'),  # Delete product

    # Url for order item
    path('v1/orders/<int:order_id>/products/<int:product_id>/items/create/', OrderItemCreateView.as_view(), name='orderitem-create'),  # Create item for order
    path('v1/orders/<int:order_id>/products/<int:product_id>/items/modify/', OrderItemModifyView.as_view(), name='orderitem-modify'),  # Modify item
    path('v1/orders/items/<int:pk>/delete/', OrderItemDeleteView.as_view(), name='orderitem-delete'),  # Delete item
    path('v1/orders/<int:order_id>/items/', OrderItemListView.as_view(), name='orderitem-list'),   # Get all items of order

    # Url for order
    path('v1/orders/create/', OrderCreateView.as_view(), name='order-create'), # Create order
    path('v1/orders/<int:pk>/modify/', OrderModifyView.as_view(), name='order-modify'),    # Modify order
    path('v1/orders/<int:pk>/delete/', OrderDeleteView.as_view(), name='order-delete'),    # Delete order
    path('v1/orders/', OrderListView.as_view(), name='order-list'),    # List of order

    # Url for user
    path('v1/users/create/', CustomUserCreateView.as_view(), name='user-create'),
    path('v1/users/', CustomUserListView.as_view(), name='user-list'),
    path('v1/users/<int:pk>/modify/', CustomUserModifyView.as_view(), name='user-modify'),
    path('v1/users/<int:pk>/delete/', CustomUserDeleteView.as_view(), name='user-delete'),
]
