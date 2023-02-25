const axios = require('axios')
const {Dog, Temperament} = require('../db.js')


const GetAllDogs = async () => {
    //traigo la info, itero, y me quedo con la info necesaria
        const info = (await axios.get('https://api.thedogapi.com/v1/breeds?api_key=live_4LI6PEy0H8gPBkPM3LfvYFm9Bm31ZNvRII331qgMrHvF70oxb1Q8aEx5r2CGT3P4')).data
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
                    image:"https://www.pupnames.com/assets/icons/brown-c80c33a875af31eff384bbc80bf3fed07d25441f6cdc9efd3f98b0b8ffe49c3e.svg",
                    weight:dog.dataValues.weight + " lb",
                    temperaments:dog.dataValues.Temperaments.map((temperament) => " " + temperament.name).toString().slice(1)
                }
            })
            return mapInfoApi.concat(cleanInfo)
        }
        else return mapInfoApi

}

module.exports = {GetAllDogs}