const mongoose = require('mongoose')


const User = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
}) 

const users = module.exports =mongoose.model('User',User)