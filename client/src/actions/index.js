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

export function getTypes() {
	return async function(dispatch){
		var json= await axios.get("http://localhost:3001/types");
		return dispatch({
			type: 'GET_TYPES',
			payload: json.data 
		})
	}
}

export function postPokemons(payload) {
	return async function(dispatch){
		var json= await axios.post("http://localhost:3001/pokemons", payload);
		return json;
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

export function getPokemonByName(name) {
	return async function(dispatch){
		try {
			var json= await axios.get("http://localhost:3001/pokemons?name="+name);
				return dispatch({
					type: 'GET_POKEMON_BY_NAME',
					payload: json.data 
				})
		} catch (error) {
				console.log(error)
		}
		
	}
}

export function getPokemonDetail(id) {
	return async function(dispatch){
		try {
			var json= await axios.get("http://localhost:3001/pokemons/"+id);
				return dispatch({
					type: 'GET_POKEMON_DETAIL',
					payload: json.data
				})
		} catch (error) {
				console.log(error)
		}
		
	}
}

