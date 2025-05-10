const menuIcon = document.querySelector("#menu");
const navMenu = document.querySelector("#nav-menu");

const toggleMenu = () => {
    navMenu.classList.toggle("active");
    menuIcon.innerHTML = navMenu.classList.contains("active") ? "&times;" : "☰";
};

menuIcon.onclick = e => {
    e.stopPropagation();
    toggleMenu();
};

document.onclick = e => {
    if (!menuIcon.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        menuIcon.innerHTML = "☰";
    }
};

navMenu.querySelectorAll(".list-link").forEach(link =>
    link.onclick = () => {
        navMenu.classList.remove("active");
        menuIcon.innerHTML = "☰";
    }
);

window.onscroll = () => {
    navMenu.classList.remove("active");
    menuIcon.innerHTML = "☰";
};

