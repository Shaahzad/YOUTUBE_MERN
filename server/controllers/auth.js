import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../error.js"
import jwt from "jsonwebtoken"
export const signup = async (req,res,next)=>{
     try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        const newuser = new User({...req.body, password:hash})

        await newuser.save()
        res.status(200).json("user has been created successfully Now you can login") 
     } catch (error) {
        next(error)
     }
}

export const signin = async (req,res,next)=>{
    try {
        const user = await User.findOne({name:req.body.name})
        if(!user) return next(createError(404,"user not found"))
        const iscorrectpassword = await bcrypt.compare(req.body.password, user.password)
    if(!iscorrectpassword) return next(createError(400,"wrong credentials"))

    const token = jwt.sign({id:user._id}, process.env.JWT)
    console.log(token);
    const {password, ...others} = user._doc
    res.cookie("access_token", token,{
        httpOnly:true
    })
    
    .status(200).json({...others,token})
    } catch (error) {
       next(error)
    }
}


export const google = async (req,res,next)=>{
    try {
const user = await User.findOne({email:req.body.email})
if(user){
    const token = jwt.sign({id:user._id}, process.env.JWT)
res.cookie("access_token", token,{
    httpOnly:true
})
.status(200).json(user._doc)

}else{
    const newUser = new User({
        ...req.body,
        fromGoogle: true
    })
    const savedUser = await newUser.save()
    const token = jwt.sign({id: savedUser._id}, process.env.JWT)
    res.cookie("access_token", token,{
        httpOnly:true
    })
    .status(200).json(savedUser._doc)
    
}
    } catch (error) {
        next(error)
    }
}