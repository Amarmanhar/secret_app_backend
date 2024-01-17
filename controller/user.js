const User = require('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.SignUp = async(req, res)=>{

  try{

    const {name, email, password} = req.body;

    const hash_password = await  bcrypt.hash(password, 10);
    const new_user = new User({
         name,
         email,
        password: hash_password
    })
    const user=  await new_user.save();
    res.status(200).json(user);


  }catch(err){
    console.log(err)
  }
}


const secretKey = process.env.MY_SECRET_KEY;

exports.generateToken = (id,name,)=>{
    
    return jwt.sign({userId : id, name: name}, secretKey);
}


exports.Login = async(req, res)=>{

    try{
     
      const { email, password } = req.body;
        
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json("Email or phone number is not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json("Wrong password");
        }

        const token = exports.generateToken(user._id, user.name, user.isPremiumUser);

        res.status(200).json({ message: "User logged in successfully", token });

    }catch(err){
        console.log(err)
    }

}

