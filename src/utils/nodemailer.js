const nodemailer = require("nodemailer");
const { CONFIG } = require("../config/config");

const sendMailFunction = async (toMail, mailContent) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: CONFIG.user,
                pass: CONFIG.pass
            }
        });
        const mailOptions = {
            from: CONFIG.user, // Sender address
            to: toMail, // Recipient address
            subject: 'Password change',
            // text: 'This is a plain text email sent using Node.js and Nodemailer!', // Plain text content
            html: mailContent // HTML content
        };
        let mailData = await transporter.sendMail(mailOptions);
        if (!mailData) {
            throw new Error("Mail cannot be send");
        };
        return mailData;
    } catch (error) {
        res.status(400).send("Error in sending mail : " + " " + error.message);
    }
}
module.exports.sendMailFunction = sendMailFunction;