const mongoose = require('mongoose')

const user = new mongoose.Schema({
    Name:{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:Number,requied:true},
    DOB:{type:Number,required:true}
})

const newuser = mongoose.model("newuser",user);

module.exports= newuser