const express = require("express");
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json());

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


connectDB()
.then(() => {
    console.log("Database connection established");
    app.listen(7777,()=>{
        console.log("Server is listening in port 7777");
    });
})
.catch((err) => console.error("Database connection not established"));



