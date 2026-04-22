function startApp() {
    window.location.href = "login.html";
}// LOGIN FUNCTION
// LOGIN
let loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;

        if (email === "" || password === "") {
            document.getElementById("loginError").innerText = "All fields are required!";
            return;
        }

        if (password.length < 6) {
            document.getElementById("loginError").innerText = "Password must be at least 6 characters";
            return;
        }

        alert("Login Successful 🚀");
    });
}
d// SIGNUP
let signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (name === "" || email === "" || password === "") {
            document.getElementById("signupError").innerText = "All fields are required!";
            return;
        }

        if (password.length < 6) {
            document.getElementById("signupError").innerText = "Password must be at least 6 characters";
            return;
        }

        alert("Account Created Successfully 🎉");

        window.location.href = "login.html";
    });
}