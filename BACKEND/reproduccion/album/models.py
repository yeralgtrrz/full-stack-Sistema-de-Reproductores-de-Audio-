from django.db import models
from usuario.models import persona


class album(models.Model):
    id_album = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=150)
    fecha_lanzamiento = models.DateField()
    discografica = models.CharField(max_length=100)

    class Meta:
        db_table = 'album'
        managed = False 

class componen(models.Model):
    id = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(persona, on_delete=models.CASCADE, db_column='id_persona')
    id_album = models.ForeignKey(album, on_delete=models.CASCADE, db_column='id_album')
    rol = models.CharField(max_length=50)

    class Meta:
        db_table = 'componen'
        managed = False
        constraints = [models.UniqueConstraint(fields=['id_persona', 'id_album'], name='unique_persona_album')]

