var uid;
//--> On auth change
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    uid = user.uid;
  } else {
    console.log("No user is signed in.");
  }
  //--> Get user's details from the real time DB
  getUserDetails();
});

//--> Get user's details from the real time DB
function getUserDetails() {
  let firebaseRefKey = firebase.database().ref("users").child(uid);
  firebaseRefKey.on("value", (dataSnapShot) => {
    const data = dataSnapShot.val();
    const name = data.userFirstName;
    const surName = data.userSurName;
    const email = data.userEmail;
    const userDepartment = data.userDepartment;
    const userLevel = data.userLevel;
    _("firstName").innerHTML = name + " " + surName;
    _("dept").innerHTML = userDepartment;
    _("level").innerHTML = userLevel;
    console.log(data);
    getCourses(data);
  });
}

//--> Get all videos
const main = _("courseLists");

function getCourses(userData) {
  main.innerHTML = "";
  let firebaseRefKeyVideo = firebase.database().ref("courses");
  firebaseRefKeyVideo.on("value", (dataSnapShot) => {
    const data = dataSnapShot.val();
    const myCourses = [];
    Object.entries(data).forEach(([key, eachCourse]) => {
      if (
        eachCourse.Department == userData.userDepartment &&
        eachCourse.Level == userData.userLevel
      ) {
        eachCourse.uid = key;
        myCourses.push(eachCourse);
      }
    });
    myCourses.forEach((course) => {
      console.log(course);
      const { CourseCode, CourseTitle, Description, uid } = course;

      const courseContainer = document.createElement("div");
      courseContainer.classList.add("courses");

      courseContainer.innerHTML = `
                <div class="image">
                    <img src="/img/e-learning-symbol-icon (2).jpg" alt="">
                </div>
                <div class="text">
                    <div class="courseDetails">
                        <h5>
                        ${CourseTitle}  ${CourseCode}
                        </h5>
                        <p>
                        ${Description}
                        </p>
                    </div>
                    <div class="courseLink" data-uid=${uid} id="courseLink">
                        <h6>
                            View Course
                        </h6>
                    </div>
                </div>
                `;
      main.appendChild(courseContainer);
    });
    let courses = document.querySelectorAll(".courseLink");
    console.log(courses);
    let asideRight = document.getElementById("asideRight");
    for (let i = 0; i < courses.length; i++) {
      courses[i].addEventListener("click", function () {
        let parentNode = this.parentNode;
        let course = parentNode.querySelector(".courseDetails").firstElementChild.textContent;
        
        let description = parentNode.querySelector(".courseDetails").firstElementChild.nextElementSibling.textContent;
        
        let uid = parentNode.querySelector("[data-uid]").dataset.uid;

        asideRight.classList.add("asideRight");
        let asideRightBottom = document.createElement("div");
        asideRightBottom.classList.add("asideRightBottom");

        asideRightBottom.innerHTML = `
            <div id="close" class="close">
            <i class="fas fa-chevron-left"></i><span>Back</span>
            </div>
            <div class="imageClass">
                <img src="/img/e-learning-symbol-icon (2).jpg" alt="images">
            </div>
            <div class="rightText">
                <p>
                    ${course}
                </p>
            </div>
            <div class="rightText">
            <p>
                ${description}
            </p>
        </div>
            <div class="courseDetailsLink">
                <div class="linkBox">
                <a href="viewvideo.html?course_id=${uid}">Watch Videos</a>
                </a>
                </div>
                <div class="linkBox">
                <a href="viewpdf.html?course_id=${uid}">Lesson Notes</a>
                </div>
            </div>
        `;
        if (asideRightBottom) {
          asideRight.innerHTML = "";
          asideRight.appendChild(asideRightBottom);
        } else {
          asideRight.appendChild(asideRightBottom);
        }

        let close = document.getElementById("close");
        close.addEventListener("click", () => {
          asideRight.classList.remove("asideRight");
          asideRight.removeChild(asideRightBottom);
        });
      });
    }
  });
}

function _(id) {
  return document.getElementById(id);
}
