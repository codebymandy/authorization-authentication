
const express = require('express')
const router = express.Router()
const { singup, login } = require('../controllers/Authcontroller');
const { singupvalditon, loginvalidation } = require('../Middleware/Authvalidation');



router.post('/singup', singupvalditon , singup);
router.post('/login', loginvalidation , login);


module.exports = router;