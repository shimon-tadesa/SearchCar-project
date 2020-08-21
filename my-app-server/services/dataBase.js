const mongoose = require("mongoose");





function connect(cb) {
  mongoose.connect('mongodb://localhost:27017/wixDB', { useNewUrlParser: true }).then(
    (res) => {

      console.log("connected to data base, all is good!");
      cb(res);
    }, err => {
      console.log("error connecting to the data base");
      
    });




}


module.exports = {
  connect: connect
};
