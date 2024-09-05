const express = require('express');
const ensureAuthenticated = require('../Middleware/Auth');
const router = express.Router()

router.get('/', ensureAuthenticated ,(req , res)=>{

       res.status(201).json([
           
            {
                name: 'phone',
                price: 10000
            },

            {
               name: 'Laptop',
               price: 700000
            }
       ])

});


module.exports = router ;