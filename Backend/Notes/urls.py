from django.urls import path
from .views import note_check_views, note_read_views, note_create_views
from . import views
urlpatterns = [
    # 일기 작성
    path('diary/', note_create_views.diary_create),

    # 일기 조회
    path('diary/total/', note_read_views.diary_read_total),
    path('diary/total/monthly/', note_read_views.diary_read_total_monthly),
    path('diary/total/daily/', note_read_views.diary_read_total_daily),
    path('diary/monthly/', note_read_views.diary_read_monthly),
    path('diary/<int:pk>/', note_read_views.diary_read_only_pk),

    # 체크 , 관리자 확인, 튜토리얼 여부 확인
    path('check/', note_check_views.diary_check),
    path('tutorial/', note_check_views.diary_tutorial_check),
]
