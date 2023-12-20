const upload = () => {
  var podok = document.getElementById(PODOK).value
  if (!podok) {
    alert('পদক বাছাই করুন')
    return
  }
  var name = document.getElementById(NAME).value
  var fatherName = document.getElementById(FATHERNAME).value
  var motherName = document.getElementById(MOTHERNAME).value
  var nid = document.getElementById(NID).value
  var tinNumber = document.getElementById(TINNUMBER).value

  console.log(name, fatherName, motherName, nid, tinNumber)

  const uploadFileEle = document.getElementById("fileInput")

  const file = uploadFileEle.files[0]

  const parmentAdd = document.getElementById(PARMENTADD).value
  const presentAdd = document.getElementById(PRESENTADD).value
  const birthPlace = document.getElementById(BIRTHPLACE).value
  const dateOfBirth = document.getElementById(DATEOFBIRTH).value
  const height = document.getElementById(HEIGHT).value
  const bodyColor = document.getElementById(BODYCOLOR).value
  const clue = document.getElementById(CLUE).value
  const religion = document.getElementById(RELIGION).value
  const mobile = document.getElementById(MOBILE).value
  const passport = document.getElementById(PASSPORT).value
  const education = document.getElementById(EDUCATION).value
  const family = document.getElementById(FAMILY).value
  const wealth = document.getElementById(WEALTH).value

  const profession = document.getElementById(PROFESSION).value
  const income = document.getElementById(INCOME).value
  const business = document.getElementById(BUSINESS).value
  const contribution = document.getElementById(CONTRIBUTION).value

  const politicalInfo = document.getElementById(POLITICALINFO).value
  const electionInfo = document.getElementById(ELECTIONINFO).value

  const mamlaInfo = document.getElementById(MAMLAINFO).value
  const sabotageInfo = document.getElementById(SABOTAGEINFO).value
  const arrestOrder = document.getElementById(ARRESTORDER).value
  const arrestInfo = document.getElementById(ARRESTINFO).value

  const corruptionInfo = document.getElementById(CORRUPTIONINFO).value
  const thanaRecord = document.getElementById(THANARECORD).value
  const influential = document.getElementById(INFLUENTIAL).value

  const evaluation = document.getElementById(EVALUATION).value


  let formData = new FormData();
  if (file)
    formData.append('picture', file);
  else
    formData.append('picture', null);

  formData.append(PODOK, podok);
  formData.append('name', name);
  formData.append('fatherName', fatherName);
  formData.append('motherName', motherName);
  formData.append('nid', nid);
  formData.append('tinNumber', tinNumber);
  //console.log('formdata',formData.getAll('nid'));


  formData.append(PARMENTADD, parmentAdd)
  formData.append(PRESENTADD, presentAdd)
  formData.append(BIRTHPLACE, birthPlace)
  formData.append(DATEOFBIRTH, dateOfBirth)

  formData.append(HEIGHT, height,)
  formData.append(BODYCOLOR, bodyColor)

  formData.append(CLUE, clue)
  formData.append(RELIGION, religion)

  formData.append(MOBILE, mobile)
  formData.append(PASSPORT, passport)

  formData.append(EDUCATION, education)
  formData.append(FAMILY, family)

  formData.append(WEALTH, wealth)
  formData.append(PROFESSION, profession)

  formData.append(INCOME, income)
  formData.append(BUSINESS, business)

  formData.append(CONTRIBUTION, contribution)
  formData.append(POLITICALINFO, politicalInfo)

  formData.append(ELECTIONINFO, electionInfo)
  formData.append(MAMLAINFO, mamlaInfo)

  formData.append(SABOTAGEINFO, sabotageInfo,)
  formData.append(ARRESTORDER, arrestOrder)

  formData.append(ARRESTINFO, arrestInfo)
  formData.append(CORRUPTIONINFO, corruptionInfo,)

  formData.append(THANARECORD, thanaRecord,)
  formData.append(INFLUENTIAL, influential)

  formData.append(EVALUATION, evaluation)




  var csrfToken = document.cookie.split('=')[1]

  axios.post(`${API_URL}/personAdd`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrfToken
    },
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`upload process: ${percentCompleted}%`);
    }
  })
    .then(res => {
      console.log(res.data)
      //  console.log(res.data.url)
      alert('succefully inserted')
    })
}


const searchItem = () => {

  var name = document.getElementById('s' + NAME).value
  var fatherName = document.getElementById('s' + FATHERNAME).value
  var nid = document.getElementById('s' + NID).value
  var tinNumber = document.getElementById('s' + TINNUMBER).value
  var podok = document.getElementById('s' + PODOK).value
  var start = document.getElementById('sstart').value
  var end = document.getElementById('send').value
  console.log(name, fatherName, nid, tinNumber, start, end, podok)

  var csrfToken = document.cookie.split('=')[1]
  var jsonData = {
    name: name,
    fatherName: fatherName,
    nid: nid,
    tinNumber: tinNumber,
    podok: podok,
    start: start,
    end: end
  }
  axios.post(`${API_URL}/person`,
    jsonData
    , {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`upload process: ${percentCompleted}%`);
      }
    })
    .then(res => {
      console.log('res', res.data)
      if (res.data.length != 0) {

        renderVerificationList(res.data)
        ReportData.Rptset = res.data
      }
      else {

        resetTable()
      }
    })
}



const renderTable = (data) => {

  var content = ``
  for (var i in data) {

    if (i == '0') {

      content += `
            <div class="tab-pane fade show active" id="nav-home-${i}" role="tabpanel" aria-labelledby="nav-home-tab-${i}" tabindex="0">
            `
      content += createTable(data[i])
      content += ` 
            </div>
          `
    } else {

      content += `
            <div class="tab-pane fade" id="nav-home-${i}" role="tabpanel" aria-labelledby="nav-home-tab-${i}" tabindex="0">
            `
      content += createTable(data[i])
      content += `
            </div>
          `
    }

  }

  var tap = ``
  for (var i in data) {
    if (i == '0') {
      tap += ` 
            <button class="nav-link active text-dark" id="nav-home-tab-${i}" data-bs-toggle="tab" data-bs-target="#nav-home-${i}" type="button" role="tab" aria-controls="nav-home-${i}" aria-selected="true">${i}</button>
              `
    } else {
      tap += ` 
            <button class="nav-link roboto-condensed text-dark" id="nav-home-tab-${i}" data-bs-toggle="tab" data-bs-target="#nav-home-${i}" type="button" role="tab" aria-controls="nav-home-${i}" aria-selected="true">${i}</button>
              `
    }

  }
  var displayResources = $("#nav-tabContent");
  //displayResources.html(string)
  displayResources.html(content)
  var displayResourcestap = $("#nav-tab");
  displayResourcestap.html(tap)
}
const resetTable = () => {
  var displayResources = $("#tableContent");
  const content = `
   <div class="mt-5 ml-5" id="">
   <h1 class="text-muted shadow p-5 roboto-condensed">404 data not found.</h1>
 </div>
   `
  displayResources.html(content)

  var displayResourcestap = $("#nav-tab");
  var tap = `<div>

  </div>`
  displayResourcestap.html(tap)

}

//for modal

const createTable = (data) => {
  const { picture, name, fatherName, motherName, nid, tinNumber, evaluation, professional, personal, political, mamla, person_Podok } = data
  // console.log(professional)
  var tableString = `
    <table class="table table-sm table-bordered roboto-condensed-300">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">বিবরণ</th>
        <th scope="col">মন্তব্য</th> 
       
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">0</th>
        <td>${df.picture}</td>
        <td>`
  if (picture)
    tableString += ` <img src="${picture}"
                    class="img-fluid" alt="Sample image"/>`
  else
    tableString += `Image not Found`



  tableString += `
        </td>
       
      </tr>

      <tr>
      <th rowspan="${person_Podok.length + 1}">১</th>
      <td rowspan="${person_Podok.length + 1}">${df.podok}</td>
      
    </tr>`


  for (let cj in person_Podok) {
    console.log(person_Podok[cj]?.podok?.title)
    tableString += `
    <tr>
    <td>${person_Podok[cj]?.podok?.title} [${person_Podok[cj]?.created.slice(0, 10)}]</td>   
</tr>`
  }

  tableString += `
      <tr>
        <th scope="row">২</th>
        <td>${df.name}</td>
        <td>${name}</td>
      
      </tr>
      <tr>
        <th scope="row">৩</th>
        <td>${df.fatherName}</td>
        <td>${fatherName}</td>
      
      </tr>
      <tr>
        <th scope="row">৪</th>
        <td>${df.motherName}</td>
        <td>${motherName}</td>
      
      </tr>
      <tr>
        <th scope="row">৫</th>
        <td>${df.nid}</td>
        <td>${nid}</td>
      
      </tr>
      <tr>
        <th scope="row">৬</th>
        <td>${df.tinNumber}</td>
        <td>${tinNumber}</td>
      
      </tr>
      <tr>
        <th scope="row">৭</th>
        <td>${df.parmentAdd}</td>
        <td>${personal[0]?.parmentAdd}</td>
      
      </tr>
      <tr>
        <th scope="row">৮</th>
        <td>${df.presentAdd}</td>
        <td>${personal[0]?.presentAdd}</td>
      
      </tr>
      <tr>
        <th scope="row">৯</th>
        <td>${df.dateOfBirth}</td>
        <td>${personal[0]?.dateOfBirth}</td>
      
      </tr>
      <tr>
        <th scope="row">১০</th>
        <td>${df.birthPlace}</td>
        <td>${personal[0]?.birthPlace}</td>
      
      </tr>
      <tr>
        <th scope="row">১১</th>
        <td>${df.height}</td>
        <td>${personal[0]?.height}</td>
      
      </tr>
      <tr>
        <th scope="row">১২</th>
        <td>${df.bodyColor}</td>
        <td>${personal[0]?.bodyColor}</td>
      
      </tr>
      <tr>
        <th scope="row">১৩</th>
        <td>${df.clue}</td>
        <td>${personal[0]?.clue}</td>
      
      </tr>
     
      <tr>
        <th scope="row">১৫</th>
        <td>${df.religion}</td>
        <td>${personal[0]?.religion}</td>
      
      </tr>
      <tr>
        <th scope="row">১৬</th>
        <td>${df.mobile}</td>
        <td>${personal[0]?.mobile}</td>
      
      </tr>
      <tr>
        <th scope="row">১৭</th>
        <td>${df.passport}</td>
        <td>${personal[0]?.passport}</td>
      
      </tr>
      <tr>
        <th scope="row">১৮</th>
        <td>${df.education}</td>
        <td>${personal[0]?.education}</td>
      
      </tr>
      <tr>
        <th scope="row">১৯</th>
        <td>${df.family}</td>
        <td>${personal[0]?.family}</td>
      
      </tr>
      <tr>
        <th scope="row">২০</th>
        <td>${df.profession}</td>
        <td>${professional[0]?.profession}</td>
      
      </tr>
      <tr>
        <th scope="row">২১</th>
        <td>${df.income}</td>
        <td>${professional[0]?.income}</td>
      
      </tr>
      <tr>
        <th scope="row">২২</th>
        <td>${df.business}</td>
        <td>${professional[0]?.business}</td>
      
      </tr>
      <tr>
        <th scope="row">২৩</th>
        <td>${df.politicalInfo}</td>
        <td>${political[0]?.politicalInfo}</td>
      
      </tr>
      <tr>
        <th scope="row">২৪</th>
        <td>${df.mamlaInfo}</td>
        <td>${mamla[0]?.mamlaInfo}</td>
      
      </tr>
      <tr>
        <th scope="row">২৫</th>
        <td>${df.sabotageInfo}</td>
        <td>${mamla[0]?.sabotageInfo}</td>
      
      </tr>
      <tr>
        <th scope="row">২৬</th>
        <td>${df.arrestOrder}</td>
        <td>${mamla[0]?.arrestOrder}</td>
      
      </tr>
      <tr>
        <th scope="row">২৭</th>
        <td>${df.arrestInfo}</td>
        <td>${mamla[0]?.arrestInfo}</td>
      
      </tr>
      <tr>
        <th scope="row">২৮</th>
        <td>${df.wealth}</td>
        <td>${personal[0]?.wealth}</td>
      
      </tr>
      <tr>
        <th scope="row">২৯</th>
        <td>${df.contribution}</td>
        <td>${professional[0]?.contribution}</td>
      
      </tr> 
      <tr>
        <th scope="row">৩০</th>
        <td>${df.electionInfo}</td>
        <td>${political[0]?.electionInfo}</td>
      
      </tr>
      <tr>
      <th scope="row">৩১</th>
      <td>${df.corruptionInfo}</td>
      <td>${mamla[0]?.corruptionInfo}</td>
    
    </tr>
    <tr>
    <th scope="row">৩২</th>
    <td>${df.thanaRecord}</td>
    <td>${mamla[0]?.thanaRecord}</td>
  
  </tr>
  <tr>
  <th scope="row">৩৩</th>
  <td>${df.influential}</td>
  <td>${mamla[0]?.influential}</td>

</tr>
<tr>
<th scope="row">৩৪</th>
<td>${df.evaluation}</td>
<td>${evaluation[0]?.evaluation}</td>

</tr>
  
    </tbody>
  </table>
    `
  return tableString
}


// reprot  goes here

const uploadReport = () => {
  var title = document.getElementById(TITLE).value
  var body = document.getElementById(BODY).value

  console.log(title, body)

  const uploadFileEle = document.getElementById("fileInput")

  const file = uploadFileEle.files[0]

  let formData = new FormData();
  if (file)
    formData.append('picture', file);
  else
    formData.append('picture', null);

  formData.append(TITLE, title)
  formData.append(BODY, body)


  var csrfToken = document.cookie.split('=')[1]

  axios.post(`${API_URL}/reportAdd`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrfToken
    },
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`upload process: ${percentCompleted}%`);
    }
  })
    .then(res => {
      console.log(res.data)
      //  console.log(res.data.url)
      alert('succefully inserted')
    })

}


const searchReportItem = () => {
  var name = document.getElementById(NAME).value

  var csrfToken = document.cookie.split('=')[1]
  var jsonData = {
    title: name,
  }
  axios.post(`${API_URL}/report_get`,
    jsonData
    , {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`upload process: ${percentCompleted}%`);
      }
    })
    .then(res => {
      console.log(res.data)
      renderReport(res.data)
      ReportData.Rptset = res.data
    })
}

const ReportData = {
  data: [],
  set Rptset(reprt) {
    this.data = reprt
  },
  get Rptget() {
    return this.data
  }
};

const renderReport = (data) => {

  // console.log('renderTable')
  var content = ``
  for (var i in data) {

    content += `
   <li class="list-group-item">
   <div class="card">
       <div class="card-body">
         <h5 class="card-title roboto-condensed">${data[i].title}</h5>
           <p class="card-text roboto-condensed-300">${data[i].body.slice(0, 300)}...</p>
          <a  onclick="rendersModal('${i}')" class="btn btn-primary btn-sm roboto-condensed-300 mr-5" data-toggle="modal" data-target="#exampleModalCenter">বিস্তারিত</a>
          <a  onclick="fileOpen('${i}')" class="btn btn-primary btn-sm roboto-condensed-300" data-toggle="modal" data-target="#exampleModalCenter">ডকুমেন্ট</a>
        
       </div>
     </div>
 </li>
 
   `

  }
  content += `<div id="mdal"></div>`

  var displayResources = $("#tableContent");
  //displayResources.html(string)
  displayResources.html(content)
  //rendersModal()

}
// report 
const rendersModal = (index) => {
  var rData = ReportData.Rptget
  let mDl = `
  <div class="modal  bd-example-modal-lg fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title roboto-condensed" id="exampleModalLongTitle"> ${rData[index].title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body roboto-condensed-300">
        ${rData[index].body}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary roboto-condensed-300" data-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
  `
  var displayResources = $("#mdal");
  //displayResources.html(string)
  displayResources.html(mDl)
}


const fileOpen = (index) => {
  var rData = ReportData.Rptget
  let mDl = `
  <div class="modal  bd-example-modal-lg fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title roboto-condensed" id="exampleModalLongTitle"> ${rData[index].title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <iframe
      src="https://www.google.com/search?q=%${URL}/${rData[index].picture}"
      frameBorder="0"
      scrolling="auto"
      height="500px"
      width="750px">

                 </iframe>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary roboto-condensed-300" data-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
  `
  var displayResources = $("#mdal");
  //displayResources.html(string)
  displayResources.html(mDl)
}






















const subMenu = (index) => {
  const ul = document.getElementById(index)
  let clsN = 'collapse'
  if (hasClass(ul, clsN)) {
    removeClass(ul, clsN)
  } else {
    addClass(ul, clsN)
  }
}

showorhideNav = (clue) => {
  let FULL = 'sidenav'
  let SM = 'sidenavClosed'

  const ul = document.getElementById('navHandler')
  if (clue == 'hideNav') {
    //  removeClass(ul,FULL)
    addClass(ul, SM)

  } else {

  }
}

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className);
  return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className))
    el.className += " " + className;
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
}


// show or hide nav




const renderVerificationList = (data) => {

  // console.log('renderTable')
  var content = ``
  for (var i in data) {
    const { picture } = data[i]

    content += `
    <li class="list-group-item">
    <div class="card">
        <div class="card-body">
        <div class="row">
        <div class="col-sm">
         `
    if (picture)
      content += ` <img src="${picture}"
                         class="img-fluid" alt="Sample image"/>`
    else
      content += `Image not Found`



    content += `
        </div>
        <div class="col-sm">
         `
    content += renderverificationTable(data[i])
    content += `
        </div>
        
        </div>
         `

    //  content+=renderverificationTable(data[i])
    content += `
           <a  onclick="rendersModalVerification('${i}')" class="btn btn-primary btn-sm roboto-condensed-300 mr-5" data-toggle="modal" data-target="#exampleModalCenter">বিস্তারিত</a>
           <a  onclick="rendersModalVerificationupdate('${i}')" class="btn btn-primary btn-sm roboto-condensed-300" data-toggle="modal" data-target="#exampleModalCenter">সম্পাদনা</a>
         
        </div>
      </div>
  </li> 
  
    `

  }
  content += `<div id="mdal"></div>`

  var displayResources = $("#tableContent");
  //displayResources.html(string)
  displayResources.html(content)
  //rendersModal()

}

const renderverificationTable = (data) => {

  const { name, fatherName, motherName, nid, tinNumber, evaluation, professional, personal, political, mamla, person_Podok } = data
  // console.log(professional)
  var tableString = `
    <table class="table table-sm  roboto-condensed-300">
    <tbody>

      <tr>
     
      <td rowspan="${person_Podok.length + 1}">${df.podok}</td>
      
    </tr>`


  for (let cj in person_Podok) {
    console.log(person_Podok[cj]?.podok?.title)
    tableString += `
    <tr>
    <td>${person_Podok[cj]?.podok?.title} [${person_Podok[cj]?.created.slice(0, 10)}]</td>   
</tr>`
  }

  tableString += `
      <tr>
      
        <td>${df.name}</td>
        <td>${name}</td>
      
      </tr>
      <tr>
     
        <td>${df.fatherName}</td>
        <td>${fatherName}</td>
      
      </tr>
      <tr>
      
        <td>${df.motherName}</td>
        <td>${motherName}</td>
      
      </tr>
      <tr>
       
        <td>${df.nid}</td>
        <td>${nid}</td>
      
      </tr>
      <tr>
        <td>${df.tinNumber}</td>
        <td>${tinNumber}</td>
      
      </tr>
  
    </tbody>
  </table>
    `
  return tableString


}

const rendersModalVerification = (index) => {
  var rData = ReportData.Rptget
  let mDl = `
  <div class="modal  bd-example-modal-lg fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false"> 
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title roboto-condensed" id="exampleModalLongTitle"> ${rData[index].name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body roboto-condensed-300">
        `
  mDl += createTable(rData[index])
  mDl += `
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary roboto-condensed-300" data-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
  `
  var displayResources = $("#mdal");
  //displayResources.html(string)
  displayResources.html(mDl)
}



const rendersModalVerificationupdate = (index) => {
  var rData = ReportData.Rptget
  var data = rData[index]
  const { name, fatherName, motherName, nid, tinNumber, evaluation, professional, personal, political, mamla, person_Podok } = data

  let mDl = `
  <div class="modal  bd-example-modal-lg fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false"> 
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title roboto-condensed" id="exampleModalLongTitle"> ${data.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body roboto-condensed-300">

      <div class="shadow-lg p-2">
      <p id="number">0</p>
      <form  id="financial">
       
        <div class="card-item-fs bg-light">
          <div class="col" >
            <a id="back" onclick="backItemupdate()" class="btn btn-primary roboto-condensed"  >back</a>
     
          </div>
          <div class="col">
            <a id="next" onclick="nextItemupdate()" class="btn btn-primary roboto-condensed" >next</a>
     
          </div>
        </div>
        <section>
      
          <div class="card-item-fs bg-light mt-2">
            <div class="col">
              <label for="podok" class="form-label col-form-label-sm">পদক বাছাই</label>
            </div>
            <div class="col" >
              <select  class="form-select" name="podokName" id="podokName">
                <option selected value="">পদক বাছাই করুন</option>
                
              </select>
              
            </div>
          </div>
  
        <div class="card-item-fs bg-light mt-2">
          <div class="col">
            <label for="formFile" class="form-label col-form-label-sm">ছবি আপলোড করুন</label>
          </div>
          <div class="col">
            <input id="fileInput" type="file" accept="image/*" />
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">নাম</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" id="name" name="name" value="${name}" />
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">বাবার নাম</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" id="fatherName" name="fatherName" value="${fatherName} " />
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">মাতার নাম</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" id="motherName" name="motherName" value="${motherName}" />
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">এনআইডি নাম্বার</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" id="nid" name="nid" value="${nid}" />
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">টিন নাম্বার</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" id="tinNumber" name="tinNumber" value="${tinNumber}" />
          </div>
        </div>
        </section>
        <section>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.parmentAdd}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder=""  id="parmentAdd" name="parmentAdd" >${personal[0]?.parmentAdd}</textarea>
          </div>
        </div>
  
       
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.presentAdd}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder=""  id="presentAdd" name="presentAdd">${personal[0]?.presentAdd}</textarea>
          </div>
        </div>
  
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.birthPlace}</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm"  placeholder="" id="birthPlace" name="birthPlace" value="${personal[0]?.birthPlace}" />
          </div>
        </div>
  
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.dateOfBirth}</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" placeholder="" id="dateOfBirth" name="dateOfBirth" value="${personal[0]?.dateOfBirth}" />
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
          <label for="validationDefault01" class="form-label col-form-label-sm">${df.height}</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" placeholder="" id="height" name="height" value="${personal[0]?.height}" />
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.bodyColor}</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" placeholder="" id="bodyColor" name="bodyColor" value="${personal[0]?.bodyColor}" />
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.clue}</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" placeholder="" id="clue" name="clue" value="${personal[0]?.clue}" />
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.religion}</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" placeholder="" id="religion" name="religion" value="${personal[0]?.religion}" />
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.mobile}</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" placeholder="" id="mobile" name="mobile" value="${personal[0]?.mobile}" />
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.passport}</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" placeholder="" id="passport" name="passport" value="${personal[0]?.passport}" />
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.education}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="education" name="education" >${personal[0]?.education}</textarea>
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.family}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="family" name="family" >${personal[0]?.family}</textarea>
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.wealth}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="wealth" name="wealth" >${personal[0]?.wealth}</textarea>
          </div>
        </div>
        </section>
        <section>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.profession}</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" placeholder="" id="profession" name="profession" value="${professional[0]?.profession}" />
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.income}</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" placeholder="" id="income" name="income" value="${professional[0]?.income}" />
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.business}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="business" name="business" >${professional[0]?.business}</textarea>
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.contribution}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="contribution" name="contribution" >${professional[0]?.contribution}</textarea>
          </div>
        </div>
        </section>
        <section>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm"> ${df.politicalInfo}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="politicalInfo" name="politicalInfo" >${political[0]?.politicalInfo}</textarea>
  
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.electionInfo}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="electionInfo" name="electionInfo" >${political[0]?.electionInfo}</textarea>
          </div>
        </div>
        </section>
        <section>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.mamlaInfo}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="mamlaInfo" name="mamlaInfo" >${mamla[0]?.mamlaInfo}</textarea>
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.sabotageInfo}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="sabotageInfo" name="sabotageInfo" >${mamla[0]?.sabotageInfo}</textarea>
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.arrestOrder}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="arrestOrder" name="arrestOrder" >${mamla[0]?.arrestOrder}</textarea>
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.arrestInfo}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="arrestInfo" name="arrestInfo" >${mamla[0]?.arrestInfo}</textarea>
          </div>
        </div>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.corruptionInfo}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="corruptionInfo" name="corruptionInfo" >${mamla[0]?.corruptionInfo}</textarea>
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.thanaRecord}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="thanaRecord" name="thanaRecord" >${mamla[0]?.thanaRecord}</textarea>
          </div>
        </div>
  
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.influential}</label>
          </div>
          <div class="col">
            <input type="text" class="form-control form-control-sm" placeholder="" id="influential" name="influential" value="${mamla[0]?.influential}" />
          </div>
        </div>
        </section>
        <section>
        <div class="card-item-fs mt-2 bg-light">
          <div class="col">
            <label for="validationDefault01" class="form-label col-form-label-sm">${df.evaluation}</label>
          </div>
          <div class="col">
            <textarea type="text" class="form-control form-control-sm" placeholder="" id="evaluation" name="evaluation" >${evaluation[0]?.evaluation}</textarea>
          </div>
          
        </div>
        
        
        </section>
     
  
       
      <div class="col mt-3">
        <a onclick="uploadUpdate(${index})" class="btn btn-primary roboto-condensed" type="submit">UPDATE</a>
      </div>
  
      </form>
    </div>
  



      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary roboto-condensed-300" data-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
  `
  var displayResources = $("#mdal");
  //displayResources.html(string)
  displayResources.html(mDl)
  initializeForm()
  getPodokName(person_Podok)
}

const getPodokName = (podokList) => {
  axios.get(`${API_URL}/podok_get`,
    {
      headers: {
        "Content-Type": "application/json",
        // "X-CSRFToken": csrfToken
      },
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`upload process: ${percentCompleted}%`);
      }
    })
    .then(res => {
      console.log(res.data, podokList)
      var data = res.data
      var content = ``
      for (let i in data) {
        content += `
      <option value="${data[i].id}">${data[i].title}</option>
      `
      }
      var disRs = $("#podokName");
      //displayResources.html(string)
      disRs.append(content)
    ///  document.getElementById('podokName').value = podokList[0]?.podok?.id
    })
}
var i = 0
var infoList = ['Info', "Parsonal", "Professional", "Political", "Mamla", "Evaluation"]

const initializeForm = () => {
  var backButton = document.getElementById("back");
  var nextButton = document.getElementById("next");
  var number = document.getElementById("number");



  var sections = document.getElementById('financial')
  var sectionArr = sections.getElementsByTagName('section')
  var lnOfSec = sectionArr.length

  number.innerHTML = infoList[0];
  for (var cj = 1; cj < lnOfSec; cj++) {
    addClass(sectionArr[cj], 'd-none')
  }
  addClass(backButton, 'd-none')

}

const sectionClassupdate = (index) => {

  var sections = document.getElementById('financial')
  var sectionArr = sections.getElementsByTagName('section')
  var lnOfSec = sectionArr.length

  for (var cj = 0; cj < lnOfSec; cj++) {
    if (cj === index) {
      removeClass(sectionArr[cj], 'd-none')
    } else {
      addClass(sectionArr[cj], 'd-none')
    }
  }
}

const nextItemupdate = () => {
  var backButton = document.getElementById("back");
  var nextButton = document.getElementById("next");
  var number = document.getElementById("number");

  var sections = document.getElementById('financial')
  var sectionArr = sections.getElementsByTagName('section')
  var lnOfSec = sectionArr.length

  i++;
  if (i == lnOfSec - 1) {
    addClass(nextButton, 'd-none')
  }
  removeClass(backButton, 'd-none')
  number.innerHTML = infoList[i];

  sectionClassupdate(i)

}

const backItemupdate = () => {
  var backButton = document.getElementById("back");
  var nextButton = document.getElementById("next");
  var number = document.getElementById("number");
  i--;
  if (i == 0) {
    addClass(backButton, 'd-none')
  }
  removeClass(nextButton, 'd-none')
  number.innerHTML = infoList[i];
  sectionClassupdate(i)


}

const uploadUpdate = (index) => {

  var rData = ReportData.Rptget
  var data = rData[index]
  console.log(data)

  var podok = document.getElementById('podokName').value




  var name = document.getElementById('name').value
  var fatherName = document.getElementById('fatherName').value
  var motherName = document.getElementById('motherName').value
  var nid = document.getElementById('nid').value
  var tinNumber = document.getElementById('tinNumber').value

  console.log(1, name, fatherName, motherName, nid, tinNumber)

  const uploadFileEle = document.getElementById("fileInput")

  const file = uploadFileEle.files[0]

  const parmentAdd = document.getElementById(PARMENTADD).value
  const presentAdd = document.getElementById(PRESENTADD).value
  const birthPlace = document.getElementById(BIRTHPLACE).value
  const dateOfBirth = document.getElementById(DATEOFBIRTH).value
  const height = document.getElementById(HEIGHT).value
  const bodyColor = document.getElementById(BODYCOLOR).value
  const clue = document.getElementById(CLUE).value
  const religion = document.getElementById(RELIGION).value
  const mobile = document.getElementById(MOBILE).value
  const passport = document.getElementById(PASSPORT).value
  const education = document.getElementById(EDUCATION).value
  const family = document.getElementById(FAMILY).value
  const wealth = document.getElementById(WEALTH).value

  const profession = document.getElementById(PROFESSION).value
  const income = document.getElementById(INCOME).value
  const business = document.getElementById(BUSINESS).value
  const contribution = document.getElementById(CONTRIBUTION).value

  const politicalInfo = document.getElementById(POLITICALINFO).value
  const electionInfo = document.getElementById(ELECTIONINFO).value

  const mamlaInfo = document.getElementById(MAMLAINFO).value
  const sabotageInfo = document.getElementById(SABOTAGEINFO).value
  const arrestOrder = document.getElementById(ARRESTORDER).value
  const arrestInfo = document.getElementById(ARRESTINFO).value

  const corruptionInfo = document.getElementById(CORRUPTIONINFO).value
  const thanaRecord = document.getElementById(THANARECORD).value
  const influential = document.getElementById(INFLUENTIAL).value

  const evaluation = document.getElementById(EVALUATION).value


  let formData = new FormData();
  if (file)
    formData.append('picture', file);
  else
    formData.append('picture', null);

  formData.append('podok', podok);
  formData.append('name', name);
  formData.append('fatherName', fatherName);
  formData.append('motherName', motherName);
  formData.append('nid', nid);
  formData.append('tinNumber', tinNumber);
  //console.log('formdata',formData.getAll('nid'));


  formData.append(PARMENTADD, parmentAdd)
  formData.append(PRESENTADD, presentAdd)
  formData.append(BIRTHPLACE, birthPlace)
  formData.append(DATEOFBIRTH, dateOfBirth)

  formData.append(HEIGHT, height,)
  formData.append(BODYCOLOR, bodyColor)

  formData.append(CLUE, clue)
  formData.append(RELIGION, religion)

  formData.append(MOBILE, mobile)
  formData.append(PASSPORT, passport)

  formData.append(EDUCATION, education)
  formData.append(FAMILY, family)

  formData.append(WEALTH, wealth)
  formData.append(PROFESSION, profession)

  formData.append(INCOME, income)
  formData.append(BUSINESS, business)

  formData.append(CONTRIBUTION, contribution)
  formData.append(POLITICALINFO, politicalInfo)

  formData.append(ELECTIONINFO, electionInfo)
  formData.append(MAMLAINFO, mamlaInfo)

  formData.append(SABOTAGEINFO, sabotageInfo,)
  formData.append(ARRESTORDER, arrestOrder)

  formData.append(ARRESTINFO, arrestInfo)
  formData.append(CORRUPTIONINFO, corruptionInfo,)

  formData.append(THANARECORD, thanaRecord,)
  formData.append(INFLUENTIAL, influential)

  formData.append(EVALUATION, evaluation)

  // assign id
  formData.append('id', data.id)
  formData.append('evaluationId', data.evaluation[0]?.id)
  formData.append('mamlaId', data.mamla[0]?.id)
  formData.append('personalId', data.personal[0]?.id)
  formData.append('politicalId', data.political[0]?.id)
  formData.append('professionalId', data.professional[0]?.id)
  // console.log(data.political)
  var csrfToken = document.cookie.split('=')[1]
  // console.log(csrfToken, formData.getAll('picture'))

  axios.put(`${API_URL}/personAdd`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrfToken
    },
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`upload process: ${percentCompleted}%`);
    }
  })
    .then(res => {
      // console.log(res.data)
      $('#exampleModalCenter').modal('toggle')
      delayManage()

    })
}

const delayManage = () => {
  var delayInMilliseconds = 1000; //1 second
  setTimeout(function () {
    searchItem()
  }, delayInMilliseconds);
}