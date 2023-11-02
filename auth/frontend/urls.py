from django.contrib import admin
from django.urls import path,include
from .views import *
urlpatterns = [
    path("",LoginScreen,name="LoginScreen"),
    path('logout',Logout,name="Logout"),
    path('home',HomeScreen,name='HomeScreen'),
    path('uploadpodok',UploadPodokNameScreen,name='UploadPodokNameScreen'),
    path('form',FormScreen,name='FormScreen'),
     path('search',SearchScreen,name='SearchScreen'),
    path('report_form',ReportScreen,name='ReportScreen'),
     path('report_view',ReportSearchScreen,name='ReportSearchScreen'),
    
    path('updateVerification',UpdateVerificationScreen,name='UpdateVerificationScreen'),
    path('user',UserCreationScreen,name='UserCreationScreen'),
    
     path('training',TrainingSearchScreen,name='TrainingSearchScreen'),
     path('rules_laws',RulesSearchScreen,name='RulesSearchScreen'),
     path('archived',ArchiveSearchScreen,name='ArchiveSearchScreen'),
    #  path('images/report/<str:path>/<str:path1>/<str:path2>/<str:file>', MediaAccessScreen, name='MediaAccessScreen'),
    path('image/download/<int:pk>/',MediaAccessScreenById,name='MediaAccessScreenById')
]
