function startApp() {
    window.location.href = "login.html";
}

// ================= LOGIN =================

let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;

        let storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            document.getElementById("loginError").innerText =
                "No account found. Please sign up!";
            return;
        }

        if (
            email === storedUser.email &&
            password === storedUser.password
        ) {

            alert("Login Successful 🚀");

            window.location.href = "dashboard.html";

        } else {

            document.getElementById("loginError").innerText =
                "Invalid email or password!";
        }
    });
}

// ================= SIGNUP =================

let signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(e) {

        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (name === "" || email === "" || password === "") {

            document.getElementById("signupError").innerText =
                "All fields are required!";

            return;
        }

        if (password.length < 6) {

            document.getElementById("signupError").innerText =
                "Password must be at least 6 characters";

            return;
        }

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

// ================= DASHBOARD USER =================

if (window.location.pathname.includes("dashboard.html")) {

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        window.location.href = "login.html";

    } else {

        document.getElementById("username").innerText = user.name;
    }
}

// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("user");

    alert("Logged out successfully");

    window.location.href = "login.html";
}

// ================= CREATE POST =================

function createPost() {

    let postInput = document.getElementById("postInput");

    let postText = postInput.value;

    if (postText.trim() === "") {

        alert("Post cannot be empty!");

        return;
    }

    let user = JSON.parse(localStorage.getItem("user"));

    // OLD POSTS
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    let newPost = {

        id: Date.now(),

        username: user.name,

        text: postText,

        likes: 0,

        time: new Date().toLocaleString()
    };

    // NEWEST POST FIRST
    posts.unshift(newPost);

    // SAVE POSTS
    localStorage.setItem("posts", JSON.stringify(posts));

    // CLEAR INPUT
    postInput.value = "";

    // REFRESH POSTS
    displayPosts();
}

// ================= DISPLAY POSTS =================

function displayPosts() {

    let postsContainer = document.getElementById("postsContainer");

    if (!postsContainer) return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    postsContainer.innerHTML = "";

    posts.forEach(function(post) {

        postsContainer.innerHTML += `

            <div class="post">

                <h3>${post.username}</h3>

                <p>${post.text}</p>

                <small>${post.time}</small>

                <br><br>

                <button onclick="likePost(${post.id})">
                    ❤️ ${post.likes}
                </button>

                <button onclick="deletePost(${post.id})">
                    Delete
                </button>

            </div>
        `;
    });
}

// ================= LIKE POST =================

function likePost(id) {

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts = posts.map(function(post) {

        if (post.id === id) {
            post.likes++;
        }

        return post;
    });

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
}

// ================= DELETE POST =================

function deletePost(id) {

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts = posts.filter(function(post) {

        return post.id !== id;
    });

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
}

// ================= LOAD POSTS =================

displayPosts();