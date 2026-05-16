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

// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("currentUser");

    alert("Logged out successfully");

    window.location.href = "login.html";
}

// ================= CREATE POST =================

function createPost() {

    let postInput =
        document.getElementById("postInput");

    let postText =
        postInput.value.trim();

    let imageInput =
        document.getElementById("imageInput");

    let imageFile =
        imageInput.files[0];

    // CHECK EMPTY

    if (
        postText === "" &&
        !imageFile
    ) {

        alert("Post cannot be empty!");

        return;
    }

    // IF IMAGE EXISTS

    if (imageFile) {

        let reader = new FileReader();

        reader.onload = function() {

            savePostData(reader.result);
        };

        reader.readAsDataURL(imageFile);

    } else {

        savePostData("");
    }
}

    updateCounter();

    displayPosts();

    updateStats();

function savePostData(imageUrl) {

    let postInput =
        document.getElementById("postInput");

    let postText =
        postInput.value.trim();

    let category =
        document.getElementById("categorySelect").value;

    let user =
        JSON.parse(localStorage.getItem("currentUser"));

    let posts =
        JSON.parse(localStorage.getItem("posts")) || [];

    let newPost = {

        id: Date.now(),

        username: user.name,

        avatar:
            `https://ui-avatars.com/api/?name=${user.name}`,

        text: postText,

        image: imageUrl,

        category: category,

        likes: 0,

        comments: [],

        time: new Date().toLocaleString()
    };

    posts.unshift(newPost);

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

    // CLEAR INPUTS

    postInput.value = "";

    document.getElementById("imageInput").value = "";

    document.getElementById("preview").style.display =
        "none";

    // REFRESH POSTS

    displayPosts();

    updateStats();
}
// ================= DISPLAY POSTS =================

function displayPosts() {

    let postsContainer =
        document.getElementById("postsContainer");

    if (!postsContainer) return;

    let posts =
        JSON.parse(localStorage.getItem("posts")) || [];

    let currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    postsContainer.innerHTML = "";

    if (posts.length === 0) {

        postsContainer.innerHTML = `
            <p class="empty-message">
                No posts yet. Start posting 🚀
            </p>
        `;

        return;
    }

    posts.forEach(function(post) {

        let isFollowing =
            currentUser.following.includes(post.username);

        postsContainer.innerHTML += `

            <div class="post">

                <div class="post-header">

                    <img
                        src="${post.avatar}"
                        class="avatar"
                    >

                    <h3>${post.username}</h3>

                    ${
                        currentUser.name !== post.username
                        ?
                        `
                        <button
                            class="follow-btn"
                            onclick="followUser('${post.username}')"
                        >
                            ${isFollowing ? "Following" : "Follow"}
                        </button>
                        `
                        :
                        ""
                    }

                </div>

                <p>${post.text}</p>

${
    post.image
    ?
    `
    <img
        src="${post.image}"
        class="post-image"
    >
    `
    :
    ""
}

<p>
    <strong>Category:</strong>
    ${post.category}
</p>

                <small>${post.time}</small>

                <div class="comments">

                    ${
                        (post.comments || [])
                        .map(function(comment) {

                            return `
                                <p>💬 ${comment}</p>
                            `;
                        })
                        .join("")
                    }

                </div>

                <input
                    type="text"
                    id="comment-${post.id}"
                    placeholder="Write a comment..."
                >

                <button onclick="addComment(${post.id})">
                    Comment
                </button>

                <br><br>

                <button onclick="likePost(${post.id})">
                    ❤️ ${post.likes}
                </button>

                <button onclick="deletePost(${post.id})">
                    Delete
                </button>

                <button onclick="editPost(${post.id})">
                    Edit
                </button>

                <button onclick="savePost(${post.id})">
                    Save
                </button>
                <button onclick="sharePost(${post.id})">
                    Share
                </button>

            </div>
        `;
    });
}

// ================= FOLLOW USER =================

function followUser(username) {

    let currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    if (currentUser.name === username) {

        alert("You cannot follow yourself!");

        return;
    }

    users = users.map(function(user) {

        // CURRENT USER

        if (user.email === currentUser.email) {

            user.following =
                user.following || [];

            if (!user.following.includes(username)) {

                user.following.push(username);
            }
        }

        // TARGET USER

        if (user.name === username) {

            user.followers =
                user.followers || [];

            if (!user.followers.includes(currentUser.name)) {

                user.followers.push(currentUser.name);
            }
        }

        return user;
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    // UPDATE CURRENT USER

    let updatedCurrentUser =
        users.find(function(user) {

            return user.email === currentUser.email;
        });

    localStorage.setItem(
        "currentUser",
        JSON.stringify(updatedCurrentUser)
    );

    // NOTIFICATIONS

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.unshift(
        `You started following ${username}`
    );

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

    loadNotifications();

    displayPosts();

    alert(`Now following ${username}`);
}

// ================= LIKE POST =================

function likePost(id) {

    let posts =
        JSON.parse(localStorage.getItem("posts")) || [];

    posts = posts.map(function(post) {

        if (post.id === id) {

            post.likes++;
        }

        return post;
    });

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

    displayPosts();
}

// ================= DELETE POST =================

function deletePost(id) {

    let posts =
        JSON.parse(localStorage.getItem("posts")) || [];

    posts = posts.filter(function(post) {

        return post.id !== id;
    });

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

    displayPosts();

    updateStats();
}

// ================= EDIT POST =================

function editPost(id) {

    let posts =
        JSON.parse(localStorage.getItem("posts")) || [];

    let post =
        posts.find(function(p) {

            return p.id === id;
        });

    let updatedText =
        prompt("Edit your post:", post.text);

    if (
        updatedText === null ||
        updatedText.trim() === ""
    ) {

        return;
    }

    posts = posts.map(function(p) {

        if (p.id === id) {

            p.text = updatedText;
        }

        return p;
    });

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

    displayPosts();
}

// ================= ADD COMMENT =================

function addComment(id) {

    let commentInput =
        document.getElementById(`comment-${id}`);

    let commentText =
        commentInput.value.trim();

    if (commentText === "") {

        return;
    }

    let posts =
        JSON.parse(localStorage.getItem("posts")) || [];

    posts = posts.map(function(post) {

        if (post.id === id) {

            post.comments =
                post.comments || [];

            post.comments.push(commentText);
        }

        return post;
    });

    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );

    displayPosts();
}

// ================= SAVE POST =================

function savePost(id) {

    let savedPosts =
        JSON.parse(localStorage.getItem("savedPosts")) || [];

    if (!savedPosts.includes(id)) {

        savedPosts.push(id);

        localStorage.setItem(
            "savedPosts",
            JSON.stringify(savedPosts)
        );

        alert("Post saved!");
    }
}

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

// ================= NOTIFICATIONS =================

function showNotifications() {

    let panel =
        document.getElementById("notificationPanel");

    panel.classList.toggle("show-notifications");
}

function loadNotifications() {

    let panel =
        document.getElementById("notificationPanel");

    if (!panel) return;

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    panel.innerHTML = "<h3>Notifications</h3>";

    notifications.forEach(function(note) {

        panel.innerHTML += `
            <p>${note}</p>
        `;
    });
}

// ================= INITIAL LOAD =================

displayPosts();

updateStats();

loadNotifications();
let savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");
}

function loadExplorePosts() {

    let container =
        document.getElementById("explorePosts");

    if (!container) return;

    let posts =
        JSON.parse(localStorage.getItem("posts")) || [];

    container.innerHTML = "";

    posts.forEach(function(post) {

        container.innerHTML += `

            <div class="post">

                <div class="post-header">

                    <img
                        src="${post.avatar}"
                        class="avatar"
                    >

                    <h3>${post.username}</h3>

                </div>

                <p>${post.text}</p>

                <small>${post.time}</small>

            </div>
        `;
    });
}
loadExplorePosts();
function loadSavedPosts() {

    let container =
        document.getElementById("savedPostsContainer");

    if (!container) return;

    let savedPosts =
        JSON.parse(localStorage.getItem("savedPosts")) || [];

    let posts =
        JSON.parse(localStorage.getItem("posts")) || [];

    container.innerHTML = "";

    let filteredPosts =
        posts.filter(function(post) {

            return savedPosts.includes(post.id);
        });

    if (filteredPosts.length === 0) {

        container.innerHTML =
            "<p>No saved posts yet ⭐</p>";

        return;
    }

    filteredPosts.forEach(function(post) {

        container.innerHTML += `

            <div class="post">

                <div class="post-header">

                    <img
                        src="${post.avatar}"
                        class="avatar"
                    >

                    <h3>${post.username}</h3>

                </div>

                <p>${post.text}</p>

                <small>${post.time}</small>

            </div>
        `;
    });
}
loadSavedPosts();
function loadSuggestedUsers() {

    let container =
        document.getElementById("suggestedUsers");

    if (!container) return;

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    let currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    container.innerHTML = "";

    users.forEach(function(user) {

        if (user.email !== currentUser.email) {

            container.innerHTML += `

                <div class="suggest-user">

                    <img
                        src="https://ui-avatars.com/api/?name=${user.name}"
                        class="avatar"
                    >

                    <p>${user.name}</p>

                </div>
            `;
        }
    });
}
loadSuggestedUsers();
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
function updateNotificationCount() {

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    let count =
        document.getElementById("notificationCount");

    if (count) {

        count.innerText = notifications.length;
    }
}
loadOnlineUsers();

updateNotificationCount();
