const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
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

        // HASH PASSWORD

let hashedPassword =
    await bcrypt.hash(password, 10);

// CREATE USER

let newUser = new User({

    name,

    email,

    password: hashedPassword
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

        let isMatch =
            await bcrypt.compare(

                password,

                user.password
            );

        if (!isMatch) {

            return res.status(401).json({

                message: "Invalid password"
            });
        }

        // CREATE TOKEN

        let token = jwt.sign(

            {

                id: user._id
            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"
            }
        );

        // SUCCESS RESPONSE

        res.status(200).json({

            message: "Login successful",

            token,

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