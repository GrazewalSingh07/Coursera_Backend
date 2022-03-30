const mongoose= require("mongoose");
const bcrypt=require("bcrypt")
const userSchema=new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String, required:true},
    fullname:{type:String, required:false},
    profilepic:{type:String, required:false},
    address:{type:String, required:false},
    gender:{type:String, required:false},
    birthday:{type:Date, required:false},
    phone:{type:Number, required:false},

})


userSchema.pre("save" ,function(next){ 
    const hash= bcrypt.hashSync(this.password, 8);
    this.password=hash
    return next()
})
userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password, this.password)
}
const User= mongoose.model("user", userSchema)
module.exports= User