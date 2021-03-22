from django.urls import path
from . import views
urlpatterns = [
    path('', views.note_list),
    path('diary/', views.diary_create),
    # path('word/', views.word_read_craete),
]
