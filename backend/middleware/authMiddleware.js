const jwt = require("jsonwebtoken");

async function authMiddleware(

    req,

    res,

    next
) {

    try {

        let token =
            req.header("Authorization");

        // CHECK TOKEN

        if (!token) {

            return res.status(401).json({

                message: "Access denied"
            });
        }

        // REMOVE BEARER

        token =
            token.replace("Bearer ", "");

        // VERIFY TOKEN

        let verified =
            jwt.verify(

                token,

                process.env.JWT_SECRET
            );

        // SAVE USER

        req.user = verified;

        next();

    } catch(error) {

        console.log(error);

        res.status(401).json({

            message: "Invalid token"
        });
    }
}

module.exports =
    authMiddleware;