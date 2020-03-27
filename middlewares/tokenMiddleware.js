const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

// const verifyToken = (req, res, next) => {
//     const token = req.headers('Authorization').split(' ')[1];
//     // Check if bearer is undefined
//     if (!token) res.status(401).json({ msg: "No token authorization denied" })

//     try {
//         let decoded = jwt.verify(token, jwtSecret);
//         req.user = decoded;
//         next();
//     } catch (e) {
//         res.status(400).json({ msg: 'token is not valid' })
//     }
// }

module.exports = verifyToken;