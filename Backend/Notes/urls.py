from django.urls import path
from . import views
urlpatterns = [
    path('', views.note_read),
    path('diary/', views.diary_create_read),
    path('check/', views.diary_check),
    # path('word/', views.word_create),
]
