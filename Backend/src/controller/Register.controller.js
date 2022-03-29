const express=require("express");
const router= express.Router();
const User=require("../model/user.model")
const jwt = require('jsonwebtoken');
require("dotenv").config()
const {body, validationResult}=require("express-validator")

const newToken=(user)=>{
    return jwt.sign({user},process.env.SECRET_KEY)
}
router.post("/",body("username")
.not().isEmpty().bail().isString().bail().withMessage("Please enter username").bail(),
body("email").not().isEmpty().bail().isEmail().withMessage("Please enter a valid email address").bail().custom(async(value)=>{
    let user=await User.find({email:value}).lean().exec()
    if(user===[]){
        console.log(user)
        throw new Error("Email already exists")
    }
    
    return true
}).bail()
,body("password").not().isEmpty().bail().isLength({min:8,max:25}).bail().custom((value)=>{
    const regex= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!value.match(regex)){
         throw new Error("Password must be strong");
    }
         return true;
}).bail(),async(req,res)=>{
    try {

        // const errors = validationResult(req);
        // if (errors.isEmpty()) {
            
        // }
        // const extractedErrors = []
        // errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      
        // return res.status(422).json({
        //   errors: extractedErrors,
        // });
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            
            return res.status(400).json({error:errors.array()})
     
    }
    const user= await User.create(req.body)
            const token=newToken(user)
           return  res.status(200).send({token:token})
    } catch (error) {
        if(error.code===11000){
           return res.status(500).send("Register successful please login ")
        }
       throw new Error("")
        
    }
})
router.get("/",async(req,res)=>{
    try {
        const user= await User.find().lean().exec()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
})
module.exports= router