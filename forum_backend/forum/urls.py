from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, PostViewSet, CommentViewSet

router = DefaultRouter()
router.register('profiles', ProfileViewSet, basename='profile')
router.register('posts', PostViewSet, basename='post')
router.register('comments', CommentViewSet, basename='comment')

urlpatterns = [
    path('api/', include(router.urls)),
]
