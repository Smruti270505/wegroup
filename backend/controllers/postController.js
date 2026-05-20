let posts = [];

// CREATE POST

function createPost(req, res) {

    let { content, username } = req.body;

    if (!content) {

        return res.status(400).json({

            message: "Post content required"
        });
    }

    let newPost = {

        id: Date.now(),

        username,

        content,

        likes: 0,

        comments: [],

        time: new Date().toLocaleString()
    };

    posts.unshift(newPost);

    res.status(201).json({

        message: "Post created",

        post: newPost
    });
}

// GET POSTS

function getPosts(req, res) {

    res.status(200).json(posts);
}

module.exports = {

    createPost,

    getPosts
};