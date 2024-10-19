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
module.exports = { validateSignup };