from rest_framework import viewsets
from produccion.models import audio, podcast, cancion, artista, crea, genero, contiene
from produccion.api.serializers import (
    AudioSerializer,
    PodcastSerializer,
    CancionSerializer,
    ArtistaSerializer,
    CreaSerializer,
    GeneroSerializer,
    ContieneSerializer
)

class AudioViewSet(viewsets.ModelViewSet):
    queryset = audio.objects.all()
    serializer_class = AudioSerializer


class PodcastViewSet(viewsets.ModelViewSet):
    queryset = podcast.objects.all()
    serializer_class = PodcastSerializer


class CancionViewSet(viewsets.ModelViewSet):
    queryset = cancion.objects.all()
    serializer_class = CancionSerializer


class ArtistaViewSet(viewsets.ModelViewSet):
    queryset = artista.objects.all()
    serializer_class = ArtistaSerializer


class CreaViewSet(viewsets.ModelViewSet):
    queryset = crea.objects.all()
    serializer_class = CreaSerializer


class GeneroViewSet(viewsets.ModelViewSet):
    queryset = genero.objects.all()
    serializer_class = GeneroSerializer


class ContieneViewSet(viewsets.ModelViewSet):
    queryset = contiene.objects.all()
    serializer_class = ContieneSerializer
