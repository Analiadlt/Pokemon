const { Router } = require('express');
// Importar todos los routers;
const {Pokemon, Tipo} = require('../db');
//const axios = require('axios');
const router = Router();
const { getApiInfo, getDbInfo, getAllPokemons, getApiPokemonById, getPokemonByName} = require('../utils/utils');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const axios = require('axios');  


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


// acá está incluida la busqueda de todos y la por query
router.get ('/pokemons', async (req, res)=>{
  let name = req.query.name;

try {
    if (name) {
        name = name.toLowerCase().trim()
        let pokemonName = await getPokemonByName(name);
        pokemonName ? res.status(200).send(pokemonName) : res.status(404).send('Pokemon not found.')
      } else {
        let allPokemons = await getAllPokemons();
        res.status(200).send(allPokemons);
     }
} catch {
    res.status(404).send('Pokemon not found.')
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
  let {name, height, weight, types, life, attack, defense, speed} = req.body;
  let pokemonCreated = await Pokemon.create ({
    name, height, weight, life, attack, defense, speed
  })

// busca los Tipos cargados
  let tipoDb = await Tipo.findAll({
    where: { name : types }
  })
  pokemonCreated.addTipo(tipoDb);

  res.send('Pokemon created successfully.')
});



module.exports = router;

