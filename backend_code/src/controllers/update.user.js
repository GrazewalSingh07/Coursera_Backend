const express= require("express");
 const single=require("../middleware/uploadProfile")
const User = require("../models/user.model");
const {body,validationResult}=require("express-validator")
const authenticate=require("../middleware/authenticate")
const router= express.Router()

router.get("/", async(req,res)=>{
    try {
        const user= await User.find().lean().exec();
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.patch("/:id",authenticate, async(req,res)=>{
    try {
        
        console.log(req.file)
        // if(req.file.path){
        //     //  var newprofile= req.file.path
        //     console.log(req.body)
        //        let finduser=await User.findOne({_id:req.params.id}).lean().exec();
        //        console.log(finduser)
        //        finduser.profilepic=null
        //       let user= await User.findByIdAndUpdate(
        //         req.params.id,
        //          {  
        //              fullname:req.body.fullname,
        //              profilepic:req.file.path,
        //              address:req.body.address,
        //              gender:req.body.gender,
        //             //  birthday:req.body.birthday,
        //              phone:req.body.phone

        //          }
        //         ,{new:true}).lean().exec()
        //         console.log(user)
        //         res.status(200).send({message:user})
            //  }

 
            // else{
               
                const user= await User.findByIdAndUpdate(
                     req.params.id,
                      req.body
                     ,{new:true}).lean().exec()
                     console.log(user)
                     return res.status(200).send(user)
            // }
           
            
               
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports= router