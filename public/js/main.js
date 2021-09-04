let logoutButton = document.querySelector(".loggin_out");
let darkLogo = document.querySelector(".dark-logo");

if (window.location.pathname === "/" || window.location.pathname === "/logout") {
    logoutButton.setAttribute("style", "color: white!important;")
} else {
    logoutButton.setAttribute("style", "color: black!important;")
};

if (window.location.pathname === "/") {
    darkLogo.setAttribute("style", "display: none;");
} else if (window.location.pathname === "/login") {
    darkLogo.setAttribute("style", "display: block; width: 30%; float: left; margin-left: 65vh; margin-top: 15vh;" )
} else if (window.location.pathname === "/dashboard/invoice/1" || window.location.pathname === "/dashboard/add-company") {
    darkLogo.setAttribute("style", "display: block; width: 10%; margin-top: 40vh;")
}

