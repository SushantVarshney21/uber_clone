const express = require("express")
const router = express.Router()
const {body} = require("express-validator") 
const userControler = require("../controlers/user.controler")
const authMiddleware = require("../middlewares/auth.middleware")


router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 charracters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:3}).withMessage('Password must be at least 3 characters long')
], userControler.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:3}).withMessage('Password must be at least 3 characters long')
], userControler.loginUser
)


router.get('/profile', authMiddleware.authUser ,userControler.getUserProfile);

router.get('/logout',authMiddleware.authUser, userControler.logoutUser);





module.exports = router