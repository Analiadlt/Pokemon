const { Router } = require('express');
const {Pokemon , Tipo} = require('../db');
const axios = require('axios');


const getDbInfo = async () => {
  //trae los pokemons de la DB
  return Pokemon.findAll({
    include: {
      model: Tipo,
      attributes: ['name'],
      through: {
        attributes: [],
      }, 
    }
  })
}


const getDbPokemonByName = async (name) => {
  //trae los pokemons de la DB

  const dbInfo = await Pokemon.findAll({
    where: { name },
    include: {
      model: Tipo,
      attributes: ['name'],
      through: {
        attributes: [],
      }, 
    },
  })

  // let pokemonsDB = dbInfo.map(poke=>{
 //                return ({
 //                    id: poke.id,
 //                    name:poke.name,
 //                    img:poke.img,
 //                    types: mapTypes(poke.types)
 //                })
 //            })
   return dbInfo;
}


module.exports = {
  getDbInfo,
  getDbPokemonByName
}