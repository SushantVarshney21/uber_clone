const userModel = require("../models/user.model");
const userService = require("../services/user.service")
const {validationResult} = require("express-validator")
const blacklistTokenModel = require("../models/blacklisttoken.model")

module.exports.registerUser = async(req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname, lastname, email, password} = req.body

    const isUserAlreadyRegistered = await userModel.findOne({email})
    if(isUserAlreadyRegistered){
        return res.status(400).json({error: "User already registered "})
    }
    const hashedPassword = await userModel.hashPassword(password)
    
    const user = await userService.createUser({firstname:fullname.firstname, lastname:fullname.lastname, email, password:hashedPassword})

    const token = await user.generateAuthToken()

    res.status(201).json({user, token})
}


module.exports.loginUser = async(req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body

    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({error: "email amd password do not match"})
    }

    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({error: "email and password do not match"})
    }

    const token = await user.generateAuthToken()
    res.cookie('token',token)
    res.status(200).json({user, token})
}

module.exports.getUserProfile = async(req, res, next)=>{
    res.status(200).json(req.user)
}

module.exports.logoutUser = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    res.clearCookie('token')
    await blacklistTokenModel.create({token})
    res.status(200).json({message: "User logged out"})
}