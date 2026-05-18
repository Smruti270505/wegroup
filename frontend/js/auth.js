function startApp() {
    window.location.href = "login.html";
}

// ================= LOGIN =================

let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        let email =
            document.getElementById("loginEmail").value;

        let password =
            document.getElementById("loginPassword").value;

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        let storedUser =
            users.find(function(user) {

                return (
                    user.email === email &&
                    user.password === password
                );
            });

        if (!storedUser) {

            document.getElementById("loginError").innerText =
                "Invalid email or password!";

            return;
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(storedUser)
        );

        alert("Login Successful 🚀");

        window.location.href = "dashboard.html";
    });
}

// ================= SIGNUP =================

let signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(e) {

        e.preventDefault();

        let name =
            document.getElementById("name").value;

        let email =
            document.getElementById("email").value;

        let password =
            document.getElementById("password").value;

        if (
            name === "" ||
            email === "" ||
            password === ""
        ) {

            document.getElementById("signupError").innerText =
                "All fields are required!";

            return;
        }

        if (password.length < 6) {

            document.getElementById("signupError").innerText =
                "Password must be at least 6 characters";

            return;
        }

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        let existingUser =
            users.find(function(user) {

                return user.email === email;
            });

        if (existingUser) {

            document.getElementById("signupError").innerText =
                "Email already exists!";

            return;
        }

        let user = {

            id: Date.now(),

            name: name,

            email: email,

            password: password,

            followers: [],

            following: []
        };

        users.push(user);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Account Created Successfully 🎉");

        window.location.href = "login.html";
    });
}
// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("currentUser");

    alert("Logged out successfully");

    window.location.href = "login.html";
}