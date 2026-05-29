const Post = require("../models/Post");
const Notification =
    require("../models/Notification");
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
async function likePost(req, res) {

    try {

        let postId =
            req.params.id;

        let {
            username
        } = req.body;

        let post =
            await Post.findById(postId);

        if (!post) {

            return res.status(404).json({

                message: "Post not found"
            });
        }

        // TOGGLE LIKE

        if (
            post.likes.includes(username)
        ) {

            post.likes =
                post.likes.filter(

                    user => user !== username
                );

        } else {

            post.likes.push(username);

            // CREATE NOTIFICATION

            let notification =
                new Notification({

                    receiver:
                        post.username,

                    sender:
                        username,

                    type: "like",

                    message:
                        `${username} liked your post`
                });

            await notification.save();
        }

        await post.save();

        res.status(200).json({

            message: "Post updated",

            likes: post.likes.length
        });

    } catch(error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"
        });
    }
}
async function addComment(req, res) {

    try {

        let postId =
            req.params.id;

        let {

            username,

            text

        } = req.body;

        let post =
            await Post.findById(postId);

        if (!post) {

            return res.status(404).json({

                message: "Post not found"
            });
        }

        post.comments.push({

            username,

            text
        });
        let notification =
    new Notification({

        receiver:
            post.username,

        sender:
            req.user.id,

        type: "comment",

        message:
            `${username} commented on your post`
    });

await notification.save();

        await post.save();

        res.status(200).json({

            message: "Comment added"
        });

    } catch(error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"
        });
    }
}

module.exports = {

    createPost,

    getPosts,

    likePost,

    addComment
};