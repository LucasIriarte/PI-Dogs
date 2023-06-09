const axios = require('axios')
const {Dog, Temperament} = require('../db.js')
require('dotenv').config()
const { DOGS_API_KEY } = process.env

const GetAllDogs = async () => {
    //traigo la info, itero, y me quedo con la info necesaria
        const info = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${DOGS_API_KEY}`)).data
        const mapInfoApi = info.map(e => {
            return {
                id: e.id,
                image: e.image.url,
                name: e.name,
                temperaments: e.temperament,
                weight: e.weight.imperial.replace('-', '/') + " lb",
            }
        })
        // me fijo si hay perros en la base de datos, si lo hay, concateno ambas infos
        let infoDB = await Dog.findAll({
            include: {
                model: Temperament
            }
          })
        if(infoDB) {
            const cleanInfo = infoDB.map((dog) => {
                return{
                    id:dog.dataValues.id,
                    name:dog.dataValues.name,
                    image:"https://static.vecteezy.com/system/resources/previews/001/200/028/non_2x/dog-png.png",
                    weight:dog.dataValues.weight + " lb",
                    temperaments:dog.dataValues.Temperaments.map((temperament) => " " + temperament.name).toString().slice(1)
                }
            })
            return mapInfoApi.concat(cleanInfo)
        }
        else return mapInfoApi

}

module.exports = {GetAllDogs}