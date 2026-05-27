const express = require("express");
const authMiddleware =
    require("../middleware/authMiddleware");
const router = express.Router();

const {

    signup,

    login,

    followUser,

    getUser

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

    "/:email",

    getUser
);

module.exports = router;