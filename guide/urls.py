from django.urls import path
from . import views

app_name = 'guide'

urlpatterns = [
    path('', views.home, name='home'),
    path('monuments/', views.monuments, name='monuments'),
    path('stations/', views.stations, name='stations'),
    path('lignes/', views.lignes, name='lignes'),
    path('circuits/', views.circuits, name='circuits'),
    path('carte-interactive/', views.carte, name='carte'),
    path('tickets/', views.tickets, name='tickets'),
    path('a-propos/', views.about, name='about'),
    path('connexion/', views.login_view, name='login'),
    path('inscription/', views.register_view, name='register'),
]
