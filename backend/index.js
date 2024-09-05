require('dotenv').config();
const express = require('express')
const AuthRouter = require('./Routers/AuthRouter')
const ProductRouter = require('./Routers/ProductRouter')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')


 require ('./Models/db')
 app.use(bodyParser.json()) 
 app.use(cors())

 //Router middle
 app.use('/auth' , AuthRouter)
 app.use('/Products' , ProductRouter)

const PORT = process.env.PORT || 8080;

app.get("/",(req,res) =>{
     
     res.send('Hello')
})

app.listen(PORT , ()=>{
     
     console.log(`server is runing on ${PORT}`)
})