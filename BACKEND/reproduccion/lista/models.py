from django.db import models
from usuario.models import persona
from produccion.models import audio


class lista_de_reproduccion(models.Model):
    id_lista_reprod = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(
        persona, on_delete=models.CASCADE, db_column='id_persona'
    )
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    fecha_creacion = models.DateField()

    class Meta:
        db_table = 'lista_de_reproduccion'
        managed = False


class agrega(models.Model):
    id = models.AutoField(primary_key=True)  # id autoincremental para Django
    id_lista_reprod = models.ForeignKey(lista_de_reproduccion, on_delete=models.CASCADE, db_column='id_lista_reprod')
    id_audio = models.ForeignKey(audio, on_delete=models.CASCADE, db_column='id_audio')
    fecha_agregado = models.DateField()

    class Meta:
        db_table = 'agrega'
        managed = False
        constraints = [
            models.UniqueConstraint(
                fields=['id_lista_reprod', 'id_audio'],
                name='unique_lista_audio'
            )
        ]

class favoritos(models.Model):
    id = models.AutoField(primary_key=True)  # id autoincremental
    id_persona = models.ForeignKey(
        persona, on_delete=models.CASCADE, db_column='id_persona'
    )
    id_audio = models.ForeignKey(
        audio, on_delete=models.CASCADE, db_column='id_audio'
    )
    fecha_marcado = models.DateField()

    class Meta:
        db_table = 'favoritos'
        managed = False
        constraints = [
            models.UniqueConstraint(
                fields=['id_persona', 'id_audio'],
                name='favoritos_persona_audio'
            )
        ]


class historial(models.Model):
    id = models.AutoField(primary_key=True)  # id autoincremental
    id_persona = models.ForeignKey(
        persona, on_delete=models.CASCADE, db_column='id_persona'
    )
    id_audio = models.ForeignKey(
        audio, on_delete=models.CASCADE, db_column='id_audio'
    )
    fecha_reproduccion = models.DateField()
    veces_reproducido = models.IntegerField(default=1)

    class Meta:
        db_table = 'historial'
        managed = False
        constraints = [
            models.UniqueConstraint(
                fields=['id_persona', 'id_audio', 'fecha_reproduccion'],
                name='unique_persona_audio_fecha'
            )
        ]