const { Dog } = require('../db.js')
const { GetAllDogs } = require('./GetAllDogs.js')


const DeleteDog = async (id) => {
    const dogForDelete = await Dog.findOne({
        where:{
            id:id
        }
    })
    await Dog.destroy({
        where: {
            id:id
        }
    })
    const response = await GetAllDogs()
    return [...response, {dogDelete:dogForDelete}]
}

module.exports = {
    DeleteDog
} 