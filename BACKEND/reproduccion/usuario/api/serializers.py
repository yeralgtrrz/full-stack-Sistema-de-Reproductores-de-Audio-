from rest_framework import serializers
from usuario.models import persona, usuario

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = persona
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuario
        fields = '__all__'

class Usuariolistado(serializers.ModelSerializer):
    nombres = serializers.CharField(source='id_persona.nombres', read_only=True)
    class Meta:
        model = usuario
        fields = ['id_persona', 'nombre_usuario', 'nombres']
