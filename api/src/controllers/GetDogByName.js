const { Op } = require('sequelize')
const { Dog, Temperament } = require('../db.js')
const { GetAllDogs } = require("./GetAllDogs")


const GetDogByName = async (name) => {
        // traigo a los perros y los filtro por su nombre
        const allDogs = await GetAllDogs()
        const dogsFilterByName = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        return dogsFilterByName
}

module.exports = {GetDogByName}