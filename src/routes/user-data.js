const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();
const USER_DETAILS = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"];

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const userData = req.user;
        const datas = await ConnectionRequest.find({
            toUserId: userData._id,
            status: "interested"
        }).populate("fromUserId", USER_DETAILS)
        res.json({message: "Data fetched successfully", data: datas});
    } catch (err) {
       res.status(400).send("Error:" + " " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const userData = req.user;
        const datas = await ConnectionRequest.find({
            $or: [
                {fromUserId: userData._id, status: "accepted"},
                {toUserId: userData._id, status: "accepted"}
            ]
        })
        .populate("fromUserId", USER_DETAILS)
        .populate("toUserId", USER_DETAILS);
        const connections = datas.map((row)=>{
            if (row.fromUserId._id.toString() === userData._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({data: connections});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// feed API
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = (limit>50) ? 50 : limit;
        const skip = (page-1)*limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedUser._id },
                { toUserId: loggedUser._id}
            ]
        }).select('fromUserId toUserId')
        // .populate("fromUserId", 'firstName')
        // .populate("toUserId", 'firstName');
        if (!connectionRequests) return res.send("No users");
        let uniqueIds = new Set();
        connectionRequests.forEach(request => {
            uniqueIds.add(request.fromUserId.toString());
            uniqueIds.add(request.toUserId.toString());
        });
        // console.log("connect", uniqueIds);
        const user = await User.find({
            $and:[
                { _id: { $nin: Array.from(uniqueIds)}},
                { _id: { $ne: loggedUser._id }}
            ]
        }).select(USER_DETAILS).skip(skip).limit(limit);
        res.json({data: user});    
    } catch (err) {
        res.status(400).json({message: err.message});
    }

});

module.exports = userRouter;