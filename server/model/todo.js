const mongoose = require('mongoose')


const Todo = new mongoose.Schema({
    userId:{
        type:String,
        ref:"user",
        required:true
    },
    task:[{
        task:{type:String},
        id:{type:String},
        isComplete:{type:Boolean,default:false},
}]
 
}) 

const todo = module.exports =mongoose.model('todo',Todo)