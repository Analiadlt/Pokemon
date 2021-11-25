const { Router } = require('express');
// Importar todos los routers;
const {Pokemon, Tipo} = require('../db');
//const axios = require('axios');
const router = Router();
const { getApiInfo, getDbInfo, getAllPokemons, getApiPokemonById, getApiPokemonByName} = require('../utils/utils');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const axios = require('axios');  


// acá está incluida la busqueda de todos y la por query
router.get ('/pokemons', async (req, res)=>{
  const name = req.query.name;
  let allPokemons = await getAllPokemons();
  if (name) {
    let pokemonName = await allPokemons.filter (pok => pok.name.tolowerCase().includes(name.tolowerCase()));
    pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send('Pokemon not find.')
  } else {
    res.status(200).send(allPokemons);
  }
})

router.get('/pokemons/:id', async (req, res)=> {
  const id = req.params.id;
  let pokemonApiInfo=null;
  let pokemonDbInfo=null;
  try {
      if (id.length < 5) {pokemonApiInfo = await getApiPokemonById(id);}
        else {pokemonDbInfo = Pokemon.findAll()};
        if (pokemonApiInfo) res.status(200).json(pokemonApiInfo);
        if (pokemonDbInfo) res.status(200).json(pokemonDbInfo);
  } catch {
    res.status(404).send('Pokemon not found.');
  }
})


router.get ('/types', async (req, res)=>{
 //trae los tipos de la Api en un array y los almacena en la DB
  const apiUrl = await axios.get('https://pokeapi.co/api/v2/type');
  const apiInfo = apiUrl.data.results.map(t => {return t.name})
  apiInfo.forEach(typ => {Tipo.findOrCreate({where: {name: typ}});
   })
  const allTypes = await Tipo.findAll();
  res.send(allTypes);
})

router.post('/pokemons', async (req, res)=>{
  //let {img, name, types, id, stats, height, weight} = req.body;
  let {name, height, weight, tipo} = req.body;

  let pokemonCreated = await Pokemon.create ({
    //id, name, life, strength, defender, speed, height, weight, img, tipo
    name, height, weight, tipo
  })

  let tipoDb = await Tipo.findAll({
    where: {name : tipo}
  })
  pokemonCreated.addTipo(tipoDb);
  res.send('Pokemon created successfully.')
});



module.exports = router;

