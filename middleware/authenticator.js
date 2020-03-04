function authenticate(req, res, next) {
    console.log("Calling Authenticator Middleware");
    next()
}

module.exports = authenticate;
