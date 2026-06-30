const express = require("express");
const authMiddleware =
    require("../middleware/authMiddleware");
const router = express.Router();

const {

    signup,

    login,

    followUser,

    getUser,
    getAllUsers,

    searchUsers,
    getNotifications

} = require("../controllers/userController");

// SIGNUP ROUTE

router.post("/signup", signup);

// LOGIN ROUTE

router.post("/login", login);
router.put(

    "/follow",

    authMiddleware,

    followUser
);
router.get(

    "/search/users",

    searchUsers
);
router.get("/all", getAllUsers);

router.get("/:id", getUser);
router.get(

    "/notifications/:username",

    getNotifications
);



module.exports = router;