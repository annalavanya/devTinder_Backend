const express = require("express");

const app = express();

// error handling
app.use('/',(err,req,res,next)=>{
    if (err) {
        res.status(500).send("Something went wrong!!!");
    }
})

app.get('/getUserDetails', (req, res) => {
    // try {
        throw new Error("Error happend");
        res.send("Hello");
    // }
    // catch(err) {
    //     res.status(500).send("Something went wrong");
    // }
});

app.use('/',(err,req,res,next)=>{
    if (err) {
        res.status(500).send("Something went wrong!!!");
    }
})

// middleware
const { auth } = require('../middlewares/auth');
const { user } = require('../middlewares/user');

// app.get('/admin/getOneUser', auth, (req, res, next) => {
//     res.send("Users send succesfully");
// });

// app.get('/admin/deleteUser', auth, (req,res,next) => {
//     res.send("User removed successfully");
// })

// app.get('/user/getDetails', user ,(req,res,next) => {
//     res.send("User details are fetched succesfully");
// })

// app.get('/user/login',(req,res,next)=>{
//     res.send("Successfully logined");
// })

// route handler
// app.use('/user', 
//     [(req,res,next)=>{
//         console.log("First Response");
//         next();
//         console.log("First Response11");
//         // res.send("Response1");
//         console.log("First Response111");
//         // next();
//     },
//     (req,res,next)=>{
//         console.log("Second Response");
//         next();
//         console.log("Second Response1111");
//         // res.send("Response2");
//         // next();
//     }],
//     [(req,res,next) => {
//         console.log("Third Response");
//         next();
//     }],
//     [(req,res,next) => {
//         console.log("Fourth Response");
//         // res.send("Response4");
//         next();
//     },
//     (req,res,next) => {
//         console.log("Fifth Response");
//         // res.send("Response5");
//         next();
//         //  res.send("Response5");
//     }]
// )



// app.use('/', 
//     (req,res,next)=>{
//         console.log("First Response");
//         res.send("Response 1");
//         next();
//     }
// );
// app.use('/user', 
//     (req,res,next)=>{
//         console.log("Second 1 Response");
//         next();
//     },
//     (req,res,next)=>{
//         console.log("Second 2 Response");
//         next();
//     },
//     (req,res,next)=>{
//         console.log("Second 3 Response");
//         // res.send("Response send");
//         // next();
//     }
// );


// error handling
// app.get('/',(req,res)=>{
//     throw new Error("Oops!!!");
// })


app.listen(7777,()=>{
    console.log("Server is listening in port 7777");
})