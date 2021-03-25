from django.urls import path
from . import views
urlpatterns = [
    path('', views.note_read),
    path('diary/', views.diary_create_read),
    path('check/', views.diary_check),
    path('stat/used_words/', views.word_used_rate),
    # path('word/', views.word_create),
    # path('image/', views.upload_image),
]
