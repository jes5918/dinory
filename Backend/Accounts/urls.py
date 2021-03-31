from django.urls import path
from . import views
from .views import signup_views, check_views, email_confirm_views, setting_user_views, find_password_views, child_views

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
urlpatterns = [
    # 관리자 계정
    path('signup/', signup_views.signup),
    path('login/', obtain_jwt_token),
    path('login/verify/', verify_jwt_token),
    path('login/refresh/', refresh_jwt_token),

    # 중복확인, 일치 확인
    path('check/pin/', check_views.pin_check),
    path('check/user/', check_views.user_check),
    path('check/email/', check_views.email_check),

    # 이메일 인증
    path('send/email/', email_confirm_views.email_code),
    path('send/email/confirm/', email_confirm_views.email_code_confirm),

    # 회원정보수정 - 핀번호, 비밀번호, 삭제
    path('setting/password/<int:pk>/', setting_user_views.password_setting),
    path('setting/pincode/<int:pk>/', setting_user_views.pincode_setting),
    path('setting/delete/<int:pk>/', setting_user_views.user_delete),

    # 비밀번호 찾기
    path('find/password/', find_password_views.password_find),
    path('find/password/confirm/', find_password_views.password_find_confirm),
    path('find/password/setting/<int:pk>/', find_password_views.password_find_setting),
    # 아이계정
    path('child/', child_views.child_create_read),
    path('child/setting/', child_views.child_update),
    path('child/setting/delete/', child_views.child_delete),
    path('child/setting/voice/', child_views.child_change_voice),
]
