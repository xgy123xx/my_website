from django.db import models

# Create your models here.
class ImgInfo(models.Model):
    img_source = (
    (1,'internet'),
    (2,'local'),
    (3,'others'))
    tid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=32)
    img_url = models.CharField(max_length=128)
    remark = models.IntegerField(choices=img_source)