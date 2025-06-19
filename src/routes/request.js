const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { statusValidation } = require("../utils/validation");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/sendConnectionRequest/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromId = req.user._id;
        const status = req.params?.status;
        const toId = req.params.toUserId;
        statusValidation(status); // status validation;

        // check if the user exists or not
        const userExists = await User.findOne({ _id: toId });
        if (!userExists) {
            throw new Error("user not found");
        }

        // // check if from and to users are the same or not
        // if (fromId == toId) {
        //     throw new Error("Cannot make request");
        // }

        // // check if exists
        // const checkDataAlreadyExists = await ConnectionRequest.findOne({ fromUserId: fromId, toUserId: toId });
        // if (checkDataAlreadyExists) {
        //     return res.json({ message: "You already send a connection request"});
        // }

        // // check  
        // const checkReverseSend = await ConnectionRequest.findOne({fromUserId: toId, toUserId: fromId }) 
        // if (checkReverseSend) {
        //     return res.json({ message: "You already received a connection request"});
        // }

        // using $or
        const checkExistance = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: fromId, toUserId: toId },
                { fromUserId: toId, toUserId: fromId }
            ]
        });
        if(checkExistance) {
            return res.status(400).json({ message: "You cannot make a connection"});
        }

        const requestData = new ConnectionRequest({ fromUserId: fromId, toUserId:toId, status });
        const data = await requestData.save();
        res.status(200).json({ message: `${req.user.firstName} is ${status} to connect with ${userExists.firstName}` , data });
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const userId = req.user._id;
        const { status, requestId } = req.params;
        const values = ["accepted", "rejected"];
        if (!values.includes(status)) {
            throw new Error("Invalid status");
        }
        const connection = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: userId,
            status: "interested"
        });
        if (!connection) {
            throw new Error("Connection not found");
        }
        connection.status = status;
        const statusUpdate = await connection.save();
        if (!statusUpdate) {
            throw new Error("User not updated");
        }
        res.status(200).json({ message: "Updated succesfully", statusUpdate});
    } catch (error) {
        res.status(400).send("Error occurs : " + " " + error.message);
    }
});

module.exports = requestRouter;
 