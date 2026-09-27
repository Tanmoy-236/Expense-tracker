const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

mobileMenuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("show");
});

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("show");
    });
});

const demoBtn = document.getElementById("demoBtn");
const demoModal = document.getElementById("demoModal");
const closeModal = document.getElementById("closeModal");
const modalButton = document.getElementById("modalButton");

demoBtn.addEventListener("click", function () {
    demoModal.classList.add("show");
});

closeModal.addEventListener("click", function () {
    demoModal.classList.remove("show");
});

modalButton.addEventListener("click", function () {
    demoModal.classList.remove("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

demoModal.addEventListener("click", function (event) {
    if (event.target === demoModal) {
        demoModal.classList.remove("show");
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        demoModal.classList.remove("show");
        navMenu.classList.remove("show");
    }
});

window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 100;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});

function openLogin() {
    // Login should replace the landing page so a signed-in user cannot
    // return to it through the normal Back button.
    window.location.replace("login.html");
}

function openSignup() {
    // Get Started is a normal navigation. The visitor should be able
    // to return to the landing page until they actually log in.
    window.location.href = "signup.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const getStartedButton = document.getElementById("getStartedButton");
    const getStartedActions = document.querySelectorAll(".get-started-action");

    if (loginButton) {
        loginButton.addEventListener("click", openLogin);
    }

    if (getStartedButton) {
        getStartedButton.addEventListener("click", openSignup);
    }

    getStartedActions.forEach(function (button) {
        button.addEventListener("click", openSignup);
    });
});