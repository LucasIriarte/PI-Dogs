const {Router} = require('express')
const { GetTemperaments } = require('../controllers/GetTemperaments')

const router = Router()


router.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await GetTemperaments())
    } catch (error) {
        res.status(400).json({error:error})
    }
})

module.exports = router