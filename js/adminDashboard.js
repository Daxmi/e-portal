// selecting all required elements
const dropArea = document.querySelector(".drag-area"),
  dropIcon = document.querySelector(".icon"),
  uploadName = document.querySelector(".uploadName"),
  button = dropArea.querySelector(".dragUpload"),
  input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions
button.onclick = () => {
  input.click(); //if user click on the button then the input also clicked
};
input.addEventListener("change", function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  console.log(file);
  dropArea.classList.add("active");
  showFile(); //calling function
});
//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
});
//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
});
//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  console.log(file);
  showFile(); //calling function
});

function showFile() {
  // let fileType = file.type; //getting selected file type
  // let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
  // if(validExtensions.includes(fileType)){ //if user selected file is an image file
  dropIcon.classList.add("error");
  let fileReader = new FileReader(); //creating new FileReader object
  fileReader.onload = () => {
    let fileURL = fileReader.result; //passing user file source in fileURL variable
    // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
    let imgTag = `<img src="${fileURL}" alt="image">`;
    let fileName = `<span> ${file.name}</span>`; //creating an img tag and passing user selected file source inside src attribute
    uploadName.innerHTML = fileName; //adding that created img tag inside dropArea container
  };
  fileReader.readAsDataURL(file);
  // }else{
  //   alert("This is not an Image File!");
  //   dropArea.classList.remove("active");
  //   dragText.textContent = "Drag & Drop to Upload File";
  // }
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function CreateCourse(event) {
  event.preventDefault();
  let success = document.querySelector(".success");
  let btn = document.querySelector(".button");
  let errorCourseTitle = document.querySelector(".courseTitleError");
  let errorCourseCode = document.querySelector(".courseCodeError");
  let errorVideo = document.querySelector(".videoError");
  let errorDept = document.querySelector(".deptError");
  let errorLevel = document.querySelector(".levelError");
  let errorDescription = document.querySelector(".descriptionError");

  var CourseTitle = _("courseTitle").value;
  var CourseCode = _("courseCode").value;
  var YouTubeLink = _("youTubeLink").value;
  var Department = _("adminDepartment").value;
  var Level = _("adminLevel").value;
  const Description = _("textDescription").value;
  if (CourseTitle == "") {
    errorCourseTitle.classList.add("displayError");
    setTimeout(function () {
      errorCourseTitle.classList.remove("displayError");
    }, 1000);
  } else if (CourseCode == "") {
    errorCourseCode.classList.add("displayError");
    setTimeout(function () {
      errorCourseCode.classList.remove("displayError");
    }, 1000);
  } else if (YouTubeLink == "") {
    errorVideo.classList.add("displayError");
    setTimeout(function () {
      errorVideo.classList.remove("displayError");
    }, 1000);
  } else if (Department == "") {
    errorDept.classList.add("displayError");
    setTimeout(function () {
      errorDept.classList.remove("displayError");
    }, 1000);
  } else if (Level == "") {
    errorLevel.classList.add("displayError");
    setTimeout(function () {
      errorLevel.classList.remove("displayError");
    }, 1000);
  } else if (Description == "") {
    errorDescription.classList.add("displayError");
    setTimeout(function () {
      errorDescription.classList.remove("displayError");
    }, 1000);
  } else {
    let file = _("pdfFile").files[0];
    var fileName = document.getElementById("pdfFile").value;
    var filesRef = firebase.storage().ref(file.name).put(file);

    btn.classList.add("buttonLoading");
    filesRef.then(() => {
      filesRef.snapshot.ref.getDownloadURL().then((url) => {
        var filesData = {
          CourseTitle: CourseTitle,
          CourseCode: CourseCode,
          Link: url,
          Department: Department,
          Level: Level,
          YouTubeLink: YouTubeLink,
          Name: fileName,
          Description: Description,
        };
        firebase
          .database()
          .ref("courses")
          .child(makeid(12))
          .set(filesData)
          .then(() => {
            btn.classList.remove("buttonLoading");
            _("courseTitle").value = "";
            _("courseCode").value = "";
            _("youTubeLink").value = "";
            _("pdfFile").value = "";
            _("adminDepartment").value = "";
            _("adminLevel").value = "";
            _("textDescription").value = "";
            dropIcon.classList.remove("error");
            uploadName.innerHTML = "";
            dropArea.classList.remove("active");
            success.classList.add("displayError");
            setTimeout(function () {
              success.classList.remove("displayError");
            }, 1000);
          });
      });
    });
  }
}

function count() {
  var total = document.getElementById("textDescription").value;
  total = total.replace(/\s/g, "");
  document.getElementById("total").innerHTML =
    "Characters remaining: " + (80 - total.length);
}

function _(id) {
  return document.getElementById(id);
}
function _v(id) {
  return document.getElementById(id).value;
}
