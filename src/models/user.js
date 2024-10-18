const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        maxLength: 50
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        maxLength: 50,
        trim: true
    },
    password: {
        type: String,
        required: true,
        maxLength: 50
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!['male', 'female', 'others'].includes(value)) {
                throw new Error("Invalid gender");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png"
    },
    about: {
        type: String,
        default: "This is a default about",
        maxLength: 100
    },
    skills: {
        type: [String]
    }
}, { timestamps: true });
// userSchema.index({ age: 1 }); // create index for schema 1- asc, -1- desc, text- search a text, hash- search a unique value and use equality operations only.
module.exports = mongoose.model('User', userSchema);