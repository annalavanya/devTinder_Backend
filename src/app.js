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
        res.status(500).send("Something went wrong" + err.message);
    }
});

// GET user by email
app.get('/user', async(req, res) => {
    const userEmail = req.body.emailId;
    // const userAge = req.body.age;
    // try {
    //     const user = await User.findOne({emailId: userEmail});
    //     if(user) {
    //         res.send(user);
    //     } else {
    //         res.status(404).send("User NOT FOUND")
    //     }
    // }
    try {
    // ** Model.aggregate();
        // const users = await User.aggregate([   
        //     { $group: { _id: null, maxAge: { $max: '$age' } } },
        //     { $project: { _id: 0,  maxAge: 1 } }
        // ]);

    // ** Model.bulkSave();
        // const user1 = new User(req.body);
        // const user2 = await User.findOne({ firstName: req.body.name});
        // if (user2) {
        //     user2.age = 35;
        // }
        // const users = await User.bulkSave([user1, user2]);
        // res.send(users);
    
    

        // if(users.length > 0) {
            // res.send(users);
        // } 
        // else {
        //     res.status(404).send("User NOT FOUND")
        // }
    } 
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
    const userId = req.body._id;
    const userEmail = req.body.emailId;
    const data = req.body;
    try {
        // await User.findOneAndUpdate({_id: userId}, data);  
                    // (or)
        const updateValue = await User.findByIdAndUpdate(userId, data, { returnDocument: 'after', strict: 'true', select: 'firstName lastName -_id', runValidators: true }); // update user by _id
        console.log(updateValue);
        // await User.findOneAndUpdate({emailId: userEmail}, data); // update user by emailId
        res.send("User Updated succesfully");
    } catch (error) {
        res.status(500).send("Something went wrong" + error.message);
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



