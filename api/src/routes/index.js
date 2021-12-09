const { Router } = require('express');
// Importar todos los routers;
const {Pokemon, Type } = require('../db');
const router = Router();
const { getAllPokemons, getApiPokemonById, getPokemonByName} = require('../utils/utilsAPI');
const { getDbPokemonById } = require('../utils/utilsDB');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const axios = require('axios');  


router.get('/pokemons/:id', async (req, res)=> {
  const id = req.params.id;
  let pokemonInfo=null;
  try {
    if (id.length < 5) {
      pokemonInfo = await getApiPokemonById(id);
    } else {
      pokemonInfo = await getDbPokemonById(id);
      };
    if (pokemonInfo) res.status(200).json(pokemonInfo);
  } catch {
    res.status(404).send('Pokemon not found.');
  }
})


// acá está incluida la busqueda de todos y la de name por query
router.get ('/pokemons', async (req, res)=>{
  
  let name = req.query.name;
  try {
    if (name) {
        name = name.toLowerCase().trim()
        const pokemonName = await getPokemonByName(name);
        (pokemonName.length>0) ? res.status(200).send(pokemonName) : res.status(404).send('Pokemon not found.')
      } else {
        let allPokemons = await getAllPokemons();
        res.status(200).send(allPokemons);
     }
} catch (e) {
   res.status(404).send('Pokemon not found.');  
}
 
})


router.get ('/types', async (req, res)=>{
 //trae los tipos de la Api en un array y los almacena en la DB
  const apiUrl = await axios.get('https://pokeapi.co/api/v2/type');
  const apiInfo = apiUrl.data.results.map(t => {return t.name})
  apiInfo.forEach(typ => {Type.findOrCreate({where: {name: typ}});
   })
  const allTypes = await Type.findAll();
  res.send(allTypes);
})



router.post('/pokemons', async (req, res)=>{
  const {name, height, weight, types, life, attack, defense, speed, img} = req.body;
try{
    let pokemonCreated = await Pokemon.create ({
        name, height, weight, life, attack, defense, speed, img
      })

    // busca los Tipos cargados
      let typeDb = await Type.findAll({
        where: { name : types }
      })
     

      typeDb && pokemonCreated.addType(typeDb);
      
      res.send('Pokemon created successfully.')
    
} catch (e) {
    res.send(e)
}
  
});


module.exports = router;

