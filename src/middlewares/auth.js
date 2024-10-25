const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    try { 
        const cookies = req.cookies;
        console.log(cookies);
        if (cookies?.token) {
            const { token } = cookies;
            const encodedValue = await jwt.verify(token, 'lavanya@2001');
            if (!encodedValue?._id) {
                throw new Error("Invalid Token");
            }
            const { _id } = encodedValue;
            const user = await User.findById(_id);
            if(!user) {
                throw new Error("User not exists");
            }
            req.user = user;
            next();
        } else {
            throw new Error("Please Login Again");
        }
    } catch (error) {
        // console.log(error.message);
        res.status(400).send("ERROR : " + error.message);
    }
};
module.exports = { userAuth };