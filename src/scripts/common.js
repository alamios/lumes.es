
var menus = document.getElementsByClassName("hamburger-menu")[0];
var burger = document.getElementsByClassName("hamburger")[0];
var burgerIcon = document.getElementsByClassName("fa-bars")[0];
var burgerCloseIcon = document.getElementsByClassName("fa-times")[0];
// doBreakpoint();

burger.addEventListener("click", function() {
    if ($(burgerCloseIcon).hasClass("hidden")) {
        showHamburgerMenu();
        event.stopPropagation();
    }
    else {
        hideHamburgerMenu();
    }
});

window.addEventListener("click", function() {
    if (!$(burgerCloseIcon).hasClass("hidden")) {
        hideHamburgerMenu();
    }
});

menus.addEventListener("click", function() {
    event.stopPropagation();
});

window.addEventListener("resize", function() {
    if (window.getComputedStyle(burger, null).getPropertyValue("display") == 'none') {
        hideHamburgerMenu();
    }
});

function changeLang(lang) {
    someutils.setCookie("lang", lang);
    location.reload();
}

function showHamburgerMenu() {
    $(menus).addClass("block");
    $(burgerIcon).addClass("hidden");
    $(burgerCloseIcon).removeClass("hidden");
}

function hideHamburgerMenu() {
    $(menus).removeClass("block");
    $(burgerIcon).removeClass("hidden");
    $(burgerCloseIcon).addClass("hidden");
}