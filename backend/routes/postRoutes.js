const express = require("express");
const upload =
    require("../middleware/upload");
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

    upload.single("image"),

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