// const listContainer = document.querySelector(".list-container");
// const userId = document.querySelector(".Id-input");
// const username = document.querySelector(".username-input");
// const submitButton = document.querySelector('.btn-user-submit');
// // const recordDeleteButton = document.querySelector('.delete-btn');

// let buttonId=0;

// //Event handling
// submitButton.addEventListener('click', addTo);
// // listContainer.addEventListener('click', removeData);

// //Creating database
// let database = [];

// function removeData(e) {
//     const item = e.target;

//     // console.log(item.classList);
//     // if(item.classList[0] === 'delete-btn'){
//     //     console.log(database)
//     //     const itemDel = item.parentElement;
//     //
//     //     console.log("button id: ", item.id);
//     //     console.log("uniqueId: ", buttonId);
//     //
//     //     database.splice(parseInt(item.id)-1,1);
//     //     buttonId-=1;
//     //     item.id = parseInt(buttonId);
//     //     itemDel.remove();
//     // }

//     if(item.classList[0] === 'delete-btn'){
//         const itemDel = item.parentElement;

//         database = database.filter(obj=>{
//             if(parseInt(item.id) != obj.id){
//                 return true;
//             }
//             return false
//         })
//         buttonId-=1;
//         itemDel.remove();
//     }

//     console.log(database)

// }

// function creatingStructure(person,buttonId) {
//     // creating list structure
//     // creating div
//     const listDiv = document.createElement('div');
//     listDiv.classList.add('list');

//     // creating li
//     const newRecord = document.createElement('li');
//     newRecord.innerHTML = person.username;
//     newRecord.classList.add('list-item');
//     listDiv.appendChild(newRecord);

//     const username = document.createElement('div');
//     username.classList.add('username-container');


//     // check button
//     const recordButton = document.createElement('button');
//     recordButton.innerHTML = 'check';
//     recordButton.classList.add('complete-btn');
//     listDiv.appendChild(recordButton);

//     // delete button
//     const recordDeleteButton = document.createElement('button');
//     recordDeleteButton.innerHTML = 'delete';
//     recordDeleteButton.classList.add('delete-btn');
//     listDiv.appendChild(recordDeleteButton);

//     // Event handling
//     listContainer.addEventListener('click', removeData);

//     // append to list container
//     listContainer.appendChild(listDiv)

//     recordDeleteButton.setAttribute('id',buttonId);
//     // listDiv.setAttribute('id', buttonId);
//     // console.log(recordDeleteButton.id);
// }

// function addTo(event){
//     //Creating persons record
//     const person = new Object();
//     //Inserting value in database
//     person.id = buttonId+1;
//     person.username = username.value;
//     database.push(person);

//     // re-setting value of username
//     username.value="";
//     buttonId+=1;
//     creatingStructure(person,buttonId);
//     // buttonId+=1;

// }

const submitButton = document.querySelector('.submit');

const userNames = document.querySelector('#name');
let userName;
const userPhone = document.querySelector('#phone-no');
let userPhoneNo;
const userDob = document.querySelector('#date-of-birth');
const userEmail = document.querySelector('#emailId');
let userEmailId;
// const userEmailId = ValidateEmail(userEmail.value);

let buttonId=0;
let rowId=0;
let editFlag=false;
let editIndex;
let serialNo = 1;
let rowNo;


// events handling
submitButton.addEventListener('click', addTo);

let database = [];

// creating structure
function creatingStructure(personInfo,buttonId,serialNo){

    const removeButton = document.createElement('button');
    removeButton.innerHTML = "Delete";
    removeButton.setAttribute("class","btn btn-danger remove-btn")
    removeButton.setAttribute("id",buttonId);

    const editButton = document.createElement('button');
    editButton.innerHTML = "Edit";
    editButton.setAttribute("class","btn btn-primary edit-btn")
    editButton.setAttribute("id",buttonId);

    let table = document.getElementById('table');
    // let rowNo = database.length;
    // let rowNo = parseInt(buttonId)+1;

    // rowNo = parseInt(buttonId)+1;

    //only for updating rowNo
    const editBtnId = buttonId;
    const objectId = "person"+editBtnId;
    editIndex = editBtnId;
    rowNo = parseInt(database.findIndex(rank => rank.id === objectId))+1;
    //ending row

    let row = table.insertRow(rowNo);
    row.setAttribute("id","row"+buttonId);

    // rowId = parseInt(rowId)+1;
    // buttonId = parseInt(buttonId)+1;

    // console.log(rowId);
    console.log("row"+buttonId);

    //creating cell
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);
    let cell8 = row.insertCell(7);
    let cell9 = row.insertCell(8)

    cell1.innerHTML = serialNo;
    cell2.innerHTML = personInfo.name;
    cell3.innerHTML = personInfo.phoneNo;
    cell4.innerHTML = personInfo.age;
    cell5.innerHTML = personInfo.email
    cell6.innerHTML = personInfo.subject;
    cell7.innerHTML = personInfo.gender;
    cell8.appendChild(editButton);
    cell9.appendChild(removeButton);

    // console.log("buttonId: ",buttonId);
    // console.log("buttonId: ",rowId);

    // Adding event handlers for edit and delete buttons
    removeButton.addEventListener('click', deleteRow)
    editButton.addEventListener('click', editRow)
}

function editRow(e) {
    const editBtnId = e.target.id;
    const objectId = "person"+editBtnId;
    editIndex = editBtnId;
    const object = database[database.findIndex(rank => rank.id === objectId)]
    // console.log(object)

    settingValueOnPage(object)

    editFlag = true;
}

function settingValueOnPage(object) {
    userName.value = object.name;
    userPhoneNo.value = object.phoneNo;
    userDob.value = object.dob;
    userEmailId.value = object.email;

    document.querySelectorAll('input[name="gender"]').forEach( check => check.checked=false)
    document.querySelectorAll('input[name="subs"]').forEach( check => check.checked=false)

    const inputObjects = document.querySelectorAll("input[type=checkbox][name='subs']");
    // console.log(inputObjects);

    object.subject.forEach(ob => {
        inputObjects.forEach( element => {
            if(element.checked!=true && element.value == ob){
                element.checked=true;
            }
        })
    })

    // for(var i=0;i<object.subject.length;i++){
    //     inputObjects.forEach( element => {
    //         if(element.checked!=true && element.value == object.subject[i]){
    //             element.checked=true;
    //         }
    //         console.log("element: "+element.value);
    //         console.log("objects: "+object.subject[i])
    //     })
    // }

    const inputRadioObjects = document.querySelectorAll("input[type=radio][name='gender']");
    inputRadioObjects.forEach(elements => {
        if(elements.checked==false && elements.value==object.gender){
            elements.checked=true;
        }
    })
}

function deleteRow(e){
    settingValueToNull();

    const editBtnId = e.target.id;
    const objectId = "person"+editBtnId;
    editIndex = editBtnId;
    rowNo = parseInt(database.findIndex(rank => rank.id === objectId))+1;

    editFlag=false;
    // buttonId = parseInt(buttonId)-1;
    // rowNo = parseInt(rowNo)-1;
    console.log("delete is running")
    settingValueToNull();

    // const buttonId = e.target.id;
    // document.getElementById("row"+buttonId).remove()
    //
    // database = database.filter(obj=>{
    //     if("person"+buttonId != obj.id){
    //         return true;
    //     }
    //     return false
    // })

    let fetchbuttonId = e.target.id;

    document.getElementById("row"+fetchbuttonId).remove()

    database = database.filter(obj=>{
        if("person"+fetchbuttonId != obj.id){
            return true;
        }
        return false
    })

    updateSno(database);

}

// adding data in database
function addTo(e){

    e.preventDefault()

    if(validateGender()&&validateSubjects()&&validateDate()&&validateEmail(userEmail.value)&&ValidateUSPhoneNumber(userPhone.value) && ValidateName(userNames.value)){
        //EmailId validation
        // if(validateEmail(userEmail.value)){
        //     userEmailId = document.querySelector('#emailId');
        // }
        // else{
        //     alert("Wrong Email")
        // }
        //
        // //Phone no validation
        // if(ValidateUSPhoneNumber(userPhone.value)){
        //     userPhoneNo = document.querySelector('#phone-no');
        // }
        // else{ alert("Wrong phone number")}
        //
        // //Name Validation
        // if(ValidateName(userNames.value)){
        //     userName = document.querySelector('#name');
        // }
        // else alert("Wrong format for name")

        userEmailId = document.querySelector('#emailId');
        userPhoneNo = document.querySelector('#phone-no');
        userName = document.querySelector('#name');

        if(editFlag === false){
            firstSubmit()
        }
        else{
            editSubmit();
            editFlag=false;
        }
    }
    else{
        // if(editFlag === false){
        //     firstSubmit()
        // }
        // else{
        //     editSubmit();
        //     editFlag=false;
        // }

        userEmailId = document.querySelector('#emailId');


        if(validateSubjects()===false){
            alert('No subject selected');
        }

        if(validateGender()===false){
            alert('No gender selected');
        }

        // if(validateSubjects()){
        // }
        // else{alert('No subject selected');}

        if(validateEmail(userEmail.value)){
            userEmailId = document.querySelector('#emailId');
        }
        else{}

        if(validateDate()){
            // userDob = document.querySelector('#emailId');
        }
        else{}

        //Phone no validation
        if(ValidateUSPhoneNumber(userPhone.value)){
            userPhoneNo = document.querySelector('#phone-no');
        }
        else{ }

        //Name Validation
        if(ValidateName(userNames.value)){
            userName = document.querySelector('#name');
        }
        else{}
        // alert("Wrong format for name")
    }


    // userPhoneNo = document.querySelector('#phone-no');




}

function firstSubmit(){
    console.log("running first submit");
    const subjects = [];
    const checkboxes = document.querySelectorAll('input[name="subs"]:checked');
    for (var checkbox of checkboxes) {
        subjects.push(checkbox.value)
    }

    const userGender = document.querySelector('input[type=radio][name="gender"]:checked');

    const personInfo = new Object;
    personInfo.id = "person"+buttonId;
    personInfo.name = userName.value;
    personInfo.phoneNo = userPhoneNo.value;
    personInfo.dob =  userDob.value;
    personInfo.age =  calcAge(userDob.value);
    personInfo.email = userEmailId.value;
    personInfo.subject = subjects;
    personInfo.gender = userGender.value;

    database.push(personInfo);

    // console.log("personInfo: "+personInfo.id)
    creatingStructure(personInfo,buttonId,serialNo);
    serialNo = parseInt(serialNo)+1;
    rowId = parseInt(rowId)+1;
    buttonId = parseInt(buttonId)+1;

    // resetting value
    userName.value = "";
    userPhoneNo.value = "";
    userDob.value = "";
    userEmailId.value = "";
    document.querySelectorAll('input[name="gender"]').forEach( check => check.checked=false)
    document.querySelectorAll('input[name="subs"]').forEach( check => check.checked=false)
}

function editSubmit(){
    console.log("running edit submit");
    document.getElementById("row"+editIndex).remove();

    const subjects = [];
    const checkboxes = document.querySelectorAll('input[name="subs"]:checked');
    for (let checkbox of checkboxes) {
        subjects.push(checkbox.value)
    }

    const userGender = document.querySelector('input[type=radio][name="gender"]:checked');

    const personInfo = new Object;
    personInfo.id = "person"+editIndex;
    personInfo.name = userName.value;
    personInfo.phoneNo = userPhoneNo.value;
    personInfo.dob =  userDob.value;
    personInfo.age =  calcAge(userDob.value);
    personInfo.email = userEmailId.value;
    personInfo.subject = subjects;
    personInfo.gender = userGender.value;

    const editRowSerialNo = parseInt(editIndex)+1;

    creatingStructure(personInfo,editIndex,parseInt(editIndex)+1);
    // rowId = parseInt(rowId)+1;
    // buttonId = parseInt(buttonId)+1;

    database.findIndex(rank => rank.id === "person"+editIndex);

    database.splice(database.findIndex(rank => rank.id === "person"+editIndex),1,personInfo)


    // resetting value
    userName.value = "";
    userPhoneNo.value = "";
    userDob.value = "";
    userEmailId.value = "";
    document.querySelectorAll('input[name="gender"]').forEach( check => check.checked=false)
    document.querySelectorAll('input[name="subs"]').forEach( check => check.checked=false)

}

function calcAge(dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
}



// validation code below


function validateEmail(email)
{
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    // console.log(email);
    // console.log(regex.test(email));

    // return regex.test(email.trim());

    if(regex.test(email.trim())){
        userEmail.classList.add('success');
        if(userEmail.classList.contains('failed'))userEmail.classList.remove('failed');
        return regex.test(email.trim());
    }
    else{
        userEmail.classList.add('failed');
        if(userEmail.classList.contains('success'))userEmail.classList.remove('success') ;
    }
    // var re = /\S+@\S+\.\S+/;
    // return re.test(email);
}

function ValidateUSPhoneNumber(phoneNumber) {
    // let regex = new RegExp('^[7-9][0-9]{9}$')
    let regex = new RegExp('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[6789]\\d{9}$')
    // return regex.test(phoneNumber.trim())

    // userPhone
    if(regex.test(phoneNumber)){
        userPhone.classList.add('success');
        if(userPhone.classList.contains('failed'))userPhone.classList.remove('failed');
        return regex.test(phoneNumber.trim())
    }
    else{
        userPhone.classList.add('failed');
        if(userPhone.classList.contains('success'))userPhone.classList.remove('success')
    }

}

function ValidateName(name){
    let regex = new RegExp('^[a-zA-Z ]{2,30}$');
    console.log(name);
    console.log(regex.test(name));

    // const val = !regex;
    // return val;
    if(regex.test(name.trim())) {
        userNames.classList.add('success');
        document.querySelector('.name-valid').classList.add('is-name-valid')
        // userNames.classList.add('name-valid');
        if(userNames.classList.contains('failed')&&document.querySelector('.name-valid').classList.contains('is-name-valid')){
            userNames.classList.remove('failed');
            document.querySelector('.name-not-valid').classList.remove('is-name-not-valid')
            // document.querySelector('.name-valid').classList.remove('name-valid');
        }
        return regex.test(name.trim());
    } else {
        userNames.classList.add('failed');
        document.querySelector('.name-not-valid').classList.add('is-name-not-valid')
        if(userNames.classList.contains('success')&&document.querySelector('.name-valid').classList.contains('is-name-valid')){
            userNames.classList.remove('success');
            document.querySelector('.name-valid').classList.remove('is-name-valid');
        }
    }


    // let result = /^[a-zA-Z ]+$/.test( name);
    // return result;
}

function validateDate(){
    let g1 = new Date();
    // (YYYY-MM-DD)
    let g2 = new Date(userDob.value);

    if (g1.getTime() > g2.getTime()){
        userDob.classList.add('success');
        if(userDob.classList.contains('failed'))userDob.classList.remove('failed');
        return true;
    }
    else{
        userDob.classList.add('failed');
        if(userDob.classList.contains('success'))userDob.classList.remove('success');
    }
}

function setMaxDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    // today = mm + '-' + dd + '-' + yyyy;
    today = yyyy+'-'+mm+'-'+dd;
    userDob.setAttribute("max", today);
}
setMaxDate()

function validateGender(){
    let checkGenderCount=0;
    // let subjectArray = document.querySelectorAll("input[name='subs']")
    document.querySelectorAll('input[name="gender"]').forEach( gen =>{
        if(gen.checked===true) checkGenderCount = parseInt(checkGenderCount)+1;
    })

    if(checkGenderCount > 0){
        return true
    }
    else {return false}
}

function validateSubjects(){
    let checkCount=0;
    // let subjectArray = document.querySelectorAll("input[name='subs']")
    document.querySelectorAll('input[name="subs"]').forEach( check =>{
        if(check.checked===true) checkCount = parseInt(checkCount)+1;
    })

    if(checkCount > 0){
        return true
    }
    else {return false}
}


function settingValueToNull(){
    userName.value = "";
    userPhoneNo.value = "";
    userDob.value = "";
    userEmailId.value = "";
    document.querySelectorAll('input[name="gender"]').forEach( check => check.checked=false)
    document.querySelectorAll('input[name="subs"]').forEach( check => check.checked=false)
}

// function updateSno(databaseArray){
//     // let databaseLength = databaseArray.length
//     document.getElementById('#table').forE
//     serialNo=1;
//     databaseArray.forEach(obj => {
//         obj.id=serialNo;
//         serialNo = parseInt(serialNo)+1;
//     })
// }

document.getElementById('name').addEventListener('blur',()=>{
    // console.log('in listener');
   ValidateName(userNames.value);
});

document.getElementById('phone-no').addEventListener('blur',()=>{
    // console.log('in listener');
    ValidateUSPhoneNumber(userPhone.value);
});

document.getElementById('emailId').addEventListener('blur', ()=> validateEmail(userEmail.value))

document.getElementById('date-of-birth').addEventListener('blur', ()=> validateDate())