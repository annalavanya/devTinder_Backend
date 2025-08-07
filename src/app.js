const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
var cors = require('cors');

// middleware- used to convert JSON into JS object
app.use(cors({
  origin: "http://localhost:5173/",
  credentials: true
})); // cors
app.use(express.json());
app.use(cookieParser()); // parse the cookies

// routes imports
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user-data");

// routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// db connection
connectDB()
.then(() => {
    console.log("Database connection established");
    app.listen(7777,() => {
        console.log("Server is listening in port 7777");
    });
})
.catch((err) => console.error("Database connection not established"));



