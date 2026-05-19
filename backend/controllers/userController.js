// TEMPORARY USERS ARRAY

let users = [];

// SIGNUP CONTROLLER

function signup(req, res) {

    let { name, email, password } = req.body;

    // CHECK EMPTY

    if (!name || !email || !password) {

        return res.status(400).json({

            message: "All fields required"
        });
    }

    // CHECK EXISTING USER

    let existingUser = users.find(function(user) {

        return user.email === email;
    });

    if (existingUser) {

        return res.status(400).json({

            message: "User already exists"
        });
    }

    // CREATE USER

    let newUser = {

        id: Date.now(),

        name,

        email,

        password
    };

    users.push(newUser);

    res.status(201).json({

        message: "Signup successful",

        user: newUser
    });
}

// LOGIN CONTROLLER

function login(req, res) {

    let { email, password } = req.body;

    let user = users.find(function(user) {

        return (
            user.email === email &&
            user.password === password
        );
    });

    if (!user) {

        return res.status(401).json({

            message: "Invalid credentials"
        });
    }

    res.status(200).json({

        message: "Login successful",

        user
    });
}

module.exports = {

    signup,

    login
};