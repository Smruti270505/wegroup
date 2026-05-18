const userRoutes =
    require("./routes/userRoutes");
const express = require("express");

const app = express();

const PORT = 5000;

// HOME ROUTE

app.get("/", function(req, res) {

    res.send("WeGroup Backend Running 🚀");
});
app.use("/users", userRoutes);
// USERS API

app.get("/users", function(req, res) {

    let users = [

        {
            id: 1,
            name: "Chiku"
        },

        {
            id: 2,
            name: "WeGroup User"
        }

    ];

    res.json(users);
});

// POSTS API

app.get("/posts", function(req, res) {

    let posts = [

        {
            id: 1,
            user: "Chiku",
            content: "Hello WeGroup 🚀"
        },

        {
            id: 2,
            user: "Developer",
            content: "Backend Started 🔥"
        }

    ];

    res.json(posts);
});
// START SERVER

app.listen(PORT, function() {

    console.log(
        `Server running on port ${PORT}`
    );
});