const express  = require('express');
const router = express.Router();

const userContoller = require('../controller/user');

router.post('/user', userContoller.SignUp);
router.post('/login', userContoller.Login);

router.post('/forgot-password', );

module.exports = router;
