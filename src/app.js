const express = require("express");

const app = express();

app.use('/user', 
    (req,res,next)=>{
        console.log("First Response");
        next();
        console.log("First Response11");
        // res.send("Response1");
        console.log("First Response111");
        // next();
    },
    (req,res,next)=>{
        console.log("Second Response");
        next();
        console.log("Second Response1111");
        // res.send("Response2");
        // next();
    },
    (req,res,next) => {
        console.log("Third Response");
        next();
    },
    (req,res,next) => {
        console.log("Fourth Response");
        // res.send("Response4");
        next();
    },
    (req,res,next) => {
        console.log("Fifth Response");
        // res.send("Response5");
    }
)

app.listen(7777,()=>{
    console.log("Server is listening in port 7777");
})