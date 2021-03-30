from django.urls import path
from . import views

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
urlpatterns = [
    # 관리자 계정
    path('signup/', views.signup),
    path('login/', obtain_jwt_token),
    path('login/verify/', verify_jwt_token),
    path('login/refresh/', refresh_jwt_token),

    # 중복확인, 일치 확인
    path('check/pin/', views.pin_check),
    path('check/user/', views.user_check),
    path('check/email/', views.email_check),

    # 이메일 인증
    path('send/email/', views.email_code),
    path('send/email/confirm/', views.email_code_confirm),

    # 회원정보수정 - 핀번호, 비밀번호, 삭제
    path('setting/password/<int:pk>/', views.password_setting),
    path('setting/pincode/<int:pk>/', views.pincode_setting),
    path('setting/delete/<int:pk>/', views.user_delete),
    # 비밀번호 찾기
    path('find/password/', views.password_find),
    path('find/password/confirm/', views.password_find_confirm),
    path('find/password/setting/<int:pk>/', views.password_find_setting),
    # 아이계정
    path('child/', views.child_create_read),
    path('child/setting/', views.child_update),
    path('child/setting/delete/', views.child_delete),
    path('child/setting/voice/', views.child_change_voice),
]
