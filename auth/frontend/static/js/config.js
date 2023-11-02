
const URL=''
const API_URL=`${URL}/api`
const PODOK="podok"
const PODOKDATE='podokdate'
const NAME="name"
const FATHERNAME="fatherName"
const MOTHERNAME="motherName"
const NID="nid"
const TINNUMBER="tinNumber"
const PICTURE="picture"

const PARMENTADD="parmentAdd"
const PRESENTADD="presentAdd"
const BIRTHPLACE="birthPlace"
const DATEOFBIRTH="dateOfBirth"
const HEIGHT="height"
const BODYCOLOR="bodyColor"
const CLUE="clue"
const RELIGION="religion"
const MOBILE="mobile"
const PASSPORT="passport"
const EDUCATION="education"
const FAMILY="family"
const WEALTH="wealth"
const PROFESSION="profession"
const INCOME="income"
const BUSINESS="business"
const CONTRIBUTION="contribution"
const POLITICALINFO="politicalInfo"
const ELECTIONINFO="electionInfo"
const MAMLAINFO="mamlaInfo"
const SABOTAGEINFO="sabotageInfo"
const ARRESTORDER="arrestOrder"
const ARRESTINFO="arrestInfo"
const CORRUPTIONINFO="corruptionInfo"
const THANARECORD="thanaRecord"
const INFLUENTIAL="influential"
const EVALUATION="evaluation"



const df={
  "podok":"পদক",
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
  "bodyColor":"দেহ রং", 
  "clue":"সনাক্ত করন",
  "religion":"ধর্ম",
  "mobile":"টেলিফোন/মোবাইল নম্বর",
  "passport":"পাসপোর্ট নম্বর ও ইস্যুর তারিখ",
  "education":"শিক্ষাগত যোগ্যতা",
  "family":"পারিবারিক বৃত্তান্ত",
  "wealth":"সম্পদের বিবরন",
  "profession":`পেশাগত বৃত্তান্ত ( বর্তমানে কোন
      বেসরকারী , স্বায়ত্বশাসিত/আধ-সরকারী/
     ব্যবসায়িক প্রতিষ্ঠানে অথবা কোন
     সরকারী /আধা-সরকারী সামরিক
     বাহিনীর কর্মকর্তা হলে উল্লেখ পূর্বক
     বিবরন )`,
  "income":"বাৎসরিক আয়",
  "business":`ব্যবসায়িক প্রতিষ্ঠান (প্রযোজ্য ক্ষেত্রে
      ব্যবসা প্রতিষ্ঠানের  নাম ,পদবী ,অবস্থান   ও
      প্রকৃতি উল্লেখ  )`,
  "contribution":`শিল্প , সাহিত্য  , অর্থনীতিতে     ও   অন্যান্য
  অবদানের ক্ষেত্রে বিষেশ    অবদানের      জন্য   স্বীকৃতি /
  রাষ্ট্রীয় স্বীকৃতি`,
  "politicalInfo":`রাজনৈতিক বিবরন  (  ঐতিহাসিক     কোন
      জাতীয় আন্দোলনে   জড়িত   থাকলে    / কোন
      রাজনৈতিক কর্মকান্ডে       জড়িত   থাকলে
      তার বিবরন )`,
  "electionInfo":`নির্বাচন সংক্রান্ত তথ্যাবলী (অতীতের
      স্থানীয় সরকার /ছাত্র  সংসদ /জাতীয়
     সংসদ প্রভৃতি  নির্বাচনে   নির্বাচিত  হয়ে
     থাকলে পদবী ,সন   উল্লেখ   পূর্বক)`,
  "mamlaInfo":`মামলার বিবরন (সাজাপ্রাপ্ত  কিনা  ? /
  সাজাপ্রাপ্ত হলে পাঁচ  বৎসর    অতিক্রান্ত
  হয়েছে কিনা ?)`,
  "sabotageInfo":`চরমপান্থি ,    জঙ্গীবাদ  ,  রাষ্ট্রদ্রোহীবা
  নাশকতামূলক কর্মকান্ডে           জড়িত    থাকলে
  তার বিবরন`,
  "arrestOrder":"আটকাদেশ থাকলে তার বিবরন",
  "arrestInfo":"গ্রেফতার সম্পর্কিত তথ্য",
  "corruptionInfo":"দুর্নীতি সংক্রান্ত  তথ্যাদি",
  "thanaRecord":"থানা / ডিএসবির রেকর্ড",
  "influential":"স্থানীয় প্রভাব",
  "evaluation":"বিবিধ|মতামত",
  }

  const TITLE='title'
  const BODY='body'
