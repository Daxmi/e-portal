// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function signUp(event){
    event.preventDefault()
    let btn =_q(".button");
    

    // Get all error class
    // let successful = _q(".success");
    let errorFirstName = _q(".errorFirstName");
    let errorSurName = _q(".errorSurName");
    let errorEmail = _q(".errorEmail");
    let errorPassword = _q(".errorPassword");
    let errorConfirmPassword = _q(".errorConfirmPassword");

    

    var user = firebase.auth().currentUser;
    var userFirstName = _("afirstname").value;
    var userSurName = _("asurname").value;
    var userEmail = _("aemail").value;
    var userPassword = _("apassword").value;
    var cUserPassword = _("acpassword").value;
    var type = "admin"


    var userFirstNameFormate = /^([A-Za-z.\s_-])/; 
    var userSurNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    

    var checkUserFirstNameValid = userFirstName.match(userFirstNameFormate);
    var checkUserSurNameValid  = userSurName.match(userSurNameFormate)
    var checkUserEmailValid = userEmail.match(userEmailFormate);
 

    if(checkUserFirstNameValid == null){
        errorFirstName.classList.add("displayError");
        setTimeout(function () {
            errorFirstName.classList.remove("displayError");
        },1000)
    }else if(checkUserSurNameValid == null){
        errorSurName.classList.add("displayError");
        setTimeout(function () {
            errorSurName.classList.remove("displayError");
        },1000)
    }else if(checkUserEmailValid == null){
        errorEmail.classList.add("displayError");
        setTimeout(function () {
            errorEmail.classList.remove("displayError");
        },1000)
    }else if(userPassword.length <6 ){
        errorPassword.classList.add("displayError");
        setTimeout(function () {
            errorPassword.classList.remove("displayError");
        },1000)
        
    }else if(userPassword !== cUserPassword){
        errorConfirmPassword.classList.add("displayError");
        setTimeout(function () {
            errorConfirmPassword.classList.remove("displayError");
        },1000)
    }else{
        btn.classList.add("buttonLoading");
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
                console.log(uid)
            }   
            var firebaseRef = firebase.database().ref("users");
            var userData = {
                userFirstName: userFirstName,
                userSurName: userSurName,
                userEmail: userEmail,
                userPassword: userPassword,
                type
            }
            
            firebaseRef.child(uid).set(userData).then(result=>{
                btn.classList.remove("buttonLoading");
                successful.classList.add("displayError");
                _("afirstname").value = "";
                _("asurname").value = "";
                _("aemail").value = "";
                _("apassword").value = "";
                _("acpassword").value = "";

                setTimeout(function () {
                    window.location.replace("./index.html")
                },2000)
            }).catch(e=>console.log(e));

        }).catch((error) => {
            console.log(error);
            });

        }
}

function _(id) {
    return document.getElementById(id);
}
function _q(id) {
    return document.querySelector(id);
}