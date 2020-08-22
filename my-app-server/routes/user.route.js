const express = require('express');
const app = express();
const userService = require("./../services/user.service");


app.post("/register", async (req, res) => {  

    try {
        let userToCreate = req.body;
        const user = await userService.register(userToCreate);
        let response = userService.signUser(user);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ massage: 'internal server error' });  
    }   

});


app.post("/login", async (req, res) => {

    try {
        let user = req.body;
       const retUser = await userService.login(user);
       return res.status(200).json(retUser);
    } catch (error) {
        return res.status(500).json({ massage: 'internal server error' });
    }
   
});


module.exports = app;