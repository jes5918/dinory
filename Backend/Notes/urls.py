from django.urls import path
from . import views
urlpatterns = [
    path('', views.note_read),
    path('diary/', views.diary_create_read),
    path('diary/<int:pk>/', views.diary_read_only_pk),
    path('diary/footer/', views.diary_read_footer),
    path('tutorial/', views.diary_tutorial_check),

    path('check/', views.diary_check),
    path('stat/used_words/', views.word_used_rate),
    path('stat/used_words/cloud/', views.word_used_cloud),
    path('stat/diary/', views.diary_stat),
    path('stat/diary/commit/', views.diary_commit),
    path('stat/diary/monthly/', views.diary_monthly_rate),
    path('stat/diary/yearly/', views.diary_yearly_rate),
    # path('stat/attend/', views.diary_attend_rate)
    # path('word/', views.word_create),
    # path('image/', views.upload_image),
]
