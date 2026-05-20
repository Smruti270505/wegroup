

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

if (window.location.pathname.includes("profile.html")) {

    let user =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {

        window.location.href = "login.html";

    } else {

        document.getElementById("profileName").innerText =
            user.name;

        document.getElementById("profileEmail").innerText =
            user.email;
        document.getElementById("profileBio").innerText =
            user.bio || "No bio added yet.";

        document.getElementById("followersCount").innerText =
            user.followers.length;

        document.getElementById("followingCount").innerText =
            user.following.length;
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





