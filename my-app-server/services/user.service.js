const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const gConfig = global.gConfig;

function signToken(data) {
  return jwt.sign(data, gConfig.jwtSecret, { expiresIn: "3d" });
}

function signUser(user) {
   
  let tokenString = signToken({...user});
  let tokenExpiration = new Date();
  tokenExpiration.setDate(tokenExpiration.getDate() + 3);
  return {
    ...user,
    token: tokenString,
    tokenExpiration: tokenExpiration,
  };
}

async function register(newUser) {
  try {
    const user = new UserModel(newUser);
    let userFromDb = await user.save();
    return userFromDb.toJSON();
  } catch (error) {
    throw "error registering user";
  }
}

async function loginLocal(umail, pass) {
  try {
    let userFromDb = await UserModel.findOne({
      email: umail,
    });

    userFromDb = userFromDb.toJSON();
    //compare supplied password with password from db
    if (userFromDb.password === pass) {
      // sign in and call cb
      let resData = signUser(userFromDb);
      return resData;
    } else {
      throw "error bad password";
    }
  } catch (error) {
    if(error=="error bad password"){
      throw "error bad password";
    }
    throw "error login user";
  }
}

function verifyOauth(email,emailFromToken){
  return (email == emailFromToken);
}

async function onOauthLogin (user) {
   
    const dbUser = await UserModel.findOne({ email: user.email });
    let userObj;
    if (!dbUser) {
      //  create user
      userObj = {
          email:user.email,
          type:user.type,
          familyName:user.familyName,
          firstName: user.firstName,
          type:user.type,
          imageUrl:user.imageUrl
      }
      await register(userObj);
       
    }else{
        //should remove id from response
      userObj =  dbUser.toJSON();
      delete userObj._id;
      delete userObj.__v
    }

    //sign in user
    let resData = signUser(userObj);
    return resData;
}


async function loginGoogle(user) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="${user.accessToken}"`
    );

    if(verifyOauth(user.email,res.data.email)){
    return  onOauthLogin(user);
    }
    else{
      throw "unauthorized user";
    }

  } catch (error) {
    throw "failed to login with google account";
  }
}

async function loginFacebook(user) {
  try {
    const res = await axios.get(
      `https://graph.facebook.com/${user.id}?fields=email&access_token=${user.accessToken}`
    );

    if(verifyOauth(user.email,res.data.email)){
      return  onOauthLogin(user);
    }
    else{
      throw "unauthorized user";
    }
    
  }catch(err){
    throw "error validating user!";
  }
}

 

async function login(user) {
  if (user.type == "local") {
    return await loginLocal(user.email, user.password);
  } else if (user.type == "google") {
    return await loginGoogle(user);
  }else if(user.type=="facebook"){
    return await loginFacebook(user);
  }
}

module.exports = {
  register,
  login,
  signUser
};
