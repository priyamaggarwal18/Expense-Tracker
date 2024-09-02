const mobileNavBtn = document.querySelector(".mobile-navbar-btn");
const header = document.querySelector(".header");
const links = document.querySelectorAll(".navbar-list li");

const toggleNavbar = () => {
    header.classList.toggle("active");
}

const removeNavbar = () => {
    header.classList.remove("active");
}

links.forEach(link => {
    link.addEventListener("click", removeNavbar);
});

mobileNavBtn.addEventListener("click", toggleNavbar);
