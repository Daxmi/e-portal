let menu = document.getElementById("menu");
let left = document.querySelector(".asideLeft");
let close1 = document.querySelector(".dropDownContent");
let close2 = document.querySelector(".iProfile")
menu.addEventListener("click", ()=>{
    left.classList.add("show")
    menu.classList.add("noDisplay");
    console.log("boy");
})
left.addEventListener("click", ()=> {
    left.classList.remove("show")
    menu.classList.remove("noDisplay")
})
close2.addEventListener("click",()=> {
    close1.classList.toggle("displayError")
})