const express=require("express");
const router= express.Router();
const User=require("../model/user.model")
const jwt = require("jsonwebtoken");
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
}).bail(), async(req,res)=>{
    try {

        const errors=validationResult(req)
        if(!errors.isEmpty()){
            
            return res.status(400).json({error:errors.array()})
     
        }
        let user= await User.findOne({email:req.body.email}).lean().exec()
        if(user){
            return res.status(400).send({message:"Email or password incorrect"})
        }
        // create user for new email
        user= await User.create(req.body)
        console.log(user)
        // const token = newToken(user)
        //      console.log(token)
            
        return res.status(200).send(user)
        // const user= await User.create(req.body)
      
        //     const token=newToken(user)
       
        //    return  res.status(200).send({user,token})
    } catch (error) {
        if(error.code===11000){
           return res.status(500).send("Register successful please login ")
        }
        return res.status(400).send(error)
        
    }
})
router.get("/",async(req,res)=>{
    try {
        const user= await User.find().lean().exec()
      return  res.status(200).send(user)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
})
module.exports= router