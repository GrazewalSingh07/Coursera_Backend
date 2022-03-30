const express= require("express");
 
const User = require("../model/user.model");
const authenticate=require("../middleware/authenticate")
const router= express.Router()

// router.get("/", async(req,res)=>{
//     try {
//         const user= await User.find().lean().exec();
//         res.status(200).send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })
router.delete("/:id",authenticate, async(req,res)=>{
    try {
        const user= await User.findByIdAndDelete(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports= router