from rest_framework import viewsets
from lista.models import lista_de_reproduccion, agrega, favoritos, historial
from lista.api.serializers import (ListaDeReproduccionSerializer,AgregaSerializer,FavoritosSerializer,HistorialSerializer)

class ListaDeReproduccionViewSet(viewsets.ModelViewSet):
    queryset = lista_de_reproduccion.objects.all()
    serializer_class = ListaDeReproduccionSerializer

class AgregaViewSet(viewsets.ModelViewSet):
    queryset = agrega.objects.all()
    serializer_class = AgregaSerializer

class FavoritosViewSet(viewsets.ModelViewSet):
    queryset = favoritos.objects.all()
    serializer_class = FavoritosSerializer

class HistorialViewSet(viewsets.ModelViewSet):
    queryset = historial.objects.all()
    serializer_class = HistorialSerializer
