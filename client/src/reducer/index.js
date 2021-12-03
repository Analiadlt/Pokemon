const initialState = {
	allPokemons: [],
	pokemons: [],
	detail: [],
	types: []
}

function rootReducer (state=initialState, action) {
	switch(action.type) {
		case 'GET_POKEMONS':
			return {
				...state,
				pokemons: action.payload,
				allPokemons: action.payload
			}
		case 'POST_POKEMONS':
			return {
				...state,
			}
		case 'GET_POKEMON_BY_NAME':
			return {
				...state,
				pokemons: action.payload
			}
		case 'FILTER_BY_TYPES':
			const allPokemons = state.allPokemons;
			const typesFilter = action.payload ==='All'? allPokemons 
			: allPokemons.filter(pok => pok.types.includes(action.payload.toLowerCase())			
			);
			return {
				...state,
				pokemons: typesFilter
			}
		case 'FILTER_ORIG_CREA':
			const pokemonsAll = state.allPokemons;
			let pokemonsFilter=[];
			if (action.payload === 'all') return pokemonsAll;
			// if (action.payload === 'crea') {
			// 	pokemonsFilter = pokemonsAll.filter(pok => pok.createdAt !== undefined)	
			// } else {
			//    	pokemonsFilter = pokemonsAll.filter(pok => !pok.createdAt)		
			// };
			if (action.payload === 'orig') {
				pokemonsFilter = pokemonsAll.filter(pok => typeof pok.id === 'number')	
			} else {
			   	pokemonsFilter = pokemonsAll.filter(pok => typeof pok.id !== 'number')		
			};
			return {
				...state,
				pokemons: pokemonsFilter 
			}
		case 'ORDER_BY_NAME':
			let sortedArr = action.payload === 'ascName'?
				state.allPokemons.sort(function(a,b){
					if (a.name > b.name) return 1;
					if (b.name > a.name) return -1;
					return 0;
				}) :
				state.allPokemons.sort(function(a,b) {
					if (a.name > b.name) return -1;
					if (b.name > a.name) return 1;
					return 0;
				})

				return {
					...state,
					pokemons: sortedArr
				}	
		case 'GET_TYPES':
			return {
				...state,
				types: action.payload,
			}
		case 'GET_POKEMON_DETAIL':
			
			return {
				...state,
				detail: action.payload,
			}
		default:
			return state;	
	}

}

export default rootReducer;