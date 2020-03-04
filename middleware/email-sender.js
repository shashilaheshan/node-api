function sendEmail(req, res, next) {
    console.log("Calling Email Sender Middleware");
    next();
}

module.exports = sendEmail;
