const express = require('express');
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 8000

const mongodb = require('./db/db')

const userRouter = require('./router/user');
const SecretsRouter = require('./router/secret');
const PasswordRouter = require('./router/forgetPassword')

app.use(cors());
app.use(express.json());
require('dotenv').config();

app.use('/add', userRouter);
app.use('/postmsg', SecretsRouter);
app.use('/password', PasswordRouter);


mongodb();
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})