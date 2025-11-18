from django.contrib import admin
from .models import lista_de_reproduccion, agrega, favoritos, historial

admin.site.register(lista_de_reproduccion)
admin.site.register(agrega)
admin.site.register(favoritos)
admin.site.register(historial)
