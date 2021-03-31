from django.urls import path
from .views import note_views, word_views

urlpatterns = [
    # 단어 통계
    path('words/', word_views.word_used_rate),
    path('words/cloud/', word_views.word_used_cloud),

    # 일기 통계
    path('diary/', note_views.diary_stat),
    path('diary/commit/', note_views.diary_commit),
    path('diary/monthly/', note_views.diary_monthly_rate),
    path('diary/yearly/', note_views.diary_yearly_rate),
]
