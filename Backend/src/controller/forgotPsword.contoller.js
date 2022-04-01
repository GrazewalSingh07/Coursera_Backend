 
const express = require("express");
const User= require("../model/user.model")
const router= express.Router();
 const path= require("path")
 const {body, validationResult}=require("express-validator")
const transporter=require("../configs/mail")
router.post("/",
body("email").not().isEmpty().withMessage("Please enter email ").bail()
.isEmail().withMessage("Please enter a valid email address").bail().custom(async(value)=>{
let user= await User.findOne({email:value}).lean().exec()
    if(!user){
    throw new Error("Email is not registered, Please register first")
    }
    return true
})
,async(req, res)=>{
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            
            return res.status(400).json({error:errors.array()})
     
        }
        const user = await User.findOne({email:req.body.email}).lean().exec()
    // const user = await User.findOne({_id:req.params.id}).exec()
    //  console.log(user)
        transporter.sendMail({
            from: '"Coursera 👻" <coursera-admin@coursera.com>', // sender address
            to:user.email,
            subject: "Coursera Password Reset", // Subject line
            text: "Hi "+user.username+", OTP to reset the password is 123456",
            html:{path:"mail.html"}, // html body
          });
          return res.status(200).send({message:"Please enter OTP sent on registered email", userId:user._id})
    } catch (error) {
        console.log(error)
    }
})

module.exports=  router