from django.urls import path
from . import views

urlpatterns = [
    path('imagecaption', views.imagecaption),
    # path('texttospeech/', views.diary_create_read),
    path('grammarcheck/', views.gramercheck),
    path('pronunciation/', views.pronunciation),
]
