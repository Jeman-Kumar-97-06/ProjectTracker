const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = requrie('bcrypt');

const projectSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    description:{type:String,default:''},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    members:{
        type:[
            {
                user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
                role:{type:String,enum:['owner','admin','member',],default:'member'}
            }
        ],
        default: function(){
            return [
                {
                    user:this.owner,
                    role:"owner"
                }
            ]
        }
    },
    status:{
        type:String,
        enum:["active","archived"],
        default:"active"
    },
    progress:{
        type:Number,
        default:0,//Calculate based on tasks.
    }
},{timestamps:true});