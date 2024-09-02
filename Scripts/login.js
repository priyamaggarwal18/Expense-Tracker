document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".Login");
    const signupForm = document.querySelector(".Signup");

    // Hide signup form initially
    signupForm.style.display = "none";

    // Function to toggle between forms
    function toggleForms() {
        if (loginForm.style.display === "none") {
            loginForm.style.display = "block";
            signupForm.style.display = "none";
        } else {
            loginForm.style.display = "none";
            signupForm.style.display = "block";
        }
    }

    // Example: You can call toggleForms() when a user clicks a link or button
    // Assuming you have links or buttons to switch between the forms
    document.querySelector("#switch-to-signup").addEventListener("click", toggleForms);
    document.querySelector("#switch-to-login").addEventListener("click", toggleForms);
});
