from django.urls import path
from . import views

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
urlpatterns = [
    # 관리자 계정
    path('signup/', views.signup),
    path('login/', obtain_jwt_token),
    path('login/verify/', verify_jwt_token),
    path('login/refresh/', refresh_jwt_token),
    path('check/pin/', views.pin_check),
    path('check/email/', views.email_check),
    path('check/user/', views.user_check),
    path('setting/password/<int:pk>/', views.password_setting),
    path('setting/pincode/<int:pk>/', views.pincode_setting),
    path('setting/delete/<int:pk>/', views.user_delete),
    path('find/password/', views.password_find),
    # 아이계정
    path('child/', views.child_create_read),
    path('child/setting/', views.child_update),
    path('child/setting/delete/', views.child_delete),
    path('child/setting/voice/', views.child_change_voice),
]
