// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx
function signIn(event) {
  event.preventDefault();
  let success = _q(".success");
  let btn = _q(".button");
  let userSIEmail = _("userSIEmail").value;
  let userSIPassword = _("userSIPassword").value;
  let emailError = _q(".validEmail");
  let passwordError = _q(".validPassword");

  let userSIEmailFormate =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkUserEmailValid = userSIEmail.match(userSIEmailFormate);

  if (checkUserEmailValid == null) {
    emailError.classList.add("displayError");
    setTimeout(function () {
      emailError.classList.remove("displayError");
    }, 2000);
  } else if (userSIPassword == "") {
    passwordError.classList.add("displayError");
    setTimeout(function () {
      passwordError.classList.remove("displayError");
    }, 2000);
  } else {
    btn.classList.add("buttonLoading");
    firebase
      .auth()
      .signInWithEmailAndPassword(userSIEmail, userSIPassword)
      .then((success) => {
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        let firebaseRefKey = firebase.database().ref("users").child(uid);
        firebaseRefKey.on("value", (dataSnapShot) => {
          const data = dataSnapShot.val();
          const type = data.type;
          if (type == "admin") {
            window.location.replace("adminDashboard.html");
          } else if (type == "student") {
            _("userSIEmail").value = "";
            _("userSIPassword").value = "";
            btn.classList.remove("buttonLoading");
            success.classList.remove("success");
            setTimeout(function () {
              success.classList.add("success");
            }, 3000);
          }
        });
      })
      .catch((error) => {
        _("userSIEmail").value = "";
        _("userSIPassword").value = "";
        btn.classList.remove("buttonLoading");
        success.classList.remove("success");
        setTimeout(function () {
          success.classList.add("success");
        }, 3000);
      });
  }
}

function _(id) {
  return document.getElementById(id);
}
function _q(id) {
  return document.querySelector(id);
}
