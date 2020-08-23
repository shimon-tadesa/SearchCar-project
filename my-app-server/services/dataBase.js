const mongoose = require("mongoose");
const gconfig = global.gConfig;




function connect(cb) {
  console.log("db address is :"+gconfig.dbHost);
  mongoose.connect(gconfig.dbHost, { useNewUrlParser: true }).then(
    (res) => {

      console.log("connected to data base, all is good!");
      cb(res);
    }, err => {
      console.log("error connecting to the data base" ,err);
      
    });




}


module.exports = {
  connect: connect
};
