from rest_framework.routers import DefaultRouter
from album.api.views import AlbumViewSet, ComponenViewSet

router = DefaultRouter()
router.register(r'albums', AlbumViewSet, basename='album')
router.register(r'componen', ComponenViewSet, basename='componen')

urlpatterns = router.urls
