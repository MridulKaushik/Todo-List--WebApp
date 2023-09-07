from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    description = models.TextField(max_length=500)

    def __str__(self):
        return f"{self.title}"
    