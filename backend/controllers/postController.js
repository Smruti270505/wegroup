const Post = require("../models/Post");

// CREATE POST

async function createPost(req, res) {

    try {

        let {

            username,

            content

        } = req.body;

        if (!content) {

            return res.status(400).json({

                message: "Post content required"
            });
        }

        let newPost = new Post({

            username,

            content
        });

        await newPost.save();

        res.status(201).json({

            message: "Post created",

            post: newPost
        });

    } catch(error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"
        });
    }
}

// GET POSTS

async function getPosts(req, res) {

    try {

        let posts =
            await Post.find();

        res.status(200).json(posts);

    } catch(error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"
        });
    }
}

module.exports = {

    createPost,

    getPosts
};