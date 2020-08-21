const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userEmail: {
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
      required:[true,""]
    }

  });


  const User = mongoose.model('User', userSchema);


  module.exports = User;