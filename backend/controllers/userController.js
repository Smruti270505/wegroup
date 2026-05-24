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
async function followUser(req, res) {

    try {

        let {

            currentUserEmail,

            targetUserName

        } = req.body;

        // FIND CURRENT USER

        let currentUser =
            await User.findOne({

                email: currentUserEmail
            });

        // FIND TARGET USER

        let targetUser =
            await User.findOne({

                name: targetUserName
            });

        if (!currentUser || !targetUser) {

            return res.status(404).json({

                message: "User not found"
            });
        }

        // CHECK SELF FOLLOW

        if (
            currentUser.name === targetUserName
        ) {

            return res.status(400).json({

                message:
                    "Cannot follow yourself"
            });
        }

        // SAFETY CHECKS

if (!currentUser.following) {

    currentUser.following = [];
}

if (!targetUser.followers) {

    targetUser.followers = [];
}

// TOGGLE FOLLOW

if (

    currentUser.following.includes(
        targetUserName
    )

) {

    // UNFOLLOW

    currentUser.following =
        currentUser.following.filter(

            user =>
                user !== targetUserName
        );

    targetUser.followers =
        targetUser.followers.filter(

            user =>
                user !== currentUser.name
        );

} else {

    // FOLLOW

    currentUser.following.push(
        targetUserName
    );

    targetUser.followers.push(
        currentUser.name
    );
}

        await currentUser.save();

        await targetUser.save();

        res.status(200).json({

    message:
        "Follow system updated",

    currentUser: {

        name: currentUser.name,

        email: currentUser.email,

        followers: currentUser.followers,

        following: currentUser.following
    }
});
    } catch(error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"
        });
    }
}
async function getUser(req, res) {

    try {

        let email =
            req.params.email;

        let user =
            await User.findOne({

                email
            });

        if (!user) {

            return res.status(404).json({

                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch(error) {

        console.log(error);

        res.status(500).json({

            message: "Server error"
        });
    }
}
module.exports = {

    signup,

    login,

    followUser,

    getUser
};