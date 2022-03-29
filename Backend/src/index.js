const express= require("express")

var cors = require('cors')
const app=express();
app.use(express.json())
app.use(cors())
module.exports=app
const  RegisterController=require("./controller/Register.controller");
const loginController= require("./controller/login.controller")
app.use("/register",RegisterController)
app.use("/login",loginController)
 
