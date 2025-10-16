const express = require("express");
const authRouter = express.Router();
const { validateSignup } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
// POST API
authRouter.post("/signup", async (req, res) => {
    try {
    //validate the req.body
        validateSignup(req);
    // encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        // console.log(passwordHash.length); // 60
    // creating an instance of the model
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });
        await user.save();
        res.send("User Added succesfully");
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        console.log("user", user);
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isValidPassword = await user.comparePassword(password);
        if (isValidPassword) {
            // add the token to the cookie and send the response back to the user
            // res.cookie("token", "ghjfgdusgdcjhgchjdgcadcacgyjcjgdcs"); 
            // add jwt token
            const token = await user.getJWT();
            // console.log(token);
            // res.cookie('session', 'abc123', { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
            // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
            res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
            res.status(200).send(user);
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null , { expires: new Date(Date.now())});
    res.status(200).send("Logout succesfully");
})

module.exports = authRouter;