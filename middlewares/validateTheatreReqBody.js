const Theatre= require('../models/theatre.model');
const validateTheatreRequestBody= async (req,res,next)=>
{
   if(!req.body.name)
   {
    return res.status(400).send("Failed! Name not provided")
   }
   if(!req.body.city)
   {
    return res.status(400).send("Failed! City not provided")
   }
   if(!req.body.description)
   {
    return res.status(400).send("Failed! Description not provided")
   }
   if(!req.body.pinCode)
   {
    return res.status(400).send("Failed! pinCode not provided")
   }
   try
   {
    let theatre= await Theatre.findOne({
        name:req.body.name,
        pinCode:req.body.pinCode
    })
    if(theatre!=null)
    {
        return res.status(400).send("Failed! Theatre is already registered")
    }
   }
   catch(e)
   {
    console.log(e.message)
    return res.status(500).send("Internal Server Error!")
   }
   next();
}
const verifyTheatreReqBody={
    validateTheatreRequestBody:validateTheatreRequestBody
};
module.exports=verifyTheatreReqBody;
