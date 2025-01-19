const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controlers/map.controller')
const {query} = require('express-validator')

router.get('/get-coordinates',
     [query('address').notEmpty().isLength({min:3}).withMessage('Address is required')],
     authMiddleware.authUser, mapController.getCoordinates)

router.get('/get-distance-time',
     [query('origins').notEmpty().isLength({min:3}).withMessage('Start address is required'),
      query('destinations').notEmpty().isLength({min:3}).withMessage('End address is required')],
     authMiddleware.authUser, mapController.getDistanceTime
)


router.get('/get-suggestions',
     [query('input').notEmpty().isLength({min:3}).withMessage('Address is required')],
     authMiddleware.authUser, mapController.getSuggestions
)

module.exports = router