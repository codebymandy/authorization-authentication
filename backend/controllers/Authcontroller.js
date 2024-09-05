const usermodel = require("../Models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
 const singup = async (req , res)=>{
   try{

     const {name , email , password} = req.body;
     const user = await usermodel.findOne({email});
     if(user){
         return res.status(409)
                .json({massage:"user is already exist" , succes:false})
     }

     const userModel = new usermodel({name , email  , password});
     userModel.password = await bcrypt.hash(password , 10);
     await userModel.save();

     res.status(201)
     .json({massage:"singup successfully" , succes:true})


   }catch(err){
         
    res.status(500)
     .json({massage:"internal server error" , succes:false})

   }

 }

 const login = async (req , res)=>{
  try{

    const { email , password} = req.body;
    const user = await usermodel.findOne({email});
    if(!user){
        return res.status(403)
               .json({massage:"Auth Failed email or  password is wrong" , succes:false})
    }

    const ispassEqual = await bcrypt.compare(password , user.password)

    if(!ispassEqual){
       return res.status(403)
                .json({massage:"Auth Failed email or  password is wrong" , succes:false})
    }

    //JWT Tooken

    const jwtToken = jwt.sign(
      {email: user.email , _id: user._id},
      process.env.JWT_SECRET ,
      {expiresIn: '24h'}

    )

    res.status(201)
    .json({
      massage:"login successfully" ,
      succes:true,
      jwtToken,
      email,
      name: user.name
      })


  }catch(err){
        
   res.status(500)
    .json({massage:"internal server error" , succes:false})

  }

}

 module.exports = {
     singup ,
     login
 }