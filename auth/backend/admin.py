from django.contrib import admin

# Register your models here.
from .models import PodokChildName, ReportFile, DohoronName,CustomUser,Person,Political,Professional,Evaluation, Mamla,Personal,PodokName,Person_Podok,Report

# admin.site.register(CustomUser)
# admin.site.register(Person)
admin.site.register(Political)
admin.site.register(Professional)
admin.site.register(Evaluation)
admin.site.register(Mamla)
admin.site.register(Personal)
admin.site.register(PodokName)
admin.site.register(Person_Podok)
admin.site.register(Report)
# admin.site.register(DohoronName)
admin.site.register(ReportFile)
admin.site.register(PodokChildName)

from django.contrib import admin

@admin.register(CustomUser)
class CustomAdmin(admin.ModelAdmin):
    list_display=("id","name","email","is_superuser","is_admin","is_staff")
    
    
@admin.register(DohoronName)
class CustomDoron(admin.ModelAdmin):
    list_display=("id","title")
    
    
    
@admin.register(Person)
class CustomPerson(admin.ModelAdmin):
    list_display=("id","name","fatherName","motherName","nid","tinNumber")
    list_filter=("nid",)
    search_fields = ("name__startswith", )