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

        let storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            document.getElementById("loginError").innerText = "No account found. Please sign up!";
            return;
        }

        if (email === storedUser.email && password === storedUser.password) {
            alert("Login Successful 🚀");
            window.location.href = "dashboard.html";

            // later we will go to dashboard
        } else {
            document.getElementById("loginError").innerText = "Invalid email or password!";
        }
    });
}
// SIGNUP
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

        // 🔥 SAVE DATA
        let user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Account Created Successfully 🎉");

        window.location.href = "login.html";
    });
}
// SHOW USER ON DASHBOARD
if (window.location.pathname.includes("dashboard.html")) {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        // no login → redirect
        window.location.href = "login.html";
    } else {
        document.getElementById("username").innerText = user.name;
    }
}
function logout() {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    window.location.href = "login.html";
}