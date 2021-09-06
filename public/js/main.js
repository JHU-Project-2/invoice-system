let logoutButton = document.querySelector(".loggin_out");
let main = document.querySelector('.main')


if (!window.location.pathname === "/" || !window.location.pathname === "/logout") {
    main.setAttribute('style', 'margin-left: 0px!important;')

}

if (window.location.pathname === "/" || window.location.pathname === "/logout") {
    logoutButton.setAttribute("style", "color: white!important;")

} else {
    logoutButton.setAttribute("style", "color: black!important;")
};

