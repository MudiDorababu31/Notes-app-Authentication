const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        res.status(403).send({
            message: "You are not logged in"
        });
        return;
    }

    const decoded = jwt.verify(token, "na203");
    const username = decoded.username;

    if (!username) {
        res.status(403).json({
            message: "malformed token"
        });
        return;
    }

    req.username = username;

    next();
}

module.exports = {
    authMiddleware
};