let logoutButton = document.querySelector(".loggin_out");

if (window.location.pathname === "/" || window.location.pathname === "/logout") {
    logoutButton.setAttribute("style", "color: white!important;")
} else {
    logoutButton.setAttribute("style", "color: black!important;")
}