const GoogleStrategy = require('passport-google-oauth20').Strategy;

const passport = require("passport");

const { v4: uuidv4 } = require('uuid');

const jwt = require("jsonwebtoken");

require("dotenv").config();

const newToken=(user)=>{
  return jwt.sign({user},process.env.SECRET_KEY)
}

const User=require("../models/user.model")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },

  async function(accessToken, refreshToken, profile, cb) {

    let user= await User.findOne({email:profile?._json?.email}).lean().exec()

    if(!user){
      user= await User.create({
         username:profile._json.name,
         email:profile._json.email,
         password:uuidv4()
     });
 }
   
   let token = newToken(user);
  return cb(null,user,token);
}
));

module.exports= passport
