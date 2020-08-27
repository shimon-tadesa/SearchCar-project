const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const gConfig = global.gConfig;

// create jwt token from object
function createToken(data) {
  return jwt.sign(data, gConfig.jwtSecret, { expiresIn: "3d" });
}

// create jwt token from user object ,and return token with user details
function signUser(user) {
  let tokenString = createToken({ ...user });
  let tokenExpiration = new Date();
  tokenExpiration.setDate(tokenExpiration.getDate() + 3);
  return {
    ...user,
    token: tokenString,
    tokenExpiration: tokenExpiration,
  };
}

// register new user
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
    if (error == "error bad password") {
      throw "error bad password";
    }
    throw "error login user";
  }
}

// login extrnal users e.g facebook google
// if user doesnt exist in db than register it
async function onOauthLogin(user) {
  const dbUser = await UserModel.findOne({ email: user.email });
  let userObj;
  // if doesnt exist  create user
  if (!dbUser) {
    await register(user);
  } else {
    //should remove id from response
    userObj = dbUser.toJSON();
    delete userObj._id;
    delete userObj.__v;
  }

  //sign in user
  let resData = signUser(userObj);
  return resData;
}

// get google user details using accsess token
async function loginGoogle(accessToken) {
  try {
    //get user details
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token="${accessToken}"`
    );

    const user = {
      email: data.email,
      type: "google",
      familyName: data.family_name,
      firstName: data.given_name,
      imageUrl: data.picture,
    };
    return onOauthLogin(user);
  } catch (error) {
    throw "failed to login with google account";
  }
}

// get facebook user details using accsess token and user id
async function loginFacebook(userId, accessToken) {
  try {
    //get facebook user details
    const { data } = await axios.get(
      `https://graph.facebook.com/${userId}?fields=id,name,first_name,last_name,email,picture{url}&access_token=${accessToken}`
    );

    const user = {
      email: data.email,
      type: "facebook",
      familyName: data.last_name,
      firstName: data.first_name,
      imageUrl: data.picture.data.url,
    };
    // login  facebook user
    return onOauthLogin(user);
  } catch (err) {
    throw "error validating user!";
  }
}

async function login(user) {
  if (user.type == "local") {
    return await loginLocal(user.email, user.password);
  } else if (user.type == "google") {
    return await loginGoogle(user.accessToken);
  } else if (user.type == "facebook") {
    return await loginFacebook(user.id, user.accessToken);
  }
}

module.exports = {
  register,
  login,
};
