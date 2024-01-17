const Secrets = require('../models/secret');

exports.postSecrets = async(req, res)=>{

    const { message } = req.body;
   try{
     
    const newSecret = new Secrets({ message });
    await newSecret.save();
    res.status(201).json({ success: true, message: 'Secret posted successfully' })


   }catch(err){
    console.log(err);
   }
}

exports.getSecrets = async(req, res)=>{
    try{
       
        const secrets = await Secrets.find();
        res.json(secrets);

    }catch(err){
        console.log(err)
    }
}