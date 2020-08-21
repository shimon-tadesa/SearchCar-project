const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken")



function signToken(data) {
   return jwt.sign(data, "sisma sodit", { expiresIn: '3d' });

}


function signUser(user) {
    let tokenData = {
        email: user.userEmail
    }

    let tokenString = signToken(tokenData);
    let tokenExpiration = new Date();
    tokenExpiration.setDate(tokenExpiration.getDate() + 3);
    return {
        userEmail: user.userEmail,
        token: tokenString,
        tokenExpiration: tokenExpiration
    }

}

function register(newUser, cb) {

    const user = new UserModel(newUser);

    user.save((err, ur) => {
        cb(ur, err);

    });
}




function login(umail, pass, cb) {
   
    UserModel.findOne({
        userEmail: umail
    }, (err, user) => {

        if (err) {
            throw "user doesnt exist";
        }

        if (user.password === pass) {
            // sign in and call cb
            let resData = signUser(user);
            cb(resData);

        }else {
            cb(null,"error bad password");
        }



    });


}




module.exports = {
    register,
    login,
    signUser



}