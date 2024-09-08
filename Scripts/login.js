document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".Login");
    const signupForm = document.querySelector(".Signup");

    // Hide signup form initially
    signupForm.style.display = "none";

    // Toggle between login and signup forms
    document.querySelector("#switch-to-signup").addEventListener("click", function () {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    });

    document.querySelector("#switch-to-login").addEventListener("click", function () {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    });

    // Password visibility toggler
    function togglePasswordVisibility(inputId, toggleId) {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.getElementById(toggleId);

        toggleIcon.addEventListener("click", function () {
            const isPassword = passwordInput.type === "password";
            passwordInput.style.width="100%";
            toggleIcon.src = isPassword? './Images/eye-close.png' : './Images/eye-open.png';
            passwordInput.type = isPassword ? "text" : "password";
        });
    }

    togglePasswordVisibility("login-password", "toggle-login-password");
    togglePasswordVisibility("signup-password", "toggle-signup-password");
    togglePasswordVisibility("confirm-password", "toggle-confirm-password");

    // Password validation for sign up
    const signupFormElement = document.getElementById("signup-form");
    signupFormElement.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission for validation

        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const errorElement = document.getElementById("signup-error");

        // Password validation logic
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
        if (!passwordRegex.test(password)) {
            errorElement.textContent =
                "Password must contain at least one uppercase, one lowercase, one special character, and be at least 6 characters long.";
            return;
        }

        if (password !== confirmPassword) {
            errorElement.textContent = "Passwords do not match.";
            return;
        }

        // If validation passes, submit the form
        errorElement.textContent = "";
        signupFormElement.submit();
    });
});
