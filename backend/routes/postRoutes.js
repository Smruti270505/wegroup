const express = require("express");

const router = express.Router();

const {

    createPost,

    getPosts,

    likePost,

    addComment

} = require("../controllers/postController");

router.post("/", createPost);

router.get("/", getPosts);
router.put(

    "/like/:id",

    likePost
);
router.put(

    "/comment/:id",

    addComment
);

module.exports = router;