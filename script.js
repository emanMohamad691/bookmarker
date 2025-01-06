var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var dataList = [];
var contentData = document.getElementById("contentData");
var pattern = /^https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-_~:/?#[\]@!$&'()*+,;=.]+$/i;
var trueIcon = document.getElementById("trueIcon");
var falseIcon = document.getElementById("falseIcon")
var trueUrlIcon = document.getElementById("trueUrlIcon");
var falseUrlIcon = document.getElementById("falseUrlIcon");


if(localStorage.getItem("data") !== null){
 
  dataList = JSON.parse( localStorage.getItem("data"));
  display(dataList)

}


function getAlert(){
    Swal.fire({
        
        html: `
         <section class="alert-style text-start ">
         <div class="d-flex justify-content-between  align-items-center mb-4">
            <div class="d-flex  ">
                <span class=" rounded-circle me-2 bg-danger"></span>
                <span class=" rounded-circle me-2 bg-warning"></span>
                <span class=" rounded-circle me-2 bg-success"></span>
            </div>
            <div class="colse-btn " onclick="closeAlert()">
              <i class="fa-solid fa-xmark "></i>
            </div>
        </div>
        <div class="caption">
            <h3 class=" mb-3">Site Name or Url is not valid, Please follow the rules below :</h3>

            <p class="mb-3"><i class="fa-solid fa-arrow-right  arrow-style text-danger"></i> 
                Site name must contain at least 3 characters</p>
            <p><i class="fa-solid fa-arrow-right  arrow-style text-danger "></i> 
                Site URL must be a valid one</p>
        </div>
    </section>
        `,
        showCloseButton: false,
        showConfirmButton: false,
      });
    
}

function getAlertInvalidName(){
  Swal.fire({
        
    html: `
     <section class="alert-style text-start ">
     <div class="d-flex justify-content-between  align-items-center mb-4">
        <div class="d-flex  ">
            <span class=" rounded-circle me-2 bg-danger"></span>
            <span class=" rounded-circle me-2 bg-warning"></span>
            <span class=" rounded-circle me-2 bg-success"></span>
        </div>
        <div class="colse-btn " onclick="closeAlert()">
          <i class="fa-solid fa-xmark "></i>
        </div>
    </div>
    <div class="caption">
            <h3 class=" mb-3">Site Name is not valid, Please follow the rules below :</h3>
        <p class="mb-3"><i class="fa-solid fa-arrow-right  arrow-style text-danger"></i> 
            Site name must contain at least 3 characters</p>
        
    </div>
</section>
    `,
    showCloseButton: false,
    showConfirmButton: false,
  });
}

function repeatName(){
  Swal.fire({
        
    html: `
     <section class="alert-style text-start ">
     <div class="d-flex justify-content-between  align-items-center mb-4">
        <div class="d-flex  ">
            <span class=" rounded-circle me-2 bg-danger"></span>
            <span class=" rounded-circle me-2 bg-warning"></span>
            <span class=" rounded-circle me-2 bg-success"></span>
        </div>
        <div class="colse-btn " onclick="closeAlert()">
          <i class="fa-solid fa-xmark "></i>
        </div>
    </div>
    <div class="caption">
        <p class="mb-3"><i class="fa-solid fa-arrow-right  arrow-style text-danger"></i> 
            Site name is already exist</p>
        
    </div>
</section>
    `,
    showCloseButton: false,
    showConfirmButton: false,
  });
}

function getAlertInvalidUrl(){
  Swal.fire({
        
    html: `
     <section class="alert-style text-start ">
     <div class="d-flex justify-content-between  align-items-center mb-4">
        <div class="d-flex  ">
            <span class=" rounded-circle me-2 bg-danger"></span>
            <span class=" rounded-circle me-2 bg-warning"></span>
            <span class=" rounded-circle me-2 bg-success"></span>
        </div>
        <div class="colse-btn " onclick="closeAlert()">
          <i class="fa-solid fa-xmark "></i>
        </div>
    </div>
    <div class="caption">
            <h3 class=" mb-3">Url is not valid, Please follow the rules below :</h3>
        <p><i class="fa-solid fa-arrow-right  arrow-style text-danger "></i> 
            Oops! That doesn’t look like a valid URL. Make sure it’s in the correct format (e.g., https://www.example.com)</p>
    </div>
</section>
    `,
    showCloseButton: false,
    showConfirmButton: false,
  });
}

function closeAlert(){
  Swal.close();
  
}

function styleNameInput(){
  if(!(siteName.value.length<3)){
    falseIcon.classList.add("d-none")
    trueIcon.classList.remove("d-none")
   trueIcon.classList.add("d-block")
   siteName.classList.add("border-true")
   siteName.classList.remove("border-false")
    
   
  }
  else{
    trueIcon.classList.add("d-none")
    falseIcon.classList.remove("d-none")
    falseIcon.classList.add("d-block")
    siteName.classList.add("border-false")
    siteName.classList.remove("border-true")
  }
  
}

function styleUrlInput(){
  if(pattern.test(siteUrl.value)){
    falseUrlIcon.classList.add("d-none")
    trueUrlIcon.classList.remove("d-none")
   trueUrlIcon.classList.add("d-block")
   siteUrl.classList.add("border-true")
   siteUrl.classList.remove("border-false")
    
   
  }
  else{
    trueUrlIcon.classList.add("d-none")
    falseUrlIcon.classList.remove("d-none")
    falseUrlIcon.classList.add("d-block")
    siteUrl.classList.add("border-false")
    siteUrl.classList.remove("border-true")
  }
  
}

function checkIfNameRepeat(){
  for(var i =0 ; i<dataList.length; i++){
      if(dataList[i].name.toLowerCase() === siteName.value.toLowerCase()){
      
        return true;
         
    }

   return false;
    
}
}

function addData(){

  var data = {
   
    name:siteName.value,
    sUrl:siteUrl.value
  }

  if(data.name === "" && data.sUrl === ""  ){
    getAlert()
  }
  else if(data.name === "" || data.name.length<3 ){
    getAlertInvalidName()
  }
 
  else if(data.sUrl === "" || !pattern.test(data.sUrl)){
    getAlertInvalidUrl()
  }
  else if(checkIfNameRepeat()){
    repeatName()
  }
 
  else{
    dataList.push(data);
    localStorage.setItem("data",JSON.stringify(dataList));
    display(dataList);
    console.log(dataList);
    clearData()
  }
  
  
}

function clearData(){
  siteName.value = null;
  siteUrl.value = null
  trueIcon.classList.remove("d-block");
  trueUrlIcon.classList.remove("d-block");
  trueIcon.classList.add("d-none");
  trueUrlIcon.classList.add("d-none");

}

function display(list){
  var box =''
  for(var i = 0; i<list.length;i++){
      box+=` <tr class="bg-white ">
                <td class="py-2">${i+1}</td>
                <td class="py-2">${list[i].name}</td>
                <td class="py-2"><button fs-6 fs-sm-0 onclick="visitSite('${list[i].sUrl}')"  class="btn btn-visit"><i class="fa-solid fa-eye fs-6"></i> Visit</button></td>
                <td class="py-2"><button fs-6 fs-sm-0 onclick="deleteData(${i})" class="btn btn-delete"><i class="fa-solid fa-trash-can fs-6"></i> Delete</button></td>
              </tr>
            `
  }

contentData.innerHTML=box;
}

function deleteData(index){

  dataList.splice(index,1);
  localStorage.setItem("data",JSON.stringify(dataList))
  display(dataList)
  

}

function visitSite(name){
open(name,'_blank')

}

