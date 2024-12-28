const express = require('express');
const router = express.Router();
const captainController = require('../controlers/captain.controller');
const {body} = require('express-validator');


router.post('/register',[
    body('fullname.firstname').notEmpty().isLength({min:3}).withMessage('firstname must be at least 3 characters long'),
    body('email').notEmpty().isEmail().withMessage('Invalid email'),
    body('password').notEmpty().isLength({min:3}).withMessage('password must be at least 3 characters long'),
    body('vehicle.color').notEmpty().isLength({min:3}).withMessage('color must be at least 3 characters long'),
    body('vehicle.plate').notEmpty().isLength({min:3}).withMessage('plate must be at least 3 characters long'),
    body('vehicle.capacity').notEmpty().isInt({min:1}).withMessage('capacity must be at least 1'),
    body('vehicle.vehicleType').notEmpty().isIn(['car','motorcycle','auto']).withMessage('vehicleType must be car, motorcycle or auto')
], captainController.register);


module.exports = router;