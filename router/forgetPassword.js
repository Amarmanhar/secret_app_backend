const express  = require('express');
const router = express.Router();
const Sib =  require('sib-api-v3-sdk');
const uuid = require('uuid');
require('dotenv').config();

const User = require('../models/user');

router.post('/forgot-password', async(req, res)=>{

    var defaultClient = Sib.ApiClient.instance;

    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;


        const {email }= req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }

          const id = uuid.v4();
          user.resetPasswordToken = id;
          user.resetPasswordExpires = Date.now() + 900;
          await user.save();

          const sender = {email: "nkamar1412@gmail.com" };
          const to = [{ email: email }];
          const subject = "Reset Your Password";
          const htmlContent = `<a href="http://localhost:8000/password/resetpassword/${id}">Reset password</a>`;
      
          const apiInstance = new Sib.TransactionalEmailsApi();
          const sendSmtpEmail = new Sib.SendSmtpEmail();
          sendSmtpEmail.sender = sender;
          sendSmtpEmail.to = to;
          sendSmtpEmail.subject = subject;
          sendSmtpEmail.htmlContent = htmlContent;

          try {
                await apiInstance.sendTransacEmail(sendSmtpEmail);
            res.status(200).json('Reset password link has been sent');
          }
           catch (err) {
           console.log(err);
           res.status(500).json("Failed to send reset password link");
       }


    
})

router.get('/resetpassword/:id', async(req,res)=>{

    const id = req.params.id;
    const html = `
        <html>
            <script>
                function formsubmitted(e){
                    e.preventDefault();
                    console.log('called')
                }
            </script>

            <form action="http://localhost:8000/password/updatepassword/${id}" method="get">
                <label for="newpassword">Enter New password</label>
                <input name="newpassword" type="password" required></input>
                <button>reset password</button>
            </form>
        </html>
    `;

    res.status(200).send(html);

    res.end();

})

router.get('/updatepassword/:id', async(req, res)=>{

       const {newPassword} = req.body;
       const id = req.params.id;

       const user = await User.findOne({
        resetPasswordToken: id,
        resetPasswordExpires: { $gt: Date.now() },
       });

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
    
        await user.save();
    
        res.json({ message: 'Password reset successful' });

})




module.exports = router;