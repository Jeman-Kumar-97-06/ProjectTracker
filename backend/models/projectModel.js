const mongoose = require("mongoose");
const Scheme   = mongoose.Schema;
const bcrypt   = require('bcrypt');
const validator= require('validator');

const projectSchema = new Schema({
    title:{type:String,required:true},
    creator:{type:mongoose.Types.ObjectId,ref:"User",required:true},
    tasks:[{
        type:mongoose.Types.ObjectId,
        ref:"Task",
        required:true
    }],
});