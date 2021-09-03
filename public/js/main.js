let logoutButton = document.querySelector(".loggin_out");

if (window.location.pathname==="/") {
    logoutButton.setAttribute("style", "color: white!important;")
} else {
    logoutButton.setAttribute("style", "color: black!important;")
}