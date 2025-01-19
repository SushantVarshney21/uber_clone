const mapService = require('../services/map.service')
const {validationResult} = require('express-validator')

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { address } = req.query
    try {
        const coordinates = await mapService.getCoordinates(address)
        res.status(200).json(coordinates)
        
    } catch (error) {
        res.status(404).json({ error: 'Coordinates not Found' })
    }
}

module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { origins, destinations } = req.query
    try {
        const distance = await mapService.getDistanceTime(origins, destinations)
        res.status(200).json(distance)
        
    } catch (error) {
        res.status(404).json({ error: 'Distance not Found' })
    }
}

module.exports.getSuggestions = async (req, res) => {
    const { input } = req.query
    try {
        const suggestions = await mapService.getSuggestions(input)
        res.status(200).json(suggestions)
        
    } catch (error) {
        res.status(404).json({ error: 'Suggestions not Found' })
    }
}