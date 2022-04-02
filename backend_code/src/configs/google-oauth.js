const jwt = require("jsonwebtoken");

const passport = require("passport");

require("dotenv").config();

const { v4: uuidv4 } = require('uuid');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const newToken=(user)=>{
  return jwt.sign({user},process.env.SECRET_KEY)
}

const User=require("../models/user.model");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },

  async function(accessToken, refreshToken, profile, callback) {
    try {
      //   console.log(accessToken,profile,callback)
      let user= await User.findOne({email:profile?._json?.email}).lean().exec()
 
      if(!user){
            user= await User.create({
               username:profile._json.name,
               email:profile._json.email,
               password:uuidv4()
       
           })
       }
      
      //    console.log(user)
      let token = newToken(user)
       return callback(null,user,token);
     
   } catch (error) {
       console.log(error)
   }

  
}
));
module.exports= passport;