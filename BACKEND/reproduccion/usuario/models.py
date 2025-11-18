from django.db import models

class persona(models.Model):
    id_persona = models.AutoField(primary_key=True)
    nombres = models.CharField(max_length=255)
    paterno = models.CharField(max_length=255)
    materno = models.CharField(max_length=255)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField()
    tipo_persona = models.CharField(max_length=50)

    class Meta:
        db_table = 'persona'
        managed = False

class usuario(models.Model):
    id_persona = models.OneToOneField(persona, on_delete=models.CASCADE, primary_key=True, db_column='id_persona')
    nombre_usuario = models.CharField(max_length=50)
    contraseña = models.CharField(max_length=100)
    fecha_registro = models.DateField()

    class Meta:
        db_table = 'usuario'
        managed = False

