from rest_framework import serializers

from backend.utils import functionE
from .models import PodokChildName, ReportFile, DohoronName, Person, Personal, Evaluation, Mamla, Professional, Political, Report, Person_Podok, PodokName


class ChildPodokNameSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(required=False)

    class Meta:
        model = PodokChildName
        fields = '__all__'

class DoronNameSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = DohoronName
        fields = '__all__'


class PodokNameSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = PodokName
        fields = '__all__'


class Person_PodokSerializerDepth(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Person_Podok
        fields = '__all__'
        read_only_fields = ("person",)

        depth = 1


class Person_PodokSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Person_Podok
        fields = '__all__'
        read_only_fields = ("person", )

        # depth=1


class MamlaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Mamla
        fields = '__all__'
        read_only_fields = ("person", )


class ProfessionalSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Professional
        fields = '__all__'
        read_only_fields = ("person", )


class PoliticalSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Political
        fields = '__all__'
        read_only_fields = ("person", )


class PersonalSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Personal
        fields = '__all__'
        read_only_fields = ("person", )


class EvaluationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Evaluation
        fields = '__all__'
        read_only_fields = ("person", )


class PersonSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)
    evaluation = EvaluationSerializer(many=True)
    personal = PersonalSerializer(many=True)
    professional = ProfessionalSerializer(many=True)
    political = PoliticalSerializer(many=True)
    mamla = MamlaSerializer(many=True)
    person_Podok = Person_PodokSerializer(many=True, required=False)

    class Meta:
        model = Person
        fields = '__all__'

    def create(self, validated_data):
        evaluation = validated_data.pop('evaluation')
        personal = validated_data.pop('personal')
        professional = validated_data.pop('professional')
        political = validated_data.pop('political')
        mamla = validated_data.pop('mamla')
        perPdk = validated_data.pop('person_Podok')
        isinstance = self.Meta.model(**validated_data)

        # isinstance=Person.objects.create(**validated_data)

        isinstance.save()

        for eva in evaluation:
            Evaluation.objects.create(person=isinstance, **eva)

        for per in personal:
            Personal.objects.create(person=isinstance, **per)

        for per in professional:
            Professional.objects.create(person=isinstance, **per)

        for per in political:
            Political.objects.create(person=isinstance, **per)

        for per in mamla:
            Mamla.objects.create(person=isinstance, **per)

        for per in perPdk:
            pdk = per.get('podok')
            pdkdate = per.get('podokdate')
            child=per.get('child')
            Person_Podok.objects.create(
                person=isinstance, podok=pdk,child=child, podokdate=pdkdate)

        return isinstance

    def update(self, instance, validated_data):

        evaluation = validated_data.pop('evaluation')
        personal = validated_data.pop('personal')
        professional = validated_data.pop('professional')
        political = validated_data.pop('political')
        mamla = validated_data.pop('mamla')

        instance.name = validated_data.get('name', instance.name)
        instance.motherName = validated_data.get(
            'motherName', instance.motherName)
        instance.fatherName = validated_data.get(
            'fatherName', instance.fatherName)
        instance.nid = validated_data.get('nid', instance.nid)
        instance.tinNumber = validated_data.get(
            'tinNumber', instance.tinNumber)
        instance.picture = validated_data.get('picture', instance.picture)
        instance.save()

        for eva in evaluation:
            id = eva.get('id')

            evinstance = Evaluation.objects.get(pk=id)
            evinstance.evaluation = eva.get('evaluation')
            evinstance.save()

        for per in personal:
            id = per.get('id')
            Personal.objects.filter(pk=id).update(**per)

        for per in professional:
            id = per.get('id')
            Professional.objects.filter(pk=id).update(**per)

        for per in political:
            id = per.get('id')
            Political.objects.filter(pk=id).update(**per)

        for per in mamla:
            id = per.get('id')
            Mamla.objects.filter(pk=id).update(**per)

        return instance


class PersonSerializerDepth(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)
    evaluation = EvaluationSerializer(many=True)
    personal = PersonalSerializer(many=True)
    professional = ProfessionalSerializer(many=True)
    political = PoliticalSerializer(many=True)
    mamla = MamlaSerializer(many=True)
    person_Podok = Person_PodokSerializerDepth(many=True)

    class Meta:
        model = Person
        fields = '__all__'


class ReportFileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = ReportFile
        fields = '__all__'
    

class ReportSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)
    user_report = ReportFileSerializer(many=True,read_only=True)
    uploaded_file=serializers.ListField(
        child=serializers.FileField(),
        write_only=True
    )
    class Meta:
        model = Report
        fields ='__all__'# ["id","doron","title","body","user_report","uploaded_file"]

    def create(self, validated_data):
        uploaded_file = validated_data.pop('uploaded_file')
        isinstance = Report.objects.create(**validated_data)
        
        for upload in uploaded_file:
            ReportFile.objects.create(file=isinstance, picture=upload)
            
        # isinstance.save()
 
        return isinstance

class PodokNameCountSerializer(serializers.ModelSerializer):
    total_count=serializers.IntegerField()
    class Meta:
        model=PodokName
        fields='__all__'
        
class ReportCountSerializer(serializers.ModelSerializer):
    doron__count=serializers.IntegerField()
    class Meta:
        model=Report
        fields='__all__'
    