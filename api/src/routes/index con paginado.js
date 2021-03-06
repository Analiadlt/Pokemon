const { Router } = require('express');
// Importar todos los routers;
const {Pokemon, Type} = require('../db');
//const axios = require('axios');
const router = Router();
const { getAllPokemons, getApiPokemonById, getPokemonByName} = require('../utils/utilsAPI');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const axios = require('axios');  


router.get('/pokemons/:id', async (req, res)=> {
  const id = req.params.id;
  let pokemonApiInfo=null;
  let pokemonDbInfo=null;
  try {
      if (id.length < 5) {pokemonApiInfo = await getApiPokemonById(id);}
        else {pokemonDbInfo = await Pokemon.findOne(
            { where: { id },
               include: { model: Type, 
                  attributes: ['name'],
                  through: {
                      attributes: [],
                    }, 
                  },
              })};
      if (pokemonApiInfo) res.status(200).json(pokemonApiInfo);
      if (pokemonDbInfo) res.status(200).json(pokemonDbInfo);
  } catch {
    res.status(404).send('Pokemon not found.');
  }
})


// acá está incluida la busqueda de todos y la de name por query
//también está el paginado
router.get ('/pokemons', async (req, res)=>{
 // const order = req.params.order || 'asc'; //orden ascendente o descendente
  const page = req.query.page || 1; //recibe el nro de página
  const limit = req.query.limit || 12; // recibe la cant de pag a mostrar 
  const startIndex = (page-1)*limit; //el primer pokemon que comienza a mostrar
  const endIndex = page * limit; 


  let name = req.query.name;
  try {
    if (name) {
        name = name.toLowerCase().trim()
        const pokemonName = await getPokemonByName(name);
        (pokemonName.length>0) ? res.status(200).send(pokemonName) : res.status(404).send('Pokemon not found.')
      } else {
        let allPokemons = await getAllPokemons();

        const result = allPokemons.slice(startIndex, endIndex);
        res.status(200).send(result);
   
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
  let {name, height, weight, types, life, attack, defense, speed} = req.body;
  let pokemonCreated = await Pokemon.create ({
    name, height, weight, life, attack, defense, speed
  })

// busca los Tipos cargados
  let typeDb = await Type.findAll({
    where: { name : types }
  })
  pokemonCreated.addType(typeDb);

  res.send('Pokemon created successfully.')
});



module.exports = router;

