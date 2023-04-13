const User= require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const authConfig=require('../configs/auth.config');
const constants=require('../utils/constants')
const signup= async function(req,res){
    let userStatus= req.body.userStatus;
    if(!userStatus)
    {
        if(!req.body.userType || req.body.userType===constants.userTypes.customer)
           userStatus= constants.userStatus.approved
        else
           userStatus= constants.userStatus.pending   
    }
    try{
        let user = await User.create({
            name:req.body.name,
            userId:req.body.userId,
            email:req.body.email,
            userType:req.body.userType,
            userStatus:userStatus,
            password:bcrypt.hashSync(req.body.password,8)
        });
        let response={
            name:user.name,
            id:user._id,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            userStatus:user.userStatus
        }
        res.status(200).send(response)
    }
    catch(e)
    {
        console.log(e.message)
        res.status(500).send("Some Internal Server Error while creating the user")
    }
}
const signin= async function(req,res){
    try
    {
        const user= await User.findOne({
            userId:req.body.userId
        });
        if(user === null)
        {
            res.status(401).send("User with the given userId not found!");
            return;
        }
        const isPasswordValid= bcrypt.compareSync(req.body.password,user.password);
        if(!isPasswordValid)
        {
            res.status(403).send("Invalid Password!");
            return;
        }
        const token= jwt.sign({id:user.userId},authConfig.secret,{
            expiresIn: 600
        })
        res.status(200).send({
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            userStatus:user.userStatus,
            accessToken:token
        })
    }
    catch(e)
    {
        console.log(e.message);
        res.status(400).send("Internal Server Error")
    }
}
module.exports={
    signup,
    signin
}