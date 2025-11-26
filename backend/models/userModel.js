const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcrypt');
const validator= require('validator');

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['creator','member']}
},{timestamps:true});

userSchema.statics.signup = async function(name,email,password,role) {
    if (!validator.isEmail(email)){
        throw Error("Invalid Email!");
    }
    if (!validator.isStrongPassword(password)){
        throw Error("Password not Strong enough!")
    }
    if (role !== 'creator' || role !== 'member') {
        throw Error("Role should be 'Creator/Member'!")
    }
    const exists = await this.findOne({email});
    if (exists) {
        throw Error("Email Already Exists!");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = await this.create({name,email,password:hash,role:role});
    return user
}

userSchema.statics.login = async function(email,password) {
    const user = await this.findOne({email:email});
    if (!user) {
        throw Error("Incorrect Username");
    }
    const match = await bcrypt.compare(password,user.password);
    if (!match) {
        throw Error("Incorrect Password!");
    }
    return user;
};

module.exports = mongoose.model("projuser",userSchema);