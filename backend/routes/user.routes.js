const express = require("express")
const router = express.Router()
const {body} = require("express-validator") 
const userControler = require("../controlers/user.controler")


router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 charracters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:3}).withMessage('Password must be at least 3 characters long')
], userControler.registerUser)






module.exports = router