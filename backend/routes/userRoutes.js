const express = require("express");

const router = express.Router();

// USERS ROUTE

router.get("/", function(req, res) {

    res.json([
        {
            id: 1,
            name: "Chiku"
        }
    ]);
});

module.exports = router;