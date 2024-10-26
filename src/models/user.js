const mongoose = require('mongoose');
const Validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        maxLength: 50,
        required: true
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        maxLength: 50,
        trim: true,
        // validate(value){
        //     if(!Validator.isEmail(value)){
        //         throw new Error("Invalid Email" + " " + value);
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        maxLength: 100,
        // validate(value) {
        //     if(!Validator.isStrongPassword(value)) {
        //         throw new Error("Enter a Strong password"+ " " + value);
        //     }
        // }
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
        default: "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png",
        validate(value) {
            if(!Validator.isURL(value)) {
                throw new Error("Give a valid Image");
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about",
        maxLength: 100
    },
    skills: {
        type: [String],
        validate(array) {
            if(!(array.length === new Set(array).size)) {
                throw new Error("Duplicate values not allowed")
            }
            if(array.length > 10) {
                throw new Error("Skills length should be less than 10");
            }
        }
    }
}, { timestamps: true });
// userSchema.index({ age: 1 }); // create index for schema 1- asc, -1- desc, text- search a text, hash- search a unique value and use equality operations only.

// password compare
userSchema.methods.comparePassword = async function (passwordInputByUser) {
    const { password } = this;
    const hashedPassword = password;
    const isValidPassword = await bcrypt.compare(passwordInputByUser, hashedPassword);
    return isValidPassword;
}

// jwt creation
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "lavanya@2001", { expiresIn: "1d"});
    return token;
}

module.exports = mongoose.model('User', userSchema);





