const AUTH_KEY = "expenseTrackerAuth";

function getStoredAuth() {
    try {
        const localAuth = localStorage.getItem(AUTH_KEY);
        const sessionAuth = sessionStorage.getItem(AUTH_KEY);

        if (localAuth) return JSON.parse(localAuth);
        if (sessionAuth) return JSON.parse(sessionAuth);
    } catch (error) {
        console.error("Unable to read authentication state.", error);
    }

    return null;
}

function isAuthenticated() {
    return Boolean(getStoredAuth());
}

function saveAuthentication(user, rememberMe) {
    const authData = JSON.stringify({
        email: user.email,
        name: user.name || user.email.split("@")[0],
        loginAt: new Date().toISOString()
    });

    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);

    if (rememberMe) {
        localStorage.setItem(AUTH_KEY, authData);
    } else {
        sessionStorage.setItem(AUTH_KEY, authData);
    }
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY);

    // Replace the current app page so Back cannot return to the protected page.
    window.location.replace("index.html");
}

function goToDashboard() {
    // Replace the login page instead of adding another history entry.
    window.location.replace("dashboard.html");
}

if (document.body && document.body.dataset.protected === "true" && !isAuthenticated()) {
    window.location.replace("login.html");
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const passwordToggle = document.getElementById("passwordToggle");
    const loginSubmit = document.getElementById("loginSubmit");
    const loginStatus = document.getElementById("loginStatus");
    const forgotPassword = document.getElementById("forgotPassword");
    const googleLogin = document.getElementById("googleLogin");

    function clearError(input, errorElement) {
        input.closest(".input-wrap").classList.remove("invalid");
        errorElement.classList.remove("show");
    }

    function showError(input, errorElement, message) {
        input.closest(".input-wrap").classList.add("invalid");
        errorElement.querySelector("span").textContent = "!";
        errorElement.lastChild.textContent = " " + message;
        errorElement.classList.add("show");
    }

    emailInput.addEventListener("input", function () {
        clearError(emailInput, emailError);
    });

    passwordInput.addEventListener("input", function () {
        clearError(passwordInput, passwordError);
    });

    passwordToggle.addEventListener("click", function () {
        const showing = passwordInput.type === "text";
        passwordInput.type = showing ? "password" : "text";
        passwordToggle.textContent = showing ? "◉" : "◌";
        passwordToggle.setAttribute("aria-label", showing ? "Show password" : "Hide password");
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);
        loginStatus.textContent = "";

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        let valid = true;

        if (!email) {
            showError(emailInput, emailError, "Please enter your email.");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError(emailInput, emailError, "Please enter a valid email.");
            valid = false;
        }

        if (!password) {
            showError(passwordInput, passwordError, "Please enter your password.");
            valid = false;
        } else if (password.length < 6) {
            showError(passwordInput, passwordError, "Password must be at least 6 characters.");
            valid = false;
        }

        if (!valid) return;

        loginSubmit.disabled = true;
        loginSubmit.querySelector("span").textContent = "Logging in...";

        // Front-end prototype authentication:
        // the entered email is stored as the signed-in user.
        // A real production login should validate credentials on a server.
        setTimeout(function () {
            saveAuthentication({ email: email }, rememberMe.checked);
            goToDashboard();
        }, 350);
    });

    forgotPassword.addEventListener("click", function (event) {
        event.preventDefault();
        loginStatus.textContent = "Password reset will be connected when the backend is added.";
    });

    googleLogin.addEventListener("click", function () {
        loginStatus.textContent = "Google sign-in will be connected when OAuth is added.";
    });
});

window.ExpenseTrackerAuth = {
    isAuthenticated,
    getStoredAuth,
    saveAuthentication,
    logout
};