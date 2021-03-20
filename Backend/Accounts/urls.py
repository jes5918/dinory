from django.urls import path
from . import views

from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('email/', views.email_check),
    path('signup/', views.signup),
    path('login/', obtain_jwt_token),
    path('child/', views.register_child),
]
