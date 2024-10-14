const express = require("express");
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

// middleware- used to convert JSON into JS object
app.use(express.json());

// POST API
app.post('/signup', async (req, res) => {
    // creating an instance of the model
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User Added succesfully");
    } catch (err) {
        res.status(400).send("Error while adding data", err.message);
    }
});

// GET user by email
app.get('/user', async(req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.findOne({emailId: userEmail});
        if(user) {
            res.send(user);
        } else {
            res.status(404).send("User NOT FOUND")
        }
    }
    // try {
    //     const users = await User.find({emailId: userEmail});
    //     if(users.length > 0) {
    //         res.send(users);
    //     } else {
    //         res.status(404).send("User NOT FOUND")
    //     }
    // } 
    catch(error) {
        res.status(500).send("Something went wrong!");
    }
})

// Feed API GET/ Feed - get all users
app.get('/feed', async(req,res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(error) {
        res.status(500).send("Something went wrong");
    }
})

// GET - findById


connectDB()
.then(() => {
    console.log("Database connection established");
    app.listen(7777,()=>{
        console.log("Server is listening in port 7777");
    });
})
.catch((err) => console.error("Database connection not established"));



