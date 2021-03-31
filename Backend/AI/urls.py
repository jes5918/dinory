from django.urls import path
from .views import image_views, text_views, grammar_views, pronun_views

urlpatterns = [
    # imagecapting
    path('imagecaption/', image_views.image_caption),

    # text to speech
    path('tts/', text_views.text_to_speech),

    # grammarcheck
    path('grammarcheck/', grammar_views.gramar_check_v1),
    path('grammarcheck2/', grammar_views.gramar_check_v2),

    # pronunciation evaluation
    path('pronunciation/', pronun_views.pronun_check),
]
