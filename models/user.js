const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

const User = mongoose.model('user', userSchema);
module.exports = User;