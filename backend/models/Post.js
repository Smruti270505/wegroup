const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    username: {

        type: String,

        required: true
    },

    content: {

        type: String,

        required: true
    },

    likes: {

        type: Number,

        default: 0
    },

    time: {

        type: String,

        default:
            new Date().toLocaleString()
    }
});

module.exports =
    mongoose.model("Post", postSchema);