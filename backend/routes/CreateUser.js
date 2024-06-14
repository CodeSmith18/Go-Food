const express=require("express");
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const jwt =require("jsonwebtoken");
const jwtSecret="MyNameIsHarshitaKediandIamwebDev";


router.post("/createuser",[
body("name").isLength({min:5}),
body('email','Incorrect Email').isEmail(),
body('password','Incorrect Password').isLength({min:5})]
,async(req,res)=>{

    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  const salt = await bcrypt.genSalt(10);
  let secPassword=await bcrypt.hash(req.body.password,salt)
      try {
       
       const user= await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        });
        console.log(user);
        res.json({success:true});
      } 
      catch (error) {
        console.log(error);
        res.json({success:false});
      }
});


router.post("/loginuser",[
    body('email','Incorrect Email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})]
    ,async(req,res)=>{
    
        const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
    let email=req.body.email;
          try {
         let userdata=  await User.findOne({email});
         if(!userdata)
            return res.status(400).json({ errors:"Try logging in with correct Credentials"});

         const pwdcompare=await bcrypt.compare(req.body.password,userdata.password);
          if(!(pwdcompare))
            {
                return res.status(400).json({ errors:"Try logging in with correct Credentials"});
            }
            const data={
                user:{
                    id:userdata.id
                }
            }

            const authToken=jwt.sign(data,jwtSecret)
            return res.json({success:true,authToken:authToken});
          } 
          catch (error) {
            console.log(error);
            res.json({success:false});
          }
    });
module.exports=router;