from rest_framework.routers import DefaultRouter
from lista.api.views import (
    ListaDeReproduccionViewSet,
    AgregaViewSet,
    FavoritosViewSet,
    HistorialViewSet
)

router = DefaultRouter()
router.register(r'listas', ListaDeReproduccionViewSet, basename='lista_de_reproduccion')
router.register(r'agrega', AgregaViewSet, basename='agrega')
router.register(r'favoritos', FavoritosViewSet, basename='favoritos')
router.register(r'historial', HistorialViewSet, basename='historial')

urlpatterns = router.urls
