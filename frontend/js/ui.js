// ================= IMAGE PREVIEW =================

function previewImage() {

    let imageInput =
        document.getElementById("imageInput");

    let preview =
        document.getElementById("preview");

    let file =
        imageInput.files[0];

    if (file) {

        preview.src =
            URL.createObjectURL(file);

        preview.style.display = "block";
    }
}

// ================= CHARACTER COUNTER =================

function updateCounter() {

    let postInput =
        document.getElementById("postInput");

    if (!postInput) return;

    let text =
        postInput.value;

    document.getElementById("charCount").innerText =
        text.length + " / 200";
}

// ================= SEARCH POSTS =================

function searchPosts() {

    let searchText =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let posts =
        document.querySelectorAll(".post");

    posts.forEach(function(post) {

        let text =
            post.innerText.toLowerCase();

        if (text.includes(searchText)) {

            post.style.display = "block";

        } else {

            post.style.display = "none";
        }
    });
}

// ================= DARK MODE =================

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    if (
        document.body.classList.contains("dark-mode")
    ) {

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        localStorage.setItem(
            "theme",
            "light"
        );
    }
}
// ================= UPDATE STATS =================

function updateStats() {

    let posts =
        JSON.parse(localStorage.getItem("posts")) || [];

    let totalPosts =
        document.getElementById("totalPosts");

    if (totalPosts) {

        totalPosts.innerText = posts.length;
    }
}
function sharePost(id) {

    let postLink =
        `https://wegroup.com/post/${id}`;

    navigator.clipboard.writeText(postLink);

    alert("Post link copied!");
}
function sortPosts(type) {

    let posts =
        JSON.parse(localStorage.getItem("posts")) || [];

    if (type === "liked") {

        posts.sort(function(a, b) {

            return b.likes - a.likes;
        });

    } else {

        posts.sort(function(a, b) {

            return b.id - a.id;
        });
    }

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

    displayPosts();
}
function saveBio() {

    let bio =
        document.getElementById("bioInput").value;

    let currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(function(user) {

        if (user.email === currentUser.email) {

            user.bio = bio;
        }

        return user;
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    currentUser.bio = bio;

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    alert("Bio updated!");
}
if (window.location.pathname.includes("settings.html")) {

    let currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {

        document.getElementById("bioInput").value =
            currentUser.bio || "";
    }
}
function loadOnlineUsers() {

    let container =
        document.getElementById("onlineUsers");

    if (!container) return;

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    container.innerHTML = "";

    users.forEach(function(user) {

        if (user.online) {

            container.innerHTML += `

                <p>🟢 ${user.name}</p>

            `;
        }
    });
}
