from rest_framework import serializers
from produccion.models import audio, podcast, cancion, genero, contiene, artista, crea

class AudioSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = audio
        fields = '__all__'


class PodcastSerializer(serializers.ModelSerializer):
    ruta = serializers.SerializerMethodField()
    class Meta:
        model = podcast
        fields = '__all__'
        
    def get_ruta(self, obj):
        request = self.context.get('request')
        if obj.id_audio and obj.id_audio.ruta_archivo:
            return request.build_absolute_uri(f"/media/{obj.id_audio.ruta_archivo}")
        return None

class CancionSerializer(serializers.ModelSerializer):
    ruta = serializers.SerializerMethodField()

    class Meta:
        model = cancion
        fields = '__all__'

    def get_ruta(self, obj):
        request = self.context.get('request')
        if obj.id_audio and obj.id_audio.ruta_archivo:
            return request.build_absolute_uri(f"/media/{obj.id_audio.ruta_archivo}")
        return None


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = genero
        fields = '__all__'

class ContieneSerializer(serializers.ModelSerializer):
    class Meta:
        model = contiene
        fields = '__all__'

class ArtistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = artista
        fields = '__all__'

class CreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = crea
        fields = '__all__'
