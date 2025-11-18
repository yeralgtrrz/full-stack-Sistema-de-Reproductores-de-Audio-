from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from rest_framework import viewsets
from usuario.models import persona, usuario
from usuario.api.serializers import PersonaSerializer, UsuarioSerializer, Usuariolistado
from usuario.models import persona as PersonaModelo, usuario as UsuarioModelo

class UsuarioListadoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = usuario.objects.select_related('id_persona').all()
    serializer_class = Usuariolistado

class PersonaViewSet(viewsets.ModelViewSet):
    queryset = persona.objects.all()
    serializer_class = PersonaSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = usuario.objects.all()
    serializer_class = UsuarioSerializer

@api_view(['POST'])
def login_api(request):
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        user = usuario.objects.get(nombre_usuario=username, contraseña=password)
        return Response({
            "existe": True,
            "id": user.id_persona.id_persona
        })
    except usuario.DoesNotExist:
        return Response({"existe": False})

@api_view(['POST'])
def verificar_al_crear(request):
    username = request.data.get("usuario_entrante")
    existe = usuario.objects.filter(nombre_usuario=username).exists()
    return Response({"existe": existe})


@csrf_exempt
def crear_persona_y_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        persona_data = data.get('persona')
        if persona_data:
            nueva_persona = PersonaModelo.objects.create(
                nombres=persona_data.get('nombres', ''),
                paterno=persona_data.get('paterno', ''),
                materno=persona_data.get('materno', ''),
                email=persona_data.get('email', ''),
                telefono=persona_data.get('telefono', ''),
                fecha_nacimiento=persona_data.get('fecha_nacimiento')
            )
        
        usuario_data = data.get('usuario')
        if usuario_data:
            UsuarioModelo.objects.create(
                id_persona=nueva_persona,
                nombre_usuario=usuario_data.get('nombre_usuario', ''),
                contraseña=usuario_data.get('contraseña', ''),
                fecha_registro=usuario_data.get('fecha_registro')
            )
    
    # Retornamos un JSON simple con true
    return JsonResponse({"success": True})
