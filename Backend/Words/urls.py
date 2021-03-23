from django.urls import path
from . import views
urlpatterns = [
    path('', views.word_create_read),
    path('<str:word>/', views.word_read),
]
