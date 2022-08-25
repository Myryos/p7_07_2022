const express = require('express');
const userCtrl = require('../controllers/user.js');
const router = express.Router();



router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login)

router.get('/refresh', userCtrl.refreshMyToken)

module.exports = router;