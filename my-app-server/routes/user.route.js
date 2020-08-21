const express = require('express');
const app = express();
const userService = require("./../services/user.service");


app.post("/register", (req, res) => {
    let userToCreate = req.body;
    userService.register(userToCreate, (user, err) => {
        if (err) {
            return res.status(500).json({ massage: 'internal server error' });
        }

        let response = userService.signUser(user);
        return res.status(200).json(response);

    });

});
app.post("/login", (req, res) => {

    try {
        let user = req.body;
        userService.login(user.userEmail, user.password, (user,err) => {
            if(err){
                return res.status(500).json({ massage: 'internal server error' }); 
            }
            return res.status(200).json(user);

        });
    } catch (error) {
        return res.status(500).json({ massage: 'internal server error' });
    }




   
});


module.exports = app;