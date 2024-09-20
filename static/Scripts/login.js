document.addEventListener("DOMContentLoaded", function () {
    const currentUsername = localStorage.getItem('currentUser');

    if (currentUsername) {
        window.location.href = 'dashboard.html';
        return;
    }

    class User {
        constructor(username, password) {
            this.username = username;
            this.password = password;
            this.transactions = [];
            this.income = 0;
            this.expense = 0;
        }

        static saveUser(user) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.some(u => u.username === user.username)) {
                console.error("User already exists.");
                return false;
            }

            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            return true;
        }

        static getUser(username) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            return users.find(user => user.username === username);
        }

        static validateLogin(username, password) {
            const user = User.getUser(username);
            return user && user.password === password;
        }

        static setCurrentUser(username) {
            localStorage.setItem("currentUser", username);
        }

        static getCurrentUser() {
            const username = localStorage.getItem("currentUser");
            return User.getUser(username);
        }
    }

    const loginForm = document.querySelector(".Login");
    const signupForm = document.querySelector(".Signup");
    signupForm.style.display = "none";

    document.querySelector("#switch-to-signup").addEventListener("click", function () {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    });

    document.querySelector("#switch-to-login").addEventListener("click", function () {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    });

    function togglePasswordVisibility(inputId, toggleId) {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.getElementById(toggleId);

        toggleIcon.addEventListener("click", function () {
            const isPassword = passwordInput.type === "password";
            toggleIcon.src = isPassword ? "./Images/eye-close.png" : "./Images/eye-open.png";
            passwordInput.type = isPassword ? "text" : "password";
        });
    }

    togglePasswordVisibility("login-password", "toggle-login-password");
    togglePasswordVisibility("signup-password", "toggle-signup-password");

    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        if (User.validateLogin(username, password)) {
            User.setCurrentUser(username);
            console.log(`Logged in as: ${username}`);
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("login-error").textContent = "Invalid username or password.";
        }
    });

    document.getElementById("signup-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const errorElement = document.getElementById("signup-error");

        if (password !== confirmPassword) {
            errorElement.textContent = "Passwords do not match.";
            return;
        }

        const newUser = new User(username, password);
        if (User.saveUser(newUser)) {
            errorElement.style.color = "green";
            errorElement.textContent = "Sign-up successful! Redirecting to login...";
            document.getElementById("signup-form").reset();
            setTimeout(() => {
                errorElement.style.color = "red";
                loginForm.style.display = "block";
                signupForm.style.display = "none";
            }, 2000);
        } else {
            errorElement.textContent = "User already exists. Please choose a different username.";
        }
    });
});