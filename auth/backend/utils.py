from .models import PodokName,DohoronName
def makeDictionary(data):
    # print(data['picture'])
    makedic = {
        'name': data['name'],
        'fatherName': data['fatherName'],
        'motherName': data['motherName'],
        'nid': data['nid'],
        'tinNumber': data['tinNumber'],
        'evaluation': [
            {
                'evaluation': data['evaluation']
            }
        ],
        'personal': [{
            'parmentAdd': data['parmentAdd'],
            'presentAdd':data['presentAdd'],
            'birthPlace':data['birthPlace'],
            'dateOfBirth':data['dateOfBirth'],
            'height':data['height'],
            'bodyColor':data['bodyColor'],
            'clue':data['clue'],
            'religion':data['religion'],
            'mobile':data['mobile'],
            'passport':data['passport'],
            'education':data['education'],
            'family':data['family'],
            'wealth':data['wealth']
        }
        ],
        'professional': [
            {'profession': data['profession'],
             'income':data['income'],
             'business':data['business'],
             'contribution':data['contribution']
             }
        ],
        'political': [{
            'politicalInfo': data['politicalInfo'],
            'electionInfo':data['electionInfo'],
        }],
        'mamla': [
            {
                'mamlaInfo': data['mamlaInfo'],
                'sabotageInfo':data['sabotageInfo'],
                'arrestOrder':data['arrestOrder'],
                'arrestInfo':data['arrestInfo'],
                'corruptionInfo':data['corruptionInfo'],
                'thanaRecord':data['thanaRecord'],
                'influential':data['influential'],


            }
        ],
        "person_Podok": [
            {
                "podok": int(data['podok']),
                "child": int(data['child']),
                "podokdate":data['podokdate']
            }
        ]


    }
    if data['picture'] != 'null':
        makedic['picture'] = data['picture']

    return makedic

def fieldDic():
    podokList=PodokName.objects.all()
    df={
  "podokdate":'পদক গ্রহণের সাল',
  "name":"নাম/ডাক নাম",
  "fatherName":"পিতার নাম",
  "motherName":"মাতার নাম",
  "nid":" জাতীয় পরিচয়পত্র",
  "tinNumber":"টিআইএন নম্বর",
  "picture":"ছবি",
  "parmentAdd":"স্থায়ী ঠিকানা",
  "presentAdd":"বর্তমান ঠিকানা",
  "birthPlace":"জন্মস্থান",
  "dateOfBirth":"জন্ম তারিখ ",
  "height":"উচ্চতা", 
  "bodyColor":"গায়ের রং",
  "clue":"সনাক্ত করন",
  "religion":"ধর্ম",
  "mobile":"টেলিফোন/মোবাইল নম্বর",
  "passport":"পাসপোর্ট নম্বর ও ইস্যুর তারিখ",
  "education":"শিক্ষাগত যোগ্যতা",
  "family":"পারিবারিক বৃত্তান্ত",
  "wealth":"সম্পদের বিবরন",
  "profession":"""পেশাগত বৃত্তান্ত ( বর্তমানে কোন
      বেসরকারী , স্বায়ত্বশাসিত/আধ-সরকারী/
     ব্যবসায়িক প্রতিষ্ঠানে অথবা কোন
     সরকারী /আধা-সরকারী সামরিক
     বাহিনীর কর্মকর্তা হলে উল্লেখ পূর্বক
     বিবরন )""",
  "income":"বাৎসরিক আয়",
  "business":"""ব্যবসায়িক প্রতিষ্ঠান (প্রযোজ্য ক্ষেত্রে
      ব্যবসা প্রতিষ্ঠানের  নাম ,পদবী ,অবস্থান   ও
      প্রকৃতি উল্লেখ  )""",
  "contribution":"""শিল্প , সাহিত্য  , অর্থনীতিতে     ও   অন্যান্য
  অবদানের ক্ষেত্রে বিষেশ    অবদানের      জন্য   স্বীকৃতি /
  রাষ্ট্রীয় স্বীকৃতি""",
  "politicalInfo":"""রাজনৈতিক বিবরন  (  ঐতিহাসিক     কোন
      জাতীয় আন্দোলনে   জড়িত   থাকলে    / কোন
      রাজনৈতিক কর্মকান্ডে       জড়িত   থাকলে
      তার বিবরন )""",
  "electionInfo":"""নির্বাচন সংক্রান্ত তথ্যাবলী (অতীতের
      স্থানীয় সরকার /ছাত্র  সংসদ /জাতীয়
     সংসদ প্রভৃতি  নির্বাচনে   নির্বাচিত  হয়ে
     থাকলে পদবী ,সন   উল্লেখ   পূর্বক)""",
  "mamlaInfo":"""মামলার বিবরন (সাজাপ্রাপ্ত  কিনা  ? /
  সাজাপ্রাপ্ত হলে পাঁচ  বৎসর    অতিক্রান্ত
  হয়েছে কিনা ?)""",
  "sabotageInfo":"""চরমপান্থি ,    জঙ্গীবাদ  ,  রাষ্ট্রদ্রোহীবা
  নাশকতামূলক কর্মকান্ডে           জড়িত    থাকলে
  তার বিবরন""",
  "arrestOrder":"আটকাদেশ থাকলে তার বিবরন",
  "arrestInfo":"গ্রেফতার সম্পর্কিত তথ্য",
  "corruptionInfo":"দুর্নীতি সংক্রান্ত  তথ্যাদি",
  "thanaRecord":"থানা / ডিএসবির রেকর্ড",
  "influential":"স্থানীয় প্রভাব",
  "evaluation":"বিবিধ|মতামত",
  'podokName': podokList,
  }
    return df



def makeUpdateDictionary(data):
    # print(data['picture'])
    makedic = {
        'id':int(data['id']),
        'name': data['name'],
        'fatherName': data['fatherName'],
        'motherName': data['motherName'],
        'nid': data['nid'],
        'tinNumber': data['tinNumber'],
        'evaluation': [
            {
                'id':data['evaluationId'],
                'evaluation': data['evaluation']
            }
        ],
        'personal': [{
            'id':data['personalId'],
            'parmentAdd': data['parmentAdd'],
            'presentAdd':data['presentAdd'],
            'birthPlace':data['birthPlace'],
            'dateOfBirth':data['dateOfBirth'],
            'height':data['height'],
            'bodyColor':data['bodyColor'],
            'clue':data['clue'],
            'religion':data['religion'],
            'mobile':data['mobile'],
            'passport':data['passport'],
            'education':data['education'],
            'family':data['family'],
            'wealth':data['wealth']
        }
        ],
        'professional': [
            {
                  'id':data['professionalId'],
                'profession': data['profession'],
             'income':data['income'],
             'business':data['business'],
             'contribution':data['contribution']
             }
        ],
        'political': [{
              'id':data['politicalId'],
            'politicalInfo': data['politicalInfo'],
            'electionInfo':data['electionInfo'],
        }],
        'mamla': [
            {
                'id':data['mamlaId'],
                'mamlaInfo': data['mamlaInfo'],
                'sabotageInfo':data['sabotageInfo'],
                'arrestOrder':data['arrestOrder'],
                'arrestInfo':data['arrestInfo'],
                'corruptionInfo':data['corruptionInfo'],
                'thanaRecord':data['thanaRecord'],
                'influential':data['influential'],


            }
        ],


    }
    if data['picture'] != 'null':
        makedic['picture'] = data['picture']
        
   
    return makedic


def functionE(**kwargs):
    for key, value in kwargs.items():
        return value
    
    
def makeRdic(data):
    makedic = {
        'doron':data['doron'],
        'title': data['title'],
        'body': data['body'],
        'file':data['file[]']
    } 
    
    print(data)
    return makedic
        
        
        
def DhoronList():
    dhrN=DohoronName.objects.all()
    return {
        'doronName':dhrN
    }        