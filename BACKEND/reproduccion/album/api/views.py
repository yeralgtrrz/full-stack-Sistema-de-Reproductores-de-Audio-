from rest_framework import viewsets
from album.models import album, componen
from album.api.serializers import AlbumSerializer, ComponenSerializer


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = album.objects.all()
    serializer_class = AlbumSerializer


class ComponenViewSet(viewsets.ModelViewSet):
    queryset = componen.objects.all()
    serializer_class = ComponenSerializer
