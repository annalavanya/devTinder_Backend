const auth = (req,res,next) => {
    const token = 'lavanya';
    const isAuthorize = token === 'lavanya';
    if(!isAuthorize) {
        res.status(401).send("Authentication failed");
    } else {
        next();
    }
};
module.exports = { auth };