const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);// //Devrais etre mis dans une variables .env
        const userID = decodeToken.userId;
        req.auth = {
            userId:  userID
        };
        next();
    } 
    catch(error)
    {
        res.status(403).json({error: error, message: 'NOPE'});
    }
}