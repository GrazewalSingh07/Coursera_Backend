const express = require("express");

const passport = require("./configs/google-oauth");
const path = require("path");
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
module.exports=app
const connect = require("./configs/db");


//---------------------------log in code ---------------------

const  RegisterController=require("./controllers/Register.controller");
const loginController= require("./controllers/login.controller");

app.use("/register",RegisterController)
app.use("/login",loginController)

// log code ends ---------------------------

//----------------------------forget pass-----------------

const updateUserController= require("./controllers/update.user")
 const forgotpasswordController= require("./controllers/forgotPsword.contoller")
 const ResetpasswordController= require("./controllers/Resetpassword.controller")
 app.use("/reset-password",ResetpasswordController)

 app.use("/edit-profile",updateUserController);
app.use("/forgot-password", forgotpasswordController);



const GoogleStrategy = require("passport-google-oauth20");

 app.get('/auth/google',
  passport.authenticate('google',{scope: [ 'public_profile','email']}));
 
  app.get('/auth/google/callback',
  //passport.authenticate('google', { failureRedirect: '/login' , session:false}),
  passport.authenticate('google',  {scope: 'https://www.googleapis.com/auth/plus.login', session:false}),
  function(req, res) {

    // return res.send({token:res.req.authInfo,user: res.req.user});
    console.log(res.req.user);
    console.log(res.req.authInfo);
    res.redirect('http://127.0.0.1:5500/index.html');
     
  });

app.listen(5000, async () => {
    try{
        await connect();
        console.log("listening on port 5000");
    }
    catch(err){
        console.log(err.message);
    }
});

//-------------------------------facebook code

const passport_fb= require("./configs/facebook.oath");

app.get('/auth/facebook',
  passport.authenticate('facebook',{scope: 'public_profile,email'}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' , session:false}),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(res.req.user)
    console.log(res.req.authInfo)
  //  return res.send({user:res.req.user,token:res.req.authInfo})
     
    // .req.user
    res.redirect('http://127.0.0.1:5500/index.html');
     
  });