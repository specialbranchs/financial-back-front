from django.contrib import admin
from django.urls import path, include
from .views import *  # Register,PodokNameApiView, LoginView, LogOutView, UserView, PersionApiView, AddPersonApiView, AddReportApiView, getReportApiView
from rest_framework_simplejwt.views import (
  
    TokenRefreshView,
)
urlpatterns = [

    path('register', Register.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogOutView.as_view()),
    path('person', PersionApiView.as_view()),
    path('personAdd', AddPersonApiView.as_view()),
    path('personUpdate', AddPersonApiView.as_view()),
    # path('reportAdd', AddReportApiView.as_view()),
    path('reportbodyAdd',AddReportBodyApiView.as_view()),
    path('reportfileAdd',AddReportFileApiView.as_view()),
    path('deleteFile',DeleteFileApiView.as_view()),
    path('report_get', getReportApiView.as_view()),
    path('podok_get', PodokNameApiView.as_view()),
    path('podokAdd', PodokUpdateApiView.as_view()),
    path('child_podok',ChildPodokNameApiView.as_view()),
    path('doron_get', DoronNameApiView.as_view()),
    path('generate_report',GenerateReportApiView.as_view()),
    path('add_subcatagory',AddSubCatagoryApiView.as_view()),
    path('nid',ExistsNidApiView.as_view()),
    path('tin',ExistsTinApiView.as_view()),
    path('download',DownloadFileApiView.as_view()),
    path('add-event',AddGallaryEventApiView.as_view()),
    path('gallary_add',AddGallaryApiView.as_view()),
    path('gallary_get', getGallaryApiView.as_view()),
    path('single_gallary_Add',AddGallaryApiView.as_view()),
  
    path('change-password',changePassword.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),




]
