const express = require("express");

const app = express();

// app.use can handle all the requests like get,post,put,patch,delete etc,..
// app.use("/user",(req,res)=>{
//     res.send("Succesfully done");
// })

// it handle only GET request
app.get("/user",(req,res)=>{
    res.send({firstName: "Anna", lastName: "Lavanya"});
})

// it handle only POST request
app.post("/user",(req,res)=>{
    res.send("Data Saved successfully");
})

// it handle only PUT request
app.put("/user",(req,res)=>{
    res.send("Successfully modified all the datas in that row");
})

// it handle only PATCH request
app.patch("/user",(req,res)=>{
    res.send("Successfully modified the provided datas in that row");
})

// it handle only DELETE request
app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully");
})


// app.use("/hello/123", (req,res)=>{
//     // console.log("req",req.headers.host);
//     res.send("Hello 123");
// })

// app.use("/hello", (req,res)=>{
//     // console.log("req",req.headers.host);
//     res.send("Hello Hello");
// })

// app.use("/test", (req,res)=>{
//     // console.log("req",req.headers.host);
//     res.send("Test test");
// })


// app.use("/", (req,res)=>{   // wildcard route - /
//     // console.log("req",req.headers.host);
//     res.send("Welcome");
// })

app.listen(7777,()=>{
    console.log("Server is listening in port 7777");
})