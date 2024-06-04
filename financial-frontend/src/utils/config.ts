export const BACKEND_URL=!process.env.NODE_ENV || process.env.NODE_ENV === 'development'?'http://127.0.0.1:8000':'https://fims.specialbranch.gov.bd'
export const BACKEND_BASE=`${BACKEND_URL}/api`
export const PASSWORD_MIN_LENGTH=6

export const MilTMin=60000

export const PODOK="podok"
export const PODOKDATE='podokdate'
export const NAME="name"
export const FATHERNAME="fatherName"
export const MOTHERNAME="motherName"
export const NID="nid"
export const TINNUMBER="tinNumber"
export const PICTURE="picture"
export const PARMENTADD="parmentAdd"
export const PRESENTADD="presentAdd"
export const BIRTHPLACE="birthPlace"
export const DATEOFBIRTH="dateOfBirth"
export const HEIGHT="height"
export const BODYCOLOR="bodyColor"
export const CLUE="clue"
export const RELIGION="religion"
export const MOBILE="mobile"
export const PASSPORT="passport"
export const EDUCATION="education"
export const FAMILY="family"
export const WEALTH="wealth"
export const PROFESSION="profession"
export const INCOME="income"
export const BUSINESS="business"
export const CONTRIBUTION="contribution"
export const POLITICALINFO="politicalInfo"
export const ELECTIONINFO="electionInfo"
export const MAMLAINFO="mamlaInfo"
export const SABOTAGEINFO="sabotageInfo"
export const ARRESTORDER="arrestOrder"
export const ARRESTINFO="arrestInfo"
export const CORRUPTIONINFO="corruptionInfo"
export const THANARECORD="thanaRecord"
export const INFLUENTIAL="influential"
export const EVALUATION="evaluation"



export const NC={
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

  export const lineargradient='linear-gradient(90deg, #0e101d 0%, #19193b 35%, #363271 100%)'