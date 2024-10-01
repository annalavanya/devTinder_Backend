const express = require("express");

const app = express();

app.use("/home", (req,res)=>{
    // console.log("req",req.headers.host);
    res.send("Home page");
})

app.use("/order", (req,res)=>{
    // console.log("req",req.headers.host);
    res.send("Order page");
})

app.use("/review", (req,res)=>{
    res.send("Review page");
})

app.use("/", (req,res)=>{
    // console.log("req",req.headers.host);
    res.send("Welcome");
})

app.listen(7777,()=>{
    console.log("Server is listening in port 3000");
})