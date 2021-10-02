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
    const {CourseCode, Link, CourseTitle, YouTubeLink} = data; 
    
  
    const pdfClass =document.createElement("div");
    pdfClass.classList.add("pdfClass");
    pdfClass.innerHTML = `
        <div class="pdfText">
            <div class="courseDetailsPdf">
                <h5>
                    ${CourseTitle}
                </h5>
                <p>
                    ${CourseCode}
                </p>
            </div>
            <div class="courseLinkPdf" id="courseLinkPdf">
                <a href="${Link}#toolbar=0" target="_blank">View</a>
            </div>
        </div>
        `
    main.appendChild(pdfClass)
})



function _(id) {
    return document.getElementById(id)
}