from rest_framework.routers import DefaultRouter
from usuario.api.views import PersonaViewSet, UsuarioListadoViewSet, UsuarioViewSet, crear_persona_y_usuario , login_api, verificar_al_crear
from django.urls import path, include

router = DefaultRouter()
router.register(r'personas', PersonaViewSet, basename='persona')
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('', include(router.urls)),
    path('login_api/', login_api),
    path('verificar_al_crear/', verificar_al_crear),
    path('crear_persona_y_usuario/', crear_persona_y_usuario),
    path('listado_usuarios/', UsuarioListadoViewSet.as_view({'get': 'list'}), name='listado-usuarios'),
]