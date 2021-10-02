
var uid;
//--> On auth change
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        uid= user.uid;
        getUserDetails()
    } else {
        console.log("No user is signed in.")
    }
    //--> Get user's details from the real time DB
});
function getUserDetails() {
    let firebaseRefKey = firebase.database().ref('users').child(uid);
    firebaseRefKey.on('value', (dataSnapShot)=>{
        const data = dataSnapShot.val();
        const name = data.userFirstName;
        const surName = data.userSurName
        const userDepartment = data.userDepartment;
        const userLevel = data.userLevel;
        _("firstName").innerHTML = name + " " + surName;
        _("dept").innerHTML = userDepartment;
        _("level").innerHTML = userLevel;
    })
}

function saveProfile(event) {
    event.preventDefault()
    const success = _q(".success")
    let btn =_q(".button");
    let user = firebase.auth().currentUser;
    let uid;
    if(user){
        uid = user.uid
    }
    // get error class
    const firstnameError = _q(".firstName");
    const surNameError = _q(".surName");
    const levelError = _q(".level");
    const deptError = _q(".dept");


    const userpFirstName = _("pfirstname").value; 
    const userpSurName = _("psurname").value
    const userpLevel = _("plevel").value
    const userpdepartment = _("pdepartment").value
    
    var userpFirstNameFormate = /^([A-Za-z.\s_-])/; 
    var userpSurNameFormate = /^([A-Za-z.\s_-])/;         

    var checkUserpFirstNameValid = userpFirstName.match(userpFirstNameFormate);
    var checkUserpSurNameValid  = userpSurName.match(userpSurNameFormate)
    
    if(checkUserpFirstNameValid == null){
        firstnameError.classList.add("displayError")
        setTimeout(function () {
            firstnameError.classList.remove("displayError");
        },2000)
    }else if (checkUserpSurNameValid == null) {
        surNameError.classList.add("displayError")
        setTimeout(function () {
            surNameError.classList.remove("displayError");
        },2000)
    }else if (userpdepartment == ""){
        deptError.classList.add("displayError")
        setTimeout(function () {
            deptError.classList.remove("displayError");
        },2000)
    }else if(userpLevel == ""){
        levelError.classList.add("displayError")
        setTimeout(function () {
            levelError.classList.remove("displayError");
        },2000)
    }else {
        btn.classList.add("buttonLoading");
        const userpData = {
            userFirstName: userpFirstName,
            userSurName: userpSurName,
            userLevel: userpLevel,
            userDepartment: userpdepartment
        }
    
        let firebaseRefKey = firebase.database().ref('users').child(uid);
        let auth = firebase.auth();
        firebaseRefKey.set(userpData).then(() => {
            success.classList.add("displayError");
            setTimeout(function(){
                window.location.replace("dashboard.html")
            }, 2000)
        }).catch(e=>console.log(e))
    }
}

function cancelProfile(event) {
    event.preventDefault();
    let btn1 =_q(".buttonCancel");
    btn1.classList.add("buttonLoading");
    setTimeout(function(){
        window.location.replace("dashboard.html")
    }, 1000)
    
}

function _(id) {
    return document.getElementById(id);
}
function _q(id) {
    return document.querySelector(id);
}