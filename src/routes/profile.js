const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const  { profileEditValidation, passwordEditValidation, validateOtp } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
// const speakEasy = require("speakeasy");
const { sendMailFunction } = require("../utils/nodemailer");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
       const user = req.user;
       res.send(user);
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!profileEditValidation(req)) {
            throw new Error("Cannot be edited");
        }
        const loggedUser = req.user;
        Object.keys(req.body).forEach(value => loggedUser[value] = req.body[value]);
        await loggedUser.save();
        res.send(`${loggedUser.firstName}, your profile updated succesfully`);
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

profileRouter.patch("/profile/password", async (req, res) => {
    try {
        passwordEditValidation(req);
        const { emailId } = req.body;
        const userData = await User.findOne({ emailId: emailId });
        if (!userData) {
            throw new Error("Invalid Credential");
        }
        const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
        userData.otp = otp;
        expiryTime = new Date(Date.now() + 5*60*1000);
        userData.expiryTime = expiryTime;
        userData.save();
        console.log(userData);
        const sendMail = await sendMailFunction(userData.emailId, `<h3>Hello ${userData.firstName}  ${userData.lastName}, Change your password by using this OTP</h3><br><h5>your OTP is ${otp}</h5>`);
        res.status(200).json({ success: true, sendMail: sendMail});
    } catch (error) {
        res.status(400).send("Cannot be updated : " + " " + error.message);
    }
});

profileRouter.post("/checkOtp", userAuth, async (req, res) => {
    try {
        const { otp } = req.body;
        validateOtp(otp); 
        console.log(!(req.user.expiryTime > new Date(Date.now())));
        if ((req.user.expiryTime > new Date(Date.now()))) {
            throw new Error("otp expired");
        }
        const userDate = await User.findOne({ otp });
        if (!userDate) {
            throw new Error("invalid otp");
        }
        res.status(200).send("Password changes successfully");
    } catch(err) {
        res.status(400).send("Error occured : " + " " + err.message);
    }
})

module.exports = profileRouter;


