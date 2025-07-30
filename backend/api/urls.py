from django.contrib import admin
from django.urls import path, include

# Team API Urls
from api.views import (
    TeamCreateView, TeamModifyView, TeamDeleteView, TeamListView,
    CategoryListView, CategoryDeleteView, CategoryModifyView, CategoryCreateView,
    ReviewListView, ReviewCreateView, ReviewDeleteView,
    ProductModifyView, ProductCreateView, ProductDeleteView, ProductListView
)

urlpatterns = [
    path('teams/create/', TeamCreateView.as_view(), name='team-create'),
    path('teams/<int:pk>/update/', TeamModifyView.as_view(), name='team-update'),
    path('teams/<int:pk>/delete/', TeamDeleteView.as_view(), name='team-delete'),
    path('teams/', TeamListView.as_view(), name='team-list'),
    
    # Url for category
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/create/', CategoryCreateView.as_view(), name='category-create'),
    path('categories/<int:pk>/update/', CategoryModifyView.as_view(), name='category-update'),
    path('categories/<int:pk>/delete/', CategoryDeleteView.as_view(), name='category-delete'),

    # Url for reviews
    path('reviews/', ReviewListView.as_view(), name='review-list-all'),  # All reviews
    path('products/<int:product_id>/reviews/', ReviewListView.as_view(), name='review-list-by-product'),  # Reviews for product
    path('products/<int:product_id>/reviews/create/', ReviewCreateView.as_view(), name='review-create'),  # Create review
    path('reviews/<int:pk>/delete/', ReviewDeleteView.as_view(), name='review-delete'),  # Delete review

    # Url for product
    path('products/', ProductListView.as_view(), name='product-list'),  # List all products
    path('products/category/<int:category_id>/', ProductListView.as_view(), name='product-list-by-category'),   # # List all products by category
    path('products/create/', ProductCreateView.as_view(), name='product-create'),   # Create product with upload image
    path('products/<int:pk>/update/', ProductModifyView.as_view(), name='product-update'),  # Modify product with upload image
    path('products/<int:pk>/delete/', ProductDeleteView.as_view(), name='product-delete'),  # Delete product


]
