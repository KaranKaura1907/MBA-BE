const User= require('../models/user.model');
const bcrypt= require('bcryptjs');
const update= async function(req,res)
{
    try
    {
        await User.findOneAndUpdate(
            {userId:req.userId},
            {password:bcrypt.hashSync(req.body.password,8)}
        ).exec();
        res.status(200).send({
            message:"User Record has been updated"
        })
    }
    catch(e)
    {
        console.log(e.message);
        res.status(500).send({
            message:"Internal Server Error!"
        })
    }
}
const updateUser= async function(req,res)
{
    const userIdReq= req.params.userId;
    try
    {
        const user = await User.findOneAndUpdate(
            {userId: userIdReq},
            {
                name:req.body.name,
                userStatus:req.body.userStatus,
                userType:req.body.userType
            }
        ).exec();
        res.status(200).send({
            message:"User Record has been updated successfully "
        });
    }
    catch(e)
    {
       console.log(e.message);
       res.status(500).send({
          message:"Some Internal Error occured"
       })
    }
}
module.exports={
    update,
    updateUser
}