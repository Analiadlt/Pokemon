import axios from 'axios';

export function getPokemons() {
	return async function(dispatch){
		var json= await axios.get("http://localhost:3001/pokemons");
		return dispatch({
			type: 'GET_POKEMONS',
			payload: json.data 
		})
	}
}

export function filterPokemonsByTypes(payload) {
	return {
			type: 'FILTER_BY_TYPES',
			payload
	}
}


export function filterOrigCrea(payload) {
	return {
			type: 'FILTER_ORIG_CREA',
			payload
	}
}


export function orderByName(payload) {
	return {
			type: 'ORDER_BY_NAME',
			payload
	}
}