const express= require("express");
 const single=require("../middleware/uploadProfile")
const User = require("../models/user.model");
const {body,validationResult}=require("express-validator")
const authenticate=require("../middleware/authenticate")
const router= express.Router();

router.get("/", async(req,res)=>{
    try {
        const user= await User.find().lean().exec();
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.patch("/:id",authenticate,single("profilepic"), async(req,res)=>{
    try {
        
        console.log(req.body)
        if(req.file.path){
            //  var newprofile= req.file.path
               let finduser=await User.findOne({_id:req.params.id}).lean().exec();
               finduser.profilepic=null
              let user= await User.findByIdAndUpdate(
                req.params.id,
                 {  
                     fullname:req.body.fullname,
                     profilepic:req.file.path,
                     address:req.body.address,
                     gender:req.body.gender,
                    //  birthday:req.body.birthday,
                     phone:req.body.phone

                 }
                ,{new:true}).lean().exec()
                res.status(200).send(user)
             }

 
            else{
                console.log(req.body)
                const user= await User.findByIdAndUpdate(
                     req.params.id,
                      req.body
                     ,{new:true}).lean().exec()
                    
                     return res.status(200).send(user)
            }
           
            
               
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports= router