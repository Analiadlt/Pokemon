const { Router } = require('express');
const {Pokemon , Type} = require('../db');
const axios = require('axios');

  //trae los pokemons de la DB
const getDbInfo = async () => {

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
    return findPokemon; //trae un array
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
    return findPokemon[0]; //trae un objeto
  };



module.exports = {
  getDbInfo,
  getDbPokemonByName,
  getDbPokemonById,
}