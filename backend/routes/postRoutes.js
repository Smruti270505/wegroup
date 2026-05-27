const express = require("express");

const router = express.Router();
const authMiddleware =
    require("../middleware/authMiddleware");
const {

    createPost,

    getPosts,

    likePost,

    addComment

} = require("../controllers/postController");

router.post(

    "/",

    authMiddleware,

    createPost
);

router.get("/", getPosts);
router.put(

    "/like/:id",

    authMiddleware,

    likePost
);
router.put(

    "/comment/:id",

    authMiddleware,

    addComment
);
module.exports = router;