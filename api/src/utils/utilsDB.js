const { Router } = require('express');
const {Pokemon , Type} = require('../db');
const axios = require('axios');


const getDbInfo = async () => {
  //trae los pokemons de la DB
  const dbPokemons = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }, 
    }
  });
  return dbPokemons;
}


const getDbPokemonByName = async(name) => {
  //trae los pokemons de la DB

    const findPokemon = await Pokemon.findAll({
    where: { name },
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }, 
    },
  })
    console.log(' findPokemon ', findPokemon)
    return findPokemon;


  // let pokemonsDB = dbInfo.map(poke=>{
 //                return ({
 //                    id: poke.id,
 //                    name:poke.name,
 //                    img:poke.img,
 //                    types: mapTypes(poke.types)
 //                })
 //            })

 //  return dbInfo;
}


module.exports = {
  getDbInfo,
  getDbPokemonByName
}