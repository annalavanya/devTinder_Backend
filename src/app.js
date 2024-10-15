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
// User.find({condition(optional)}, {projection(include-1/exclude-0 - optional)}, {option(sort- asc= 1,des= -1,limit - optional)}, callback function - optional)
app.get('/feed', async (req, res) => {
    const value = req.body.value;
    try {
        const users = await User.find({},{firstName: 1, lastName: 1, emailId: 1, _id: 0}, {limit: 3, sort: {firstName: -1}});
        res.send(users);
    } catch(error) {
        res.status(500).send("Something went wrong");
    }
})

// GET - findById
app.get('/userById', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findById(userId, {firstName: 1, lastName: 1, emailId : 1, _id: 0});
        res.send(user);
    } catch (error) {
        res.status(500).send("Something went worng");
    }
})

// DELETE API
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        // await User.findOneAndDelete({_id: userId});  
                    // (or)
        await User.findByIdAndDelete(userId);
        res.send("User deleted succesfully");
    } catch (error) {
        res.status(500).send("Something went worng");
    }
})

// UPDATE - patch API
app.patch('/user', async (req,res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        // await User.findOneAndUpdate({_id: userId}, data);  
                    // (or)
        await User.findByIdAndUpdate(userId, data);
        res.send("User Updated succesfully");
    } catch (error) {
        res.status(500).send("Something went worng");
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



