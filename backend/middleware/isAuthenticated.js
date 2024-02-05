const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const createToken = require("../Utils/makeToken");
module.exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ isAuthenticated: false, error: "Token has expired" });
                } else {
                    return res.status(401).json({ isAuthenticated: false, error: "Invalid token" });
                }
            } else {
                const user = await User.findById(decodedToken.id);
                req.user = user;
                next();
            }
        });
    } else {
        res.status(200).json({ isAuthenticated: false, user: null });
    }
};


module.exports.refreshAccessToken = async (req, res) => {
    try {
        // Check if req.user is defined
        if (!req.user) {
            return res.status(401).json({ success: false, error: "Unauthorized" });
        }

        // Fetch the user from the database using the user ID in the decoded token
        const user = await User.findById(req.user.id);

        // Generate a new token and send it in the response
        const newToken = createToken(req.user.id);
        res.cookie('jwt', newToken, { httpOnly: true, maxAge: process.env.JWT_EXPIRE * 1000 });
        res.status(200).json({ success: true, user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


