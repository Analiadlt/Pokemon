const initialState = {
	allPokemons: [],
	pokemons: []
}

function rootReducer (state=initialState, action) {
	switch(action.type) {
		case 'GET_POKEMONS':
			return {
				...state,
				pokemons: action.payload,
				allPokemons: action.payload
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
			if (action.payload === 'All') return pokemonsAll;
			if (action.payload === 'crea') {
				pokemonsFilter = pokemonsAll.filter(pok => pok.createdAt !== undefined)	
			} else {
			   	pokemonsFilter = pokemonsAll.filter(pok => pok.createdAt === undefined)		
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
					if (a.name> b.name) return -1;
					if (b.name > a.name) return 1;
					return 0;
				})
				console.log('sortedArr ', sortedArr)
				return {
					...state,
					pokemons: sortedArr
				}	

		default:
			return state;	
	}

}

export default rootReducer;