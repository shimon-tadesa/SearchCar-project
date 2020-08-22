const mongoose = require("mongoose");
const gconfig = global.gConfig;




function connect(cb) {
  mongoose.connect(gconfig.db_mongo, { useNewUrlParser: true }).then(
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
