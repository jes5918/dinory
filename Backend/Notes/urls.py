from django.urls import path
from . import views
urlpatterns = [
    path('diary/', views.diarylist_create),
    path('word/', views.word_read_craete),
]
