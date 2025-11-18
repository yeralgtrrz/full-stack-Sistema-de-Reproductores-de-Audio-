from rest_framework import serializers
from lista.models import lista_de_reproduccion, agrega, favoritos, historial

class ListaDeReproduccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = lista_de_reproduccion
        fields = '__all__'

class AgregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = agrega
        fields = '__all__'

class FavoritosSerializer(serializers.ModelSerializer):
    class Meta:
        model = favoritos
        fields = '__all__'

class HistorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = historial
        fields = '__all__'
