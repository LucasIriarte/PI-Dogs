const axios = require("axios")
const {
    Dog,
    Temperament
} = require('../db.js')
const {
    GetAllDogs
} = require("./GetAllDogs.js")



const GetDogById = async (id) => {
    // busco al perro por su id (db/api) y lo convierto en un objeto con la info necesaria
    if (id.length > 5) {
        const dogDb = await Dog.findOne({
            where: {
                id: id
            },
            include: Temperament
        })
        return {
            id: dogDb.id,
            image: "https://www.pupnames.com/assets/icons/brown-c80c33a875af31eff384bbc80bf3fed07d25441f6cdc9efd3f98b0b8ffe49c3e.svg",
            name: dogDb.name,
            temperaments: dogDb.Temperaments.map((temperament) => " " + temperament.name).toString().slice(1),
            height: dogDb.height + " in",
            weight: dogDb.weight + " lb",
            lifeSpan: dogDb.lifeSpan + " years"
        }
    }
    const response = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)).data
    const imageRef = response.reference_image_id
    const image = (await axios.get(`https://api.thedogapi.com/v1/images/${imageRef}`)).data
    const result = {
        id: response.id,
        image: image.url,
        name: response.name,
        temperaments: response.temperament,
        height: response.height.imperial.replace("-", "/") + " in",
        weight: response.weight.imperial.replace("-", "/") + " lb",
        lifeSpan: response.life_span.replace("-", "/") + " years"
    }
    return result
}

module.exports = {
    GetDogById
}