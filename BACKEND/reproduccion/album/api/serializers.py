from rest_framework import serializers
from album.models import album, componen

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = album
        fields = '__all__'

class ComponenSerializer(serializers.ModelSerializer):
    class Meta:
        model = componen
        fields = '__all__'
