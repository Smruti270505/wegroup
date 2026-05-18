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


loadSuggestedUsers();