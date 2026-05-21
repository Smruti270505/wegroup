// TEMPORARY USERS ARRAY
const User = require("../models/User");


// SIGNUP CONTROLLER

async function signup(req, res) {

    try {

        let {

            name,

            email,

            password

        } = req.body;

        // CHECK EMPTY

        if (!name || !email || !password) {

            return res.status(400).json({

                message: "All fields required"
            });
        }

        // CHECK EXISTING USER

        let existingUser =
            await User.findOne({

                email: email
            });

        if (existingUser) {

            return res.status(400).json({

                message: "User already exists"
            });
        }

        // CREATE USER

        let newUser = new User({

            name,

            email,

            password
        });

        // SAVE TO DATABASE

        await newUser.save();

        res.status(201).json({

            message: "Signup successful",

            user: newUser
        });

    } catch(error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"
        });
    }
}
// LOGIN CONTROLLER

async function login(req, res) {

    try {

        let {

            email,

            password

        } = req.body;

        // FIND USER

        let user =
            await User.findOne({

                email: email
            });

        if (!user) {

            return res.status(401).json({

                message: "User not found"
            });
        }

        // CHECK PASSWORD

        if (user.password !== password) {

            return res.status(401).json({

                message: "Invalid password"
            });
        }

        res.status(200).json({

            message: "Login successful",

            user
        });

    } catch(error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"
        });
    }
}
module.exports = {

    signup,

    login
};