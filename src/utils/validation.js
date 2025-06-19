const validator = require('validator');

const validateSignup = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name must be required")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Enter a valid email Id");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a Strong password - it must contains atleast 1 uppercase, 1 lowercase, 1 special character and a lenght of 8 characters");
    }
}

const profileEditValidation = (req) => {
    const allowedFields = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"];
    const InputFields = req.body;
    const isEditable = Object.keys(InputFields).every((value) => allowedFields.includes(value));
    return isEditable;
}


const passwordEditValidation = (req) => {
    const { emailId } = req.body;
    if(!validator.isEmail(emailId)) {
        throw new Error("Enter a valid emailId");
    }
}

const validateOtp = (otp) => {
    if (!typeof(otp) === 'string') {
        throw new Error("otp must be a string");
    }
}

const statusValidation = (status) => {
    const statusArray = ["interested", "ignored"];
    if(!statusArray.includes(status)) {
        throw new Error(`Invalid status input, ${status}`);
    }
}

module.exports = { validateSignup, profileEditValidation, passwordEditValidation, validateOtp, statusValidation };