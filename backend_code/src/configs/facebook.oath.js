// const express=require("express");
// const router= express.Router();
const jwt = require('jsonwebtoken');
 const passport_fb =require("passport");
require("dotenv").config()
const { v4: uuidv4 } = require('uuid');
const FacebookStrategy = require('passport-facebook').Strategy;
const newToken=(user)=>{
    return jwt.sign({user},process.env.SECRET_KEY)
}

const User=require("../models/user.model")

passport_fb.use(new FacebookStrategy({
    clientID:  1184217039016257,
    clientSecret:"bcaba0960ce0984e8cf4efc9de70c0d6",
    callbackURL: "http://localhost:5000/auth/facebook/callback",
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
module.exports= passport_fb