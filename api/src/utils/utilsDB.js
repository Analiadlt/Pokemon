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
    return findPokemon;
  };



const getDbPokemonById = async(id) => {

  const findPokemon = await Pokemon.findAll({
    where: { id },
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }, 
    },
  })
    return findPokemon[0];
  };



module.exports = {
  getDbInfo,
  getDbPokemonByName,
  getDbPokemonById,
}