from rest_framework.routers import DefaultRouter
from produccion.api.views import (
    CancionViewSet,
    PodcastViewSet,
    ArtistaViewSet,
    CreaViewSet,
    GeneroViewSet,
    ContieneViewSet,
    AudioViewSet
)

# Crear el router principal
router = DefaultRouter()

# Registrar los endpoints
router.register(r'audios', AudioViewSet, basename='audio')
router.register(r'podcasts', PodcastViewSet, basename='podcast')
router.register(r'canciones', CancionViewSet, basename='cancion')
router.register(r'artistas', ArtistaViewSet, basename='artista')
router.register(r'crea', CreaViewSet, basename='crea')
router.register(r'generos', GeneroViewSet, basename='genero')
router.register(r'contiene', ContieneViewSet, basename='contiene')

# Exportar las rutas
urlpatterns = router.urls
