
from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin



class MyUserManager(BaseUserManager):
   
    def create_superuser(self, email, password=None):
        user = self.model(
            email=email
        )
        user.is_admin = True
        user.is_superuser=True
        user.is_staff=True
        # print(password)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_adminuser(self, email,password=None):
        user = self.model(
            email=email
        )
        user.is_admin = True
        user.is_superuser=False
        user.is_staff=False
        # print(password)
        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_user(self, email,password=None):
        user = self.model(
            email=email
        )
        user.is_admin = False
        user.is_superuser=False
        user.is_staff=True
        # print(password)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser,PermissionsMixin):
     
    name=models.CharField(max_length=255)
    email=models.CharField(max_length=255,unique=True)
    password=models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    username=None
    
    
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]
    objects = MyUserManager()
    
    def __str__(self):
        return self.email
   
   
class Person(models.Model):
    name=models.CharField(max_length=255,null=True,blank=True)
    fatherName=models.CharField(max_length=255,null=True,blank=True)
    motherName=models.CharField(max_length=255,null=True,blank=True)
    nid=models.CharField(max_length=255,null=True,blank=True)
    tinNumber=models.CharField(max_length=255,null=True,blank=True)
    picture = models.ImageField(upload_to='pictures-upload/%Y/%m/%d/', max_length=255, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True,blank=True)
    
    def __str__(self):
        return "{} {}".format(self.name, self.id)
    
    @property
    def evaluation(self):
        return self.evaluation_set.all()
    
    @property
    def personal(self):
        return self.personal_set.all()
    
    @property
    def professional(self):
        return self.professional_set.all()
    
    @property
    def political(self):
        return self.political_set.all()
    
    @property
    def mamla(self):
        return self.mamla_set.all()
    
    @property
    def person_Podok(self):
        return self.person_podok_set.all()
        
class Personal(models.Model):
    person=models.ForeignKey(Person,on_delete=models.CASCADE)
    parmentAdd=models.TextField(null=True,blank=True)
    presentAdd=models.TextField(null=True,blank=True)
    birthPlace=models.CharField(max_length=255,null=True,blank=True)
    dateOfBirth=models.CharField(max_length=255,null=True,blank=True)
    height=models.CharField(max_length=255,null=True,blank=True)
    bodyColor=models.CharField(max_length=255,null=True,blank=True)
    clue=models.CharField(max_length=255,null=True,blank=True)
    religion=models.CharField(max_length=255,null=True,blank=True)
    mobile=models.CharField(max_length=255,null=True,blank=True)
    passport=models.CharField(max_length=255,null=True,blank=True)
    education=models.TextField(null=True,blank=True)
    family=models.TextField(null=True,blank=True)
    wealth=models.TextField(null=True,blank=True)
    
    def __str__(self):
        return "{} {}".format(self.person, self.id)
    
    
class Professional(models.Model):
    person=models.ForeignKey(Person,on_delete=models.CASCADE)
    profession=models.CharField(max_length=255,null=True,blank=True)
    income=models.CharField(max_length=255,null=True,blank=True)
    business=models.TextField(null=True,blank=True)
    contribution=models.TextField(null=True,blank=True)
    
    def __str__(self):
        return "{} {}".format(self.person, self.id)   
    
class Political(models.Model):
    person=models.ForeignKey(Person,on_delete=models.CASCADE)
    politicalInfo= models.TextField(null=True,blank=True)
    electionInfo=models.TextField(null=True,blank=True)
    def __str__(self):
        return "{} {}".format(self.person, self.id)     
 
class Mamla(models.Model):
    person=models.ForeignKey(Person,on_delete=models.CASCADE)
    mamlaInfo=models.TextField(null=True,blank=True)
    sabotageInfo=models.TextField(null=True,blank=True)
    arrestOrder=models.TextField(null=True,blank=True)
    arrestInfo=models.TextField(null=True,blank=True)
    corruptionInfo=models.TextField(null=True,blank=True)
    thanaRecord=models.TextField(null=True,blank=True)
    influential=models.CharField(null=True,max_length=255,blank=True)
    
    def __str__(self):
      return "{} {}".format(self.person, self.id)     
  
  
class Evaluation(models.Model):
    
    person=models.ForeignKey(Person,on_delete=models.CASCADE)
    evaluation=models.TextField(null=True,blank=True)
    
    def __str__(self):
      return "{} {}".format(self.person, self.id)     
  
    
    
class Report(models.Model):
    doron=models.CharField(null=True,blank=True,max_length=255)
    title=models.CharField(null=True,blank=True,max_length=255)
    body=models.TextField(null=True,blank=True)
    created = models.DateTimeField(auto_now_add=True,blank=True)
    
    
    def __str__(self):
     return "{} {}".format(self.title, self.id)
 
    # @property
    # def reportfile(self):
    #     return self.reportfile_set.all()
 
class ReportFile(models.Model):
     file=models.ForeignKey(Report,on_delete=models.CASCADE,related_name='user_report')
     picture = models.FileField(upload_to='report-upload/%Y/%m/%d/', max_length=255, null=True, blank=True)
     
     def __str__(self):
      return "{}".format(self.id)
     
class PodokName(models.Model):
    title=models.CharField(null=True,blank=True,max_length=255)
    created = models.DateTimeField(auto_now_add=True,blank=True)
    
    def __str__(self):
        return "{}".format(self.title)

class PodokChildName(models.Model):
    podokname=models.ForeignKey(PodokName,on_delete=models.CASCADE,null=True)
    title=models.CharField(null=True,blank=True,max_length=255)
    created = models.DateTimeField(auto_now_add=True,blank=True)
    
    def __str__(self):
        return "{}".format(self.id)    
    
class Person_Podok(models.Model):
    podok=models.ForeignKey(PodokName,on_delete=models.CASCADE,null=True)
    child=models.IntegerField(null=True,blank=True)
    person=models.ForeignKey(Person,on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True,blank=True)
    podokdate=models.DateField(blank=True,null=True)
    
    def __str__(self):
        return "{} {}".format(self.person, self.podok)


class DohoronName(models.Model):
    title=models.CharField(null=True,blank=True,max_length=255)
    created = models.DateTimeField(auto_now_add=True,blank=True)
    
    def __str__(self):
        return "{}".format(self.id)    