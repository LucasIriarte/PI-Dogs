const {
    Router
} = require('express');
const { DeleteDog } = require('../controllers/DeleteDog');
const {
    GetAllDogs
} = require('../controllers/GetAllDogs');
const {
    GetDogById
} = require('../controllers/GetDogById');
const {
    GetDogByName
} = require('../controllers/GetDogByName');
const {
    PostDog
} = require('../controllers/PostDog');


const router = Router();



router.post('/', async (req, res) => {
    const {
        name,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        minLifeSpan,
        maxLifeSpan,
        temperaments
    } = req.body
    try {
        res.status(200).json(await PostDog(name, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, temperaments))
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
})


router.get('/', async (req, res) => {
    const {name} = req.query
    try {
        if (name) {
            const dogByName = await GetDogByName(name)
            if (dogByName.length) {
                return res.status(200).json(dogByName)
            }else console.log("entrando al error"); throw new Error("There are no dogs by that name")
        } else res.status(200).json(await GetAllDogs())
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        res.status(200).json(await GetDogById(id))
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
})

router.delete('/:id', async(req,res) => {
    const { id } = req.params
    try {
        res.status(200).json(await DeleteDog(id))
    } catch (error) {
        res.status(400).json({
            error:error
        })
    }
})



module.exports = router;