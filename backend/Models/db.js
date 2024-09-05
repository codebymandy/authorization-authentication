const mongoose = require('mongoose');

const mongodb = process.env.MONGODB_CON;

mongoose.connect(mongodb)
  .then(() =>{

      console.log('Monogodb Connected...')
  }).catch((err)=>{
       
     console.log('Monogodb not connected...' , err)
  })