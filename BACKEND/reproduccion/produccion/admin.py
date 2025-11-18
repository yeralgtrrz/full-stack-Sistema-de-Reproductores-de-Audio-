from django.contrib import admin
from produccion.models import audio, cancion, podcast, genero, contiene, artista, crea

admin.site.register(audio)
admin.site.register(cancion)
admin.site.register(podcast)
admin.site.register(genero)
admin.site.register(contiene)
admin.site.register(artista)
admin.site.register(crea)