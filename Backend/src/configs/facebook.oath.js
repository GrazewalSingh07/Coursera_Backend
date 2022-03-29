// const express=require("express");
// const router= express.Router();
const jwt = require('jsonwebtoken');
 const passport =require("passport")
require("dotenv").config()
const { v4: uuidv4 } = require('uuid');
const FacebookStrategy = require('passport-facebook').Strategy;
const newToken=(user)=>{
    return jwt.sign({user},process.env.SECRET_KEY)
}

const User=require("../model/user.model")
 


passport.use(new FacebookStrategy({
    clientID:  552345559531253,
    clientSecret:"afe8867f7681fe2b93354ff2801ef4a7",
    callbackURL: "http://localhost:4000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async function(accessToken, refreshToken, profile, cb) {
    // console.log( profile)

    let user= await User.findOne({email:profile?._json?.email}).lean().exec()
   
   if(!user){
         user= await User.create({
            username:profile._json.name,
            email:profile._json.email,
            password:uuidv4()
    
        })
    }
   
    //   console.log(profile.displayName)
      console.log(user)
    return cb(null,user);
  
}
));
module.exports= passport