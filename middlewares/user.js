const user = (req,res,next) => {
    const token = 'lavanya';
    const isUser = token === 'lavanya';
    if (!isUser) {
        res.status(401).send("Invalid user");
    } else {
        next();
    }
}
module.exports = { user };