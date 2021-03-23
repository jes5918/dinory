from django.contrib import admin
from django.urls import path, re_path
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view( 
    openapi.Info( 
        title="Dinory", 
        default_version="v1", 
        description="Dinory SERVER API 문서", 
        terms_of_service="https://www.google.com/policies/terms/", 
        # contact=openapi.Contact(name="Jansu", email="popop09090@naver.com"), 
        # license=openapi.License(name="Jansu"), 
    ), 
    public=True, 
    permission_classes=(permissions.AllowAny,), 
)