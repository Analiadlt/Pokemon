const { Router } = require('express');
const {Pokemon , Tipo} = require('../db');
const axios = require('axios');


// const getApiInfo = async () => {
//  //trae TODOS los pokemons de la Api
//   const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon'); 
//   const apiInfo = await apiUrl.data.results.map(pok => {
//     return {
//           name: pok.name,
//           url: pok.url, 

//     };  
//     });
//   return [...apiInfo, apiUrl.data.next];
// }

const getApiInfo = async () => {
 //trae TODOS los pokemons de la Api
 // const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon'); 

 //probando con los 40 primeros
  const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40'); 
  let allPokemons = apiUrl.data.results.map(pok => axios.get(pok.url)); //traigo la info de cada pokemon por la url
  const dataPokemon= await Promise.all(allPokemons); //paso el array a promesas para resolverlo
  let infoAllPokemons= [];
  dataPokemon.forEach((data) => {
    infoAllPokemons.push({
    id: data.data.id,
    name: data.name,
    height: data.data.height,
    img: data.data.sprites.other.home.front_default,
    stats: data.data.stats.map(sta => sta.stat.name),
    types: data.data.types.map(typ => typ.type.name),
    weight: data.data.weight,

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
    id: data.id,
    name: data.name,
    height: data.height,
    img: data.sprites.other.home.front_default,
    stats: data.stats.map(sta => sta.stat.name),
    types: data.types.map(typ => typ.type.name),
    weight: data.weight,
  }
  return apiInfo;
}

const getApiPokemonByName = async (name) => {
  const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`); 
  const data=apiUrl.data;
  const apiInfo = {
    id: data.id,
    name: data.name,
    height: data.height,
    img: data.sprites.other.home.front_default,
    stats: data.stats.map(sta => sta.stat.name),
    types: data.types.map(typ => typ.type.name),
    weight: data.weight,
  }
  return apiInfo;
}


module.exports = {
  getApiInfo,
  getDbInfo,
  getAllPokemons,
  getApiPokemonById,
  getApiPokemonByName
}