const mongoose = require("mongoose");
const express = require("express");

const cors = require("cors");

const userRoutes =
    require("./routes/userRoutes");

const postRoutes =
    require("./routes/postRoutes");

const app = express();

const PORT = 5000;

mongoose.connect(
"mongodb://wegroupadmin:Chiku99@ac-qvubivh-shard-00-00.h4zy5qn.mongodb.net:27017,ac-qvubivh-shard-00-01.h4zy5qn.mongodb.net:27017,ac-qvubivh-shard-00-02.h4zy5qn.mongodb.net:27017/?ssl=true&replicaSet=atlas-1ue6c1-shard-0&authSource=admin&appName=WeGroupCluster"
)

.then(function() {

    console.log("MongoDB Connected 🚀");

})

.catch(function(error) {

    console.log(error);
});


// MIDDLEWARE

app.use(cors());

app.use(express.json());

// ROUTES

app.use("/users", userRoutes);

app.use("/posts", postRoutes);

// HOME ROUTE

app.get("/", function(req, res) {

    res.send("WeGroup Backend Running 🚀");
});

// START SERVER

app.listen(PORT, function() {

    console.log(
        `Server running on port ${PORT}`
    );
});