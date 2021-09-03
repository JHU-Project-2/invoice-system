
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let menuText = document.getElementById("add-contact");
let menuText2 = document.getElementById("add-company");
let menuIcon = document.querySelector(".menu-icon");

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();//calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        menuText.classList.replace("menu-text show");
        menuText2.classList.replace("menu-text show");
        menuIcon.classList.replace("menu-icon hide bx bx-bolt-circle");
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
    } else {
        menuText.classList.replace("menu-text hide");
        menuText2.classList.replace("menu-text hide");
        menuIcon.classList.replace("menu-icon hide bx bx-bolt-circle");
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
    }
}
