const express= require("express")
const passport= require("./configs/facebook.oath")
const path= require("path")

var cors = require('cors')
const app=express();
app.use(express.json())
app.use(cors())
module.exports=app
const  RegisterController=require("./controller/Register.controller");
const loginController= require("./controller/login.controller")
 const updateUserController= require("./controller/update.user")
 const forgotpasswordController= require("./controller/forgotPsword.contoller")
 const ResetpasswordController= require("./controller/Resetpassword.controller")
 app.use("/reset-password",ResetpasswordController)
 
app.use("/register",RegisterController)
app.use("/login",loginController)
app.use("/edit-profile",updateUserController)
app.use("/forgot-password", forgotpasswordController)
 

app.get('/auth/facebook',
  passport.authenticate('facebook',{scope: 'public_profile,email'}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' , session:false}),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(res.req.user)
    console.log(res.req.authInfo)
   return res.send({user:res.req.user,token:res.req.authInfo})
     
    // .req.user
    res.redirect('http://127.0.0.1:5500/index.html');
     
  });
