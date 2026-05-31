require("dotenv").config();

const mongoose = require("mongoose");

const express = require("express");

const cors = require("cors");

const userRoutes =
    require("./routes/userRoutes");

const postRoutes =
    require("./routes/postRoutes");

const app = express();

const PORT = 5000;

// DATABASE CONNECTION

mongoose.connect(process.env.MONGO_URI)

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

const http =
    require("http");

const {

    Server

} = require("socket.io");

const server =
    http.createServer(app);

const io =
    new Server(server, {

        cors: {

            origin: "*"
        }
    });

// SOCKET CONNECTION

io.on("connection", (socket) => {

    console.log(

        "User connected:",
        socket.id
    );

    // RECEIVE MESSAGE

    socket.on(

        "sendMessage",

        (data) => {

            io.emit(

                "receiveMessage",

                data
            );
        }
    );

    // DISCONNECT

    socket.on(

        "disconnect",

        () => {

            console.log(

                "User disconnected"
            );
        }
    );
});

// START SERVER

server.listen(PORT, () => {

    console.log(

        `Server running on port ${PORT}`
    );
});