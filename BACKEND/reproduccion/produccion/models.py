from django.db import models
from album.models import album
from usuario.models import persona

class audio(models.Model):
    id_audio = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=255)  
    duracion = models.DurationField()          
    fecha_publicacion = models.DateField()
    tipo_audio = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)
    ruta_archivo = models.CharField(max_length=255)

    class Meta:
        db_table = 'audio'
        managed = False

class podcast(models.Model):
    id_audio = models.OneToOneField(audio, on_delete=models.CASCADE, primary_key=True, db_column='id_audio')
    temporada = models.IntegerField()
    episodio = models.IntegerField()

    class Meta:
        db_table = 'podcast'
        managed = False

class cancion(models.Model):
    id_audio = models.OneToOneField(audio, on_delete=models.CASCADE, primary_key=True, db_column='id_audio')
    id_album = models.ForeignKey(album, on_delete=models.CASCADE, db_column='id_album')
    numero_pista = models.IntegerField()
    idioma = models.CharField(max_length=50)

    class Meta:
        db_table = 'cancion'
        managed = False

class genero(models.Model):
    id_genero = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField()

    class Meta:
        db_table = 'genero'
        managed = False

class contiene(models.Model):
    id = models.AutoField(primary_key=True)
    id_audio = models.ForeignKey(audio, on_delete=models.CASCADE, db_column='id_audio')
    id_genero = models.ForeignKey(genero, on_delete=models.CASCADE, db_column='id_genero')

    class Meta:
        db_table = 'contiene'
        managed = False
        constraints = [
            models.UniqueConstraint(fields=['id_audio', 'id_genero'], name='unique_audio_genero')
        ]


class artista(models.Model):
    id_persona = models.OneToOneField(persona, on_delete=models.CASCADE, primary_key=True, db_column='id_persona')
    nacionalidad = models.CharField(max_length=100)

    class Meta:
        db_table = 'artista'
        managed = False
 
class crea(models.Model):
    id = models.AutoField(primary_key=True)  # esto refleja tu columna SERIAL en SQL
    id_persona = models.ForeignKey(persona, on_delete=models.CASCADE, db_column='id_persona')
    id_audio = models.ForeignKey(audio, on_delete=models.CASCADE, db_column='id_audio')
    rol = models.CharField(max_length=50)

    class Meta:
        db_table = 'crea'
        managed = False
        constraints = [
            models.UniqueConstraint(fields=['id_persona', 'id_audio'], name='crea_persona_audio')
        ]
