const express  = require('express');
const router = express.Router();

const secretRouter = require('../controller/secret');


router.post('/post-secrets', secretRouter.postSecrets);
router.get('/get-secrets', secretRouter.getSecrets);

module.exports  = router;