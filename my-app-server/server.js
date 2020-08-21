const express = require('express');
const path = require('path');
const app = express();
 



const userRoute = require("./routes/user.route");
const carRoute = require("./routes/car.route");
const dataBase = require('./services/dataBase'); 

dataBase.connect((res) => {
    startServer();
});

function startServer() {
    app.listen(process.env.PORT || 9091, () => {
        console.log("server started at port : " + (process.env.PORT || 9091))
    });
}


app.get('/ping', function (req, res) {
    return res.send('pong');
});


 
//express global middlware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// define static folder to serve client    
app.use(express.static(path.join(__dirname, 'build')));

// server apis
app.use("/api/user", userRoute); //user routes
app.use("/api/car", carRoute)  // car apis




