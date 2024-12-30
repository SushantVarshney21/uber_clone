const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklisttoken.model');


module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
        const {fullname, email, password, vehicle} = req.body;
        const isCaptainAlreadyRegistered = await captainModel.findOne({email});
        if(isCaptainAlreadyRegistered){
            return res.status(400).json({error: "Captain already registered"});
        }
        const hashedPassword = await captainModel.hashPassword(password);
        const captain = await captainService.createCaptain({firstname: fullname.firstname, lastname: fullname.lastname, email, password:hashedPassword, color: vehicle.color, plate: vehicle.plate, capacity: vehicle.capacity, vehicleType: vehicle.vehicleType});
        const token = await captain.generateAuthToken();
        res.status(201).json({captain,token});
    
}


module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(400).json({error: "Invalid email or password"});
    }
    const isPasswordMatch = await captain.comparePassword(password, captain.password);
    if(!isPasswordMatch){
        return res.status(400).json({error: "Invalid email or password"});
    }
    const token = await captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({captain,token});
}


module.exports.profile = async (req, res) => {
    res.status(200).json({captain: req.captain});
}

module.exports.logout = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie('token');
    await blacklistTokenModel.create({token});
    res.status(200).json({message: "Logged out successfully"});
}