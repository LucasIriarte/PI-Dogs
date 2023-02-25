const { Dog, Temperament } = require('../db.js')


const PostDog = async (name, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, temperaments) => {
    const aproxHeight = Math.trunc(minHeight) + " / " + Math.trunc(maxHeight);
    const aproxweight = Math.trunc(minWeight) + " / " + Math.trunc(maxWeight);
    const aproxLifeSpan = Math.trunc(minLifeSpan) + " / " + Math.trunc(maxLifeSpan);
    const dogCreated = await Dog.create({
        name:name,
        height:aproxHeight,
        weight:aproxweight,
        lifeSpan:aproxLifeSpan
    })
    let associatedTemp = await Temperament.findAll({
        where: { name: temperaments},
    })
 
    dogCreated.addTemperament(associatedTemp);
    return dogCreated
}

module.exports = {PostDog}