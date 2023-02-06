const mongoose = require("mongoose")
const userModel=require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const SECRET_KEY = "HMENUAPI"

const signup = async(req, resp)=>{

     //Existing User Check
     //Hashed Password : because we dont save direct password if database hacked then they dont know
     //User Creation
     //Token Generate
    const {username, email, password}=req.body;
    try{
        //to use await signup fn should async
        const existingUser = await userModel.findOne({email:email})
        if(existingUser){
            return resp.status(400).json({message:"User already exists"})

        }
        const hashedPassword = await bcrypt.hash(password, 10)
        //interacting with db that's why await
        const result = await userModel.create({
            email:email,
            password:hashedPassword,
            username: username
        });
        const token = jwt.sign({email : result.email, id:result._id}, SECRET_KEY );
        resp.status(200).json({user:result, token:token})
    } catch(error){
        console.log(error)
        resp.status(500).json({message:"Something went wrong!!!"})
    }

};

const signin= async (req, resp)=>{
   const {email, password}=req.body;
   try {
    const existingUser = await userModel.findOne({email:email});
    if(!existingUser){
        return resp.status(404).json({message:"User not found"})

    }
    const matchPassword = await bcrypt.compare(password, existingUser.password)
    if(!matchPassword){
        return resp.status(404).json({message:"Invalid Credentials"})

    }
    const token = jwt.sign({email:existingUser.email, id:existingUser._id}, SECRET_KEY)
    resp.status(201).json({user:existingUser, token:token})

   } catch (error) {
    console.log(error)
    resp.status(500).json({message:"Something went wrong"})

   }
}

module.exports={signup, signin};