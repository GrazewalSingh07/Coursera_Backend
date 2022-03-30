const express= require("express")
// const passport= require("./configs/facebook.oath")
// const path= require("path")
var cors = require('cors')
const app=express();
app.use(express.json())
app.use(cors())
module.exports=app
const  RegisterController=require("./controller/Register.controller");
const loginController= require("./controller/login.controller")
// const facebookOauth=require("./configs/facebook.oath")
app.use("/register",RegisterController)
app.use("/login",loginController)
// app.use("/auth/facebook", facebookOauth)

// app.get('/auth/facebook',
//   passport.authenticate('facebook',{scope: 'public_profile,email'}));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' , session:false}),
//   function(req, res) {
//     // Successful authentication, redirect home.
     
//     res.redirect('/');
     
//   });
