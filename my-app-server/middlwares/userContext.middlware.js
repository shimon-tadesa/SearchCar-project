const jwt = require("jsonwebtoken");



function userContext(req, res, next) {

    if (req.user) {
        return next();
    }

    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);


        jwt.verify(token, "sisma sodit", (err, tokenData) => {
            if (err) {
                next();
            }

            if (tokenData) {
                req.user = tokenData;
                next()
            }
        });


    } else {
        next();
    }







}










module.exports = userContext;