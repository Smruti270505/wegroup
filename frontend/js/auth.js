function startApp() {
    window.location.href = "login.html";
}

// ================= LOGIN =================

let loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(e) {

            e.preventDefault();

            let email =
                document.getElementById("loginEmail").value;

            let password =
                document.getElementById("loginPassword").value;

            try {

                let response =
                    await fetch(
                        "http://localhost:5000/users/login",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                email,
                                password
                            })
                        }
                    );

                let data =
                    await response.json();

                // SAVE TOKEN

localStorage.setItem(

    "token",

    data.token
);

// SAVE USER

localStorage.setItem(

    "currentUser",

    JSON.stringify(data.user)
);

// SUCCESS

alert(data.message);

// REDIRECT

window.location.href =
    "dashboard.html";

                if (response.ok) {

                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(data.user)
                    );

                    window.location.href =
                        "dashboard.html";
                }

            } catch(error) {

                console.log(error);

                alert("Login failed");
            }
        }
    );
}
// ================= SIGNUP =================

let signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async function(e) {

            e.preventDefault();

            let name =
                document.getElementById("name").value;

            let email =
                document.getElementById("email").value;

            let password =
                document.getElementById("password").value;

            try {

                let response =
                    await fetch(
                        "http://localhost:5000/users/signup",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                name,
                                email,
                                password
                            })
                        }
                    );

                let data =
                    await response.json();

                alert(data.message);

                if (response.ok) {

                    window.location.href =
                        "login.html";
                }

            } catch(error) {

                console.log(error);

                alert("Signup failed");
            }
        }
    );
}
// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("currentUser");

    alert("Logged out successfully");

    window.location.href = "login.html";
}