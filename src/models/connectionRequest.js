const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: `{VALUE} be a wrong value`
        }
    }
}, { timestamps: true });

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1});

// using pre function to check the fromUserId is same as toUserId
connectionRequestSchema.pre("save", function (next) {
    const { fromUserId, toUserId } = this;
    if (fromUserId.equals(toUserId)) {
        throw new Error("Cannot make connection by yourself");
    }
    next();
})

module.exports = mongoose.model('ConnectionRequest', connectionRequestSchema);