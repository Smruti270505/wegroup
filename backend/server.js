require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes =
    require("./routes/userRoutes");

const postRoutes =
    require("./routes/postRoutes");

const messageRoutes =
    require("./routes/messageRoutes");
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
app.use(
    "/messages",
    messageRoutes
);

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

let onlineUsers = [];

io.on("connection", (socket) => {

    console.log(
        "User connected:",
        socket.id
    );

    // USER ONLINE

    socket.on(

        "userOnline",

        (username) => {

            socket.username =
                username;

            if (

                !onlineUsers.includes(
                    username
                )

            ) {

                onlineUsers.push(
                    username
                );
            }

            io.emit(

                "onlineUsers",

                onlineUsers
            );
        }
    );

    // SEND MESSAGE

    socket.on(

        "sendMessage",

        (data) => {

            io.emit(

                "receiveMessage",

                data
            );
        }
    );

    // TYPING

    socket.on(

        "typing",

        (username) => {

            socket.broadcast.emit(

                "userTyping",

                username
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

            onlineUsers =

                onlineUsers.filter(

                    user =>

                        user !==
                        socket.username
                );

            io.emit(

                "onlineUsers",

                onlineUsers
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