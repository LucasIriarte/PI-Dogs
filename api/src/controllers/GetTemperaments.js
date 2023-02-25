const { GetAllDogs } = require('./GetAllDogs')
const { Temperament } = require('../db.js')



const GetTemperaments = async() => {
    const temperamentsCrude = [];
    //Me traigo todos los dogs
    const getAllTemperaments = await GetAllDogs()
    getAllTemperaments.map((dog) => {
            if(dog.temperaments !== undefined) {
                temperamentsCrude.push(dog.temperaments)
            }
    })
    //Separo todos los temperamentos y los uno en un solo array
    const aux = temperamentsCrude.map(temperament => 
        temperament.split(", ")
    )
    const aux1 = aux.flat()
    const result = []
    // verificar de no meter duplicados
    const aux2 = aux1.filter((temperament) => {
        if(!result.includes(temperament)) {
            result.push(temperament)
        }
    })
    result.map((temperament) => Temperament.findOrCreate({
        where: {
            name: temperament
        }
    }))
    return Temperament.findAll()
}


module.exports = {GetTemperaments}