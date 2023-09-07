from django.shortcuts import render
from .serializers import TodoSerializer
from rest_framework.viewsets import ModelViewSet
from .models import Todo
# Create your views here.

def homepage(request):
    return render(request, 'index.html')


class TodoView(ModelViewSet):
    serializer_class = TodoSerializer 
    queryset = Todo.objects.all()

    # def update(self, request, pk=None):
    #     return super().update(request,pk=id)