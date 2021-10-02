function signOut(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    e.preventDefault();
    console.log(target);

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.replace("index.html");
     
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
    alert(errorMessage)
    });
    
}