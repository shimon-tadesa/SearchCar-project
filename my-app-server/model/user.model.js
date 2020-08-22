const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
     type: String,
     required: true,
     unique: true,
     validate: {
      validator: function(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
  }
    },
    password: {
      type:String,
      validate: {
        validator: function(v) {
          // TODO validate password only needed for local user account
            if(this.type=="local"){
              return true;
            }
            else{
              return true;
            }
        },
        message: "password is required1"
      
    }},
    type:String,
    familyName:String,
    firstName:String,
    imageUrl:String

  });
 

  const User = mongoose.model('User', userSchema);


  module.exports = User;