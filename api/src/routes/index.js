const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const fetch = require ('node-fetch');

router.get ('/pokemons', async (req, res)=>{
	const api_url='http://pokeapi.co/api/v2/pokemon';
	const fetch_response = await fetch(api_url);
	const json = await fetch_response.json();
	//habría que hacer una subrequest para obtener los datos necesarios
	//pokemon_name = ¿¿¿json.name???
	//api_url2='http://pokeapi.co/api/v2/pokemon/${pokemon_name}'
	//debería devolver sólo: imagen - nombre - tipos (electrico, fuego, agua, etc)
	console.log(json);
	resp.json(json);
});

module.exports = router;
