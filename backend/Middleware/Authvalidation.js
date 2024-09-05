const Joi = require('joi')

const singupvalditon = (req ,res,next)=>{

    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(10).required()
    });

     const {error} = joiSchema.validate(req.body);

     if(error){
          return res.status(400)
            .json({massage:"Bad request" ,error})
     }

     next();
}

const loginvalidation = (req , res , next)=>{
     
    const joiSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(10).required()
    });

    const {error} = joiSchema.validate(req.body);
    if(error){
        return res.status(400)
          .json({massage:"Bad request" ,error})
   }

   next();
}

module.exports = {
    singupvalditon,
    loginvalidation
     
}