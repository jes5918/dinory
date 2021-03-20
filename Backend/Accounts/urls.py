from django.urls import path
from . import views

from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    # 관리자 계정
    path('signup/', views.signup),
    path('login/', obtain_jwt_token),
    path('check/email/', views.email_check),
    path('check/user/', views.user_check),
    path('setting/password/<int:pk>/', views.password_setting),
    path('setting/pincode/<int:pk>/', views.pincode_setting),
    path('setting/delete/<int:pk>/', views.user_delete),

    # 아이계정
    path('child/', views.child_create_read),
]
