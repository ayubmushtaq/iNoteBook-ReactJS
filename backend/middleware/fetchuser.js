const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ayubisagoodbo$y';

const fetchuser = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token){
           return res.status(401).json({ error: "Please authenticate using a valid token" })
        }
        const decodedToken = jwt.verify(token,JWT_SECRET);
        req.user = decodedToken.user;
        next()
    } catch (err) {
        res.status(401).json({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser;