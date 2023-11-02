import mimetypes
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render,redirect
from backend.models import CustomUser as User,Report
from django.contrib.auth import login,logout
# Create your views here.
from django.contrib.auth.decorators import login_required
from backend.utils import DhoronList, fieldDic

from backend.models import PodokName,Person,Person_Podok,DohoronName,ReportFile
from django.db.models import Count
def LoginScreen(request):
    credentials={
             'email':'',
             'password':'' ,
              'error':None
              }
   
    if  request.user.is_authenticated:
        return redirect('/home')
    if request.method=='POST':
       email=request.POST['email']
       password=request.POST['password']
       credentials['email']=email
       credentials['password']=password
    #    print(email,password)
       user=User.objects.filter(email=email).first()
       if user is None:
           credentials['error']='User not Found'
           return render(request,'html/user/login.html',context=credentials)
       
       if not user.check_password(password):
           credentials['error']='Password not maching'
           return render(request,'html/user/login.html',context=credentials)
       login(request,user)
       return redirect(HomeScreen)
   
    return render(request,'html/user/login.html',context=credentials)

def Logout(request):
    logout(request)
    return redirect(LoginScreen)
 
@login_required(login_url='/')    
def HomeScreen(request):
    cntVrPer=Person.objects.count()
    medals=PodokName.objects.annotate(medal_num=Count('person_podok')).order_by('-medal_num')
    # print(medals)
    mObj={}
    i=0
    j=1
    k=0
    mArr={}
    for md in medals:
        mArr[str(k)]=md
        i+=1
        k+=1
        if i==3:
            i=0
            j+=1
            mArr={}
        mObj[str(j)]=mArr
  
   
        
    offering={'count':cntVrPer,
              'medals':mObj}
    return render(request,'html/home/home.html',context=offering)

@login_required(login_url='/')  
def FormScreen(request):
    offering={'what':'fine'}
    return render(request,'html/admin/form.html',context=fieldDic())

@login_required(login_url='/')  
def ReportScreen(request):
    return render(request,'html/admin/report.html',context=DhoronList())



@login_required(login_url='/')  
def SearchScreen(request):
    offering={'what':'fine'}
    return render(request,'html/search/search.html',context=fieldDic())

@login_required(login_url='/')  
def ReportSearchScreen(request):
    offering={'what':'fine'}
    return render(request,'html/search/report.html',context=offering)


# VERIFICATION UPDATE
@login_required(login_url='/')  
def UpdateVerificationScreen(request):
    offering={'what':'fine'}
    return render(request,'html/update/index.html',context=fieldDic())


# VERIFICATION UPDATE
@login_required(login_url='/')  
def UploadPodokNameScreen(request):
    credentials={
             'title':'',
              'podokArr':fieldDic()['podokName'],
              'error':None
              }
    
    if request.method=='POST':
       title=request.POST['title']
       credentials['title']=title
       inst=PodokName.objects.create(title=title)
       inst.save()
       credentials['title']=''
       return render(request,'html/admin/podok.html',context=credentials)
    
    return render(request,'html/admin/podok.html',context=credentials)

@login_required(login_url='/')  
def UserCreationScreen(request):
    userlist=User.objects.filter(is_superuser=False)
    print(userlist)
    credentials={
             'name':'',
              'email':'',
              'password':'',
              'userList':userlist,
              'error':None
              }
    
    if request.method=='POST':
       name=request.POST['name']
       email=request.POST['email']
       password=request.POST['password']
       credentials['name']=name
       credentials['email']=email
       credentials['password']=password
       try:
           user=User.objects.get(email=email)
           credentials['error']='Email Already Taken'
           return render(request,'html/user/createuser.html',context=credentials)
       except User.DoesNotExist:
              
           inst=User.objects.create(email=email,password=password)
           inst.name=name
           inst.save()
           credentials['name']=''
           credentials['email']=''
           credentials['password']=''
           credentials['error']='User created successfully'
           return render(request,'html/user/createuser.html',context=credentials)
    
    return render(request,'html/user/createuser.html',context=credentials)



@login_required(login_url='/')  
def TrainingSearchScreen(request):
    offering={'what':'fine'}
    return render(request,'html/search/training.html',context=offering)


@login_required(login_url='/')  
def RulesSearchScreen(request):
    offering={'what':'fine'}
    return render(request,'html/search/rules.html',context=offering)

@login_required(login_url='/')  
def ArchiveSearchScreen(request):
    offering={'what':'fine'}
    return render(request,'html/search/archive.html',context=offering)




from django.http.response import FileResponse

import os

from django.http import HttpResponse, Http404,StreamingHttpResponse
BASE_DIR= os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@login_required(login_url='/')  
def MediaAccessScreen(request,path,path1,path2,file):
    print(path,path1,path2,file)
    file_path="images/report/"+path+"/"+path1+"/"+path2+"/"+file
    offering={'url':file_path}
    return render(request,'html/base/show.html',context=offering)

    if not os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/octet-stream")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
    raise Http404

from wsgiref.util import FileWrapper


def MediaAccessScreenById(request,pk):
    report=ReportFile.objects.get(pk=pk)
    
    url=str(report.picture)
    fl_path =os.path.join(BASE_DIR,url)
    filename = os.path.basename(fl_path)
    fl = open(fl_path, 'rb')
    mime_type, _ = mimetypes.guess_type(fl_path)
    chunk_size=8192
    # response = HttpResponse(fl, content_type=mime_type)
    response=StreamingHttpResponse(FileWrapper(fl,chunk_size),
                                   content_type=mime_type)
    response['Content-Length']=os.path.getsize(fl_path)
    response['Content-Disposition'] = "Attachment; filename=%s" % filename
    return response