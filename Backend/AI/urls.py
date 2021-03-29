from django.urls import path
from . import views

urlpatterns = [
    path('imagecaption/', views.image_caption),
    path('tts/', views.text_to_speech),
    path('grammarcheck/', views.gramar_check),
    path('grammarcheck2/', views.gramar_check2),
    path('pronunciation/', views.pronun_check),
]
