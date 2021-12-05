const { Router } = require('express');
const {Pokemon , Type} = require('../db');
const axios = require('axios');
const { getDbInfo, getDbPokemonByName} = require('../utils/utilsDB');

const getApiInfo = async () => {
 //probando con los 40 primeros
  const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40'); 
  let allPokemons = apiUrl.data.results.map(pok => axios.get(pok.url)); //traigo la info de cada pokemon por la url
  const dataPokemon= await Promise.all(allPokemons); //paso el array a promesas para resolverlo
  let infoAllPokemons= [];
  dataPokemon.forEach((d) => {
    infoAllPokemons.push({
    id: d.data.id,
    name: d.data.name,
    img: d.data.sprites.other.home.front_default,
    types: d.data.types.map(typ => typ.type.name),
    })
  })
  return infoAllPokemons;
}


const getAllPokemons = async() => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  return apiInfo.concat(dbInfo);
} 

const getApiPokemonById = async (id) => {
  const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`); 
  const data=apiUrl.data;
  const apiInfo = {
    name: data.name,
    img: data.sprites.other.home.front_default,
    types: data.types.map(typ => typ.type.name),
    id: data.id,
    height: data.height,
    weight: data.weight,
    life: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    speed: data.stats[5].base_stat,
  }
  return apiInfo;
}

const getApiPokemonByName = async (name) => {
  try {
      const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`); 
        const data=apiUrl.data;
        const apiInfo = {
          name: data.name,
          img: data.sprites.other.home.front_default,
          types: data.types.map(typ => typ.type.name),
          id: data.id,
          height: data.height,
          weight: data.weight,
          life: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          // stats: data.stats.map(sta => {
          //     return {
          //     name: sta.stat.name, 
          //     base: sta.base_stat,
          //   }      
          // })
        }
        return apiInfo;
  
  } catch (e) {
       return null;
  }  
}

const getPokemonByName = async (name) => {

      const apiInfo = await getApiPokemonByName(name);
      const dbInfo = await getDbPokemonByName(name);
      if (apiInfo && dbInfo) return [apiInfo].concat(dbInfo);
    
      if (apiInfo) return apiInfo;
      if (dbInfo) return dbInfo;
    
      return [name];
}

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllPokemons,
  getApiPokemonById,
  getPokemonByName
}

