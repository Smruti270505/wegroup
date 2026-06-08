

// ================= DASHBOARD USER =================

if (window.location.pathname.includes("dashboard.html")) {

    let user =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {

        window.location.href = "login.html";

    } else {

        let usernameElements =
            document.querySelectorAll("#username");

        usernameElements.forEach(function(element) {

            element.innerText = user.name;
        });
    }
}

// ================= PROFILE PAGE =================

// ================= PROFILE PAGE =================

if (
    window.location.pathname.includes(
        "profile.html"
    )
) {

    loadProfile();
}

async function loadProfile() {

    let currentUser =
        JSON.parse(

            localStorage.getItem(
                "currentUser"
            ) || "{}"
        );

    if (!currentUser.email) {

        window.location.href =
            "login.html";

        return;
    }

    try {

        let response =
            await fetch(

                `http://localhost:5000/users/${currentUser.email}`
            );

        let user =
            await response.json();

        document.getElementById(
            "profileName"
        ).innerText = user.name;

        document.getElementById(
            "profileEmail"
        ).innerText = user.email;

        document.getElementById(
            "followersCount"
        ).innerText =
            user.followers.length;

        document.getElementById(
            "followingCount"
        ).innerText =
            user.following.length;

        document.getElementById(
            "profileBio"
        ).innerText =
            user.bio || "No bio yet";

    } catch(error) {

        console.log(error);

        alert("Failed to load profile");
    }
}




// ================= NOTIFICATIONS =================


// ================= INITIAL LOAD =================

loadPosts();

updateStats();

loadNotifications();
let savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");
}
async function loadNotifications() {

    let currentUser =
        JSON.parse(

            localStorage.getItem(
                "currentUser"
            ) || "{}"
        );

    let container =
        document.getElementById(
            "notificationsContainer"
        );

    if (!container) return;

    try {

        let response =
            await fetch(

                `http://localhost:5000/users/notifications/${currentUser.name}`
            );

        let notifications =
            await response.json();

        container.innerHTML = "";

        notifications.forEach(

            function(notification) {

                container.innerHTML += `

                    <div class="notification">

                        <p>

                            ${notification.message}

                        </p>

                    </div>
                `;
            }
        );

    } catch(error) {

        console.log(error);
    }
}

loadNotifications();
function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("currentUser");

    window.location.href =
        "login.html";
}



