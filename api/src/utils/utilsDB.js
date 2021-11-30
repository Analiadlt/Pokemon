const { Router } = require('express');
const {Pokemon , Type} = require('../db');
const axios = require('axios');


const getDbInfo = async () => {
  //trae los pokemons de la DB
  const allPokemons = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }, 
    }
  });
  return allPokemons;
}


const getDbPokemonByName = async(name) => {
  //trae los pokemons de la DB

 // const dbInfo = await Pokemon.findAll({
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