const { Router } = require('express');
const {Pokemon , Tipo} = require('../db');
const axios = require('axios');


const getApiInfo = async () => {
 //probando con los 40 primeros
  const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40'); 
  let allPokemons = apiUrl.data.results.map(pok => axios.get(pok.url)); //traigo la info de cada pokemon por la url
  const dataPokemon= await Promise.all(allPokemons); //paso el array a promesas para resolverlo
  let infoAllPokemons= [];
  dataPokemon.forEach((d) => {
    infoAllPokemons.push({
    name: d.data.name,
    img: d.data.sprites.other.home.front_default,
    types: d.data.types.map(typ => typ.type.name),
  //id: d.data.id,
  //height: d.data.height,
  //weight: d.data.weight,
  //stats: data.stats.map(sta => {
  //      return {
  //      name: sta.stat.name, 
  //      base: sta.base_stat,
  //    }      
  //  }),
    })
  })
  return infoAllPokemons;
}


const getDbInfo = async () => {
  //trae los pokemons de la DB
  return await Pokemon.findAll({
    include: {
      model: Tipo,
      attributes: ['name'],
      through: {
        attributes: [],
      }, 
    }
  })
}

const getAllPokemons = async() => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  //const infoTotal = apiInfo.concat(dbInfo),
  // return infoTotal;
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
    stats: data.stats.map(sta => {
        return {
        name: sta.stat.name, 
        base: sta.base_stat,
      }      
    })
  }
  return apiInfo;
}

const getApiPokemonByName = async (name) => {
  const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`); 
  const data=apiUrl.data;
  const apiInfo = {
    name: data.name,
    img: data.sprites.other.home.front_default,
    types: data.types.map(typ => typ.type.name),
    id: data.id,
    height: data.height,
    weight: data.weight,
    stats: data.stats.map(sta => {
        return {
        name: sta.stat.name, 
        base: sta.base_stat,
      }      
    })
  }
  return apiInfo;
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


const getPokemonByName = async (name) => {
  const apiInfo = await getApiPokemonByName(name);
  const dbInfo = await getDbPokemonByName(name);

  if (apiInfo && dbInfo)  return [apiInfo].concat(dbInfo);
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