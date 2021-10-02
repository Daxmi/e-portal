var uid;
//--> On auth change
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        uid= user.uid;
    } else {
        console.log("No user is signed in.")
    }
    //--> Get user's details from the real time DB
    getUserDetails()
});

    //--> Get user's details from the real time DB
function getUserDetails() {
    let firebaseRefKey = firebase.database().ref('users').child(uid);
    firebaseRefKey.on('value', (dataSnapShot)=>{
        const data = dataSnapShot.val();
        const name = data.userFirstName;
        const surName = data.userSurName
        const email = data.userEmail;
        const userDepartment = data.userDepartment;
        const userLevel = data.userLevel;
        _("firstName").innerHTML = name + " " + surName;
        _("dept").innerHTML = userDepartment;
        _("level").innerHTML = userLevel;
    })
}

const main = _("main");

let params = (new URL(document.location)).searchParams
const course_id = params.get("course_id")


let boy = firebase.database().ref('courses').child(course_id);

boy.on('value', (details)=>{
    const data = details.val();

    const {CourseTitle, YouTubeLink} = data; 
  
    const videoEl =document.createElement("div");
    videoEl.classList.add("videoClass");
    videoEl.innerHTML = `
    <div>
        ${YouTubeLink}
    </div>

    <h4>
        ${CourseTitle}
    </h4>
        `
        main.appendChild(videoEl)
})



function _(id) {
    return document.getElementById(id)
}
