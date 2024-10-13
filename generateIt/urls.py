from django.urls import path
from .views import generate_qr_code

urlpatterns = [
    path('api/generate-qr/', generate_qr_code, name='generate_qr_code'),
]
