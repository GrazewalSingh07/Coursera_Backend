const mongoose= require("mongoose");

const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String,required:false, unique:true},
    password:{type:String, required:true}
});

userSchema.pre("save" ,function(next){ 
    const hash= bcrypt.hashSync(this.password, 8);
    this.password=hash;
    return next();
});

userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password, this.password);
};

const User= mongoose.model("user", userSchema);
module.exports= User;


