const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
    profilePicture: {

    type: String,

    default: ""
},
    

    name: {

        type: String,

        required: true
    },

    email: {

        type: String,

        required: true,

        unique: true
    },

    password: {

        type: String,

        required: true
    },
    followers: [

    {

        type: String
    }
],

following: [

    {

        type: String
    }
]
});

module.exports =
    mongoose.model("User", userSchema);
    