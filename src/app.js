const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignup } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

// middleware- used to convert JSON into JS object
app.use(express.json());
app.use(cookieParser()); // parse the cookies

// POST API
app.post("/signup", async (req, res) => {
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
        // console.log(user);
        await user.save();
        res.send("User Added succesfully");
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
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
            res.send("Login Succesfull!!!");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})


app.get("/profile", userAuth, async (req, res) => {
    try {
       const user = req.user;
       res.send(user);
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user.firstName + " "+ "send you a connection request");
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})




connectDB()
.then(() => {
    console.log("Database connection established");
    app.listen(7777,()=>{
        console.log("Server is listening in port 7777");
    });
})
.catch((err) => console.error("Database connection not established"));



