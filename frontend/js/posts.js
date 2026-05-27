// ================= CREATE POST =================

async function createPost() {

    let postInput =
        document.getElementById("postInput");

    let content =
        postInput.value.trim();

    if (!content) {

        alert("Post cannot be empty!");

        return;
    }

    let currentUser =
        JSON.parse(

            localStorage.getItem(
                "currentUser"
            ) || "{}"
        );

    let token =
        localStorage.getItem("token");

    try {

        let response =
            await fetch(

                "http://localhost:5000/posts",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({

                        username:
                            currentUser.name,

                        content
                    })
                }
            );

        let data =
            await response.json();

        alert(data.message);

        postInput.value = "";

        loadPosts();

    } catch(error) {

        console.log(error);

        alert("Failed to create post");
    }
}

// ================= LOAD POSTS =================

async function loadPosts() {

    let postsContainer =
        document.getElementById(
            "postsContainer"
        );

    if (!postsContainer) return;

    try {

        let response =
            await fetch(
                "http://localhost:5000/posts"
            );

        let posts =
            await response.json();

        postsContainer.innerHTML = "";

        posts.reverse();

        posts.forEach(function(post) {

            postsContainer.innerHTML += `

                <div class="post">

                    <div class="post-header">

                        <img
                            src="https://ui-avatars.com/api/?name=${post.username}"
                            class="avatar"
                        >

                        <div>

                            <h3>${post.username}</h3>

                            <small>${post.time}</small>

                        </div>

                    </div>

                    <p class="post-content">

                        ${post.content}

                    </p>

                    <div class="post-actions">

                        <button onclick="likePost('${post._id}')">

                            ❤️ ${post.likes.length}

                        </button>

                        <button onclick="toggleCommentBox('${post._id}')">

                            💬 Comment

                        </button>

                        <button onclick="sharePost()">

                            📤 Share

                        </button>

                        <button onclick="followUser('${post.username}')">

                            ➕ Follow

                        </button>

                    </div>

                    <div
                        id="commentBox-${post._id}"
                        class="comment-box"
                        style="display:none;"
                    >

                        <input
                            type="text"
                            placeholder="Write comment..."
                            id="commentInput-${post._id}"
                        >

                        <button onclick="addComment('${post._id}')">

                            Post

                        </button>

                        <div class="comments-list">

                            ${post.comments.map(function(comment) {

                                return `

                                    <p>

                                        <strong>

                                            ${comment.username}

                                        </strong>

                                        : ${comment.text}

                                    </p>
                                `;

                            }).join("")}

                        </div>

                    </div>

                </div>
            `;
        });

    } catch(error) {

        console.log(error);

        alert("Failed to load posts");
    }
}

// ================= LIKE POST =================

async function likePost(postId) {

    let currentUser =
        JSON.parse(

            localStorage.getItem(
                "currentUser"
            ) || "{}"
        );
    let token =
    localStorage.getItem("token");

    try {

        await fetch(

            `http://localhost:5000/posts/like/${postId}`,

            {

                method: "PUT",

                headers: {

    "Content-Type":
        "application/json",

    "Authorization":
        `Bearer ${token}`
},

                body: JSON.stringify({

                    username:
                        currentUser.email
                })
            }
        );

        loadPosts();

    } catch(error) {

        console.log(error);

        alert("Failed to like post");
    }
}

// ================= TOGGLE COMMENT =================

function toggleCommentBox(postId) {

    let box =
        document.getElementById(
            `commentBox-${postId}`
        );

    if (box.style.display === "none") {

        box.style.display = "block";

    } else {

        box.style.display = "none";
    }
}

// ================= ADD COMMENT =================

async function addComment(postId) {

    let input =
        document.getElementById(
            `commentInput-${postId}`
        );

    let text =
        input.value.trim();

    if (!text) {

        alert("Comment empty");

        return;
    }

    let currentUser =
        JSON.parse(

            localStorage.getItem(
                "currentUser"
            ) || "{}"
        );
        let token =
    localStorage.getItem("token");

    try {

        await fetch(

            `http://localhost:5000/posts/comment/${postId}`,

            {

                method: "PUT",

                headers: {

    "Content-Type":
        "application/json",

    "Authorization":
        `Bearer ${token}`
},

                body: JSON.stringify({

                    username:
                        currentUser.name,

                    text
                })
            }
        );

        input.value = "";

        loadPosts();

    } catch(error) {

        console.log(error);

        alert("Failed to comment");
    }
}

// ================= SHARE POST =================

function sharePost() {

    navigator.clipboard.writeText(

        window.location.href
    );

    alert("Post link copied 🚀");
}

// ================= FOLLOW USER =================

// ================= FOLLOW USER =================

async function followUser(username) {

    // SAFE USER FETCH

    let savedUser =
        localStorage.getItem(
            "currentUser"
        );

    if (
        !savedUser ||
        savedUser === "undefined"
    ) {

        alert(
            "Please login again"
        );

        return;
    }

    let currentUser =
        JSON.parse(savedUser);
        let token =
    localStorage.getItem("token");

    try {

        let response =
            await fetch(

                "http://localhost:5000/users/follow",

                {

                    method: "PUT",

                    headers: {

    "Content-Type":
        "application/json",

    "Authorization":
        `Bearer ${token}`
},

                    body: JSON.stringify({

                        currentUserEmail:
                            currentUser.email,

                        targetUserName:
                            username
                    })
                }
            );

        let data =
            await response.json();

        alert(data.message);

        // SAVE UPDATED USER

        if (data.currentUser) {

            localStorage.setItem(

                "currentUser",

                JSON.stringify(
                    data.currentUser
                )
            );
        }

    } catch(error) {

        console.log(error);

        alert("Follow failed");
    }
}

// ================= LOAD SAVED POSTS =================

function loadSavedPosts() {

    let container =
        document.getElementById(
            "savedPostsContainer"
        );

    if (!container) return;

    container.innerHTML = `

        <p>

            Saved posts feature coming soon ⭐

        </p>
    `;
}

// ================= LOAD SUGGESTED USERS =================

function loadSuggestedUsers() {

    let container =
        document.getElementById(
            "suggestedUsers"
        );

    if (!container) return;

    let users =
        JSON.parse(

            localStorage.getItem(
                "users"
            ) || "[]"
        );

    let currentUser =
        JSON.parse(

            localStorage.getItem(
                "currentUser"
            ) || "{}"
        );

    container.innerHTML = "";

    users.forEach(function(user) {

        if (
            user.email !== currentUser.email
        ) {

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

// ================= LOAD EXPLORE POSTS =================

async function loadExplorePosts() {

    let container =
        document.getElementById(
            "explorePosts"
        );

    if (!container) return;

    try {

        let response =
            await fetch(
                "http://localhost:5000/posts"
            );

        let posts =
            await response.json();

        container.innerHTML = "";

        posts.forEach(function(post) {

            container.innerHTML += `

                <div class="post">

                    <div class="post-header">

                        <img
                            src="https://ui-avatars.com/api/?name=${post.username}"
                            class="avatar"
                        >

                        <h3>${post.username}</h3>

                    </div>

                    <p>${post.content}</p>

                    <small>${post.time}</small>

                </div>
            `;
        });

    } catch(error) {

        console.log(error);
    }
}

// ================= INITIAL LOAD =================

loadPosts();

loadExplorePosts();

loadSuggestedUsers();

loadSavedPosts();