import os
from django.core import serializers
from django.http import JsonResponse
import json
from django.db.models import Count
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import uuid
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView

from backend.decorator import unauthenticated_user
from .serializers import UserSerializer
from .serializerperson import ChildPodokNameSerializer, DoronNameSerializer, PersonSerializer, PodokNameCountSerializer, ReportCountSerializer, ReportSerializer, Person_PodokSerializerDepth, PersonSerializerDepth, PodokNameSerializer, Person_PodokSerializer

from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import PodokChildName, CustomUser as User, Person, Report, PodokName, Person_Podok, DohoronName, ReportFile
import jwt
import datetime
from django.db.models import Q
from .utils import makeDictionary, makeRdic, makeUpdateDictionary
from rest_framework.permissions import IsAuthenticated


class Register(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('user not found')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = User.objects.filter(is_superuser=False)
        serializer = UserSerializer(user,many=True)
        return Response(serializer.data)
    
    def put(self, request):
        id = request.data['id']
        
        res = {
            "mess": 'Delete succesfully',
            "del": True,
            "id": id
        }
       

        ins = User.objects.get(pk=id)
        ins.delete()
        # data = PodokName.objects.all()
        # serializer = PodokNameSerializer(data, many=True)

        return Response(res)


class LogOutView(APIView):
    def post(self, request):
        respose = Response()
        respose.delete_cookie('jwt')
        respose.data = {
            'message': 'success'
        }
        return respose


class PersionApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        persionList=Person.objects.all().order_by('-created')[:10]
        serializer=PersonSerializerDepth(persionList,many=True)
        return Response(serializer.data)

    def post(selt, request):
        name = request.data['name']
        fatherName = request.data['fatherName']
        nid = request.data['nid']
        tinNumber = request.data['tinNumber']
        podok = request.data['podok']
        child=request.data['child']
        start = request.data['start']
        end = request.data['end']
        # print(child)
        uidG = str(uuid.uuid4())
        chek = 1
        if not name:
            chek += 1
            name = uidG

        if not fatherName:
            chek += 1
            fatherName = uidG

        if not nid:
            chek += 1
            nid = uidG

        if not tinNumber:
            chek += 1
            tinNumber = uidG

        print(chek)
        if not end:
            end = datetime.date.today() + datetime.timedelta(days=1)

        if not start:
            start = datetime.date.today() - datetime.timedelta(days=50*365)
        # print(start,end)
        if chek == 5 and podok:
            podokList = Person_Podok.objects.filter(
                Q(podok_id=int(podok)) &Q(child=int(child)) & Q(podokdate__range=(start, end)))
            # print(podokList)
            aRR = []
            for pL in podokList:
                # print(pL.person_id)
                aRR.append(pL.person_id)

            personList = Person.objects.filter(Q(id__in=aRR)).order_by('id')
            # print(personList)
            serializer = PersonSerializerDepth(personList, many=True)

            return Response(serializer.data)

        if podok:
            podokList = Person_Podok.objects.filter(
                Q(podok_id=int(podok)) & Q(podokdate__range=(start, end)))
            # print(podokList)
            aRR = []
            for pL in podokList:
                # print(pL.person_id)
                aRR.append(pL.person_id)
            # print(aRR)
            personList = Person.objects.filter(Q(id__in=aRR)
                                               &
                                               (Q(name__contains=name)
                                               | Q(fatherName__contains=fatherName)
                                               | Q(nid__contains=nid)
                                                | Q(tinNumber__contains=tinNumber))).order_by('id')
            # print(personList)
            serializer = PersonSerializerDepth(personList, many=True)

            return Response(serializer.data)

        persons = Person.objects.filter((Q(name__contains=name)
                                         | Q(fatherName__contains=fatherName)
                                         | Q(nid__contains=nid)
                                         | Q(tinNumber__contains=tinNumber)))

        serializer = PersonSerializerDepth(persons, many=True)

        return Response(serializer.data)


class AddPersonApiView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):

        data = request.data
        datadic = makeDictionary(data)
        # print(datadic)
        serializer = PersonSerializer(data=datadic)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        # print(request.data)
        return Response(serializer.data)

    def put(self, request):
        data = request.data
        datadic = makeUpdateDictionary(data)
        person = Person.objects.get(pk=int(data['id']))

        serializer = PersonSerializer(person, data=datadic)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class AddReportApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        serializer = ReportSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # print(request.data)
        return Response(serializer.data)


class getReportApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        data = request.data['title']
        catagory = request.data['catagory']
       
        if not data:
           Rdata = Report.objects.filter(Q(doron__contains=catagory)).order_by('-created')[:10]
        else:
            Rdata = Report.objects.filter(Q(doron__contains=catagory) & (Q(title__contains=data)
                                     | Q(body__contains=data)))

        serializer = ReportSerializer(Rdata, many=True)

        return Response(serializer.data)

    def put(self, request):
        print(request.data)
        pass


class PodokNameApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = PodokName.objects.all()
        serializer = PodokNameSerializer(data, many=True)

        return Response(serializer.data)

    def post(self, request):
        title = request.data['title']
        ins = PodokName.objects.create(title=title)

        res = {
            "mess": 'Added succesfully',
            "add": True,
            "id": ins.pk
        }

        return Response(res)

    def put(self, request):
        id = request.data['id']
        person_podok = Person_Podok.objects.filter(podok_id=id)
        res = {
            "mess": 'Delete succesfully',
            "del": True,
            "id": id
        }
        if person_podok.exists():
            res['mess'] = 'You can not delete this podok'
            res['del'] = False
            return Response(res)

        ins = PodokName.objects.get(pk=id)
        ins.delete()
        # data = PodokName.objects.all()
        # serializer = PodokNameSerializer(data, many=True)

        return Response(res)

class AddSubCatagoryApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        id=request.data['id']
        title = request.data['title']
        ins = PodokChildName.objects.create(podokname_id=id,title=title)

        res = {
            "mess": 'Added succesfully',
            "add": True,
            "id": ins.pk
        }

        return Response(res)
        
    
class PodokUpdateApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        id = request.data['id']
        podok = request.data['podok']
        child=request.data['child']
        podokdate = request.data['podokdate']
        ins = Person_Podok.objects.create(person_id=int(
            id), podok_id=int(podok),child=int(child), podokdate=podokdate)
        serilizer = Person_PodokSerializer(ins, many=False)
        # print(ins)
        return Response(serilizer.data)


class ChildPodokNameApiView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        id = request.data['id']
        obj=PodokChildName.objects.filter(podokname_id=id)
        serilizer = ChildPodokNameSerializer(obj, many=True)
       
        return Response(serilizer.data)



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['is_superuser']=user.is_superuser
        token['is_adminuser']=user.is_admin
        token['is_staff']=user.is_staff
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class DoronNameApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = DohoronName.objects.all()
        serializer = DoronNameSerializer(data, many=True)

        return Response(serializer.data)


class GenerateReportApiView(APIView):
    permission_classes = [IsAuthenticated]
   
    def get(self,request):
        totalpodok=Person.objects.count()
        data= PodokName.objects.annotate(
            total_count=Count('person_podok')).order_by('-total_count')
        serializer1 = PodokNameCountSerializer(data,many=True)
        
        reportdata=Report.objects.values('doron').annotate(Count('doron'))
        serializer2= ReportCountSerializer(reportdata,many=True)
        data={
            'totalpodok':totalpodok,
            'data':serializer1.data,
            'reportData':serializer2.data
        }
    
        return Response(data)
    
class ExistsNidApiView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        nid=request.data['nid']
        nidBool=Person.objects.filter(nid=nid).exists()
        return Response({'nid':nidBool})
           
    
 
class ExistsTinApiView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        tin=request.data['tinNumber']
        tinBool=Person.objects.filter(tinNumber=tin).exists()
        return Response({'tin':tinBool})
           


from wsgiref.util import FileWrapper
import mimetypes
from django.http import HttpResponse, Http404,StreamingHttpResponse
BASE_DIR= os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
class DownloadFileApiView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        pk=request.data['id']
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
                   
        
    
    
