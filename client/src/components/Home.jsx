import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemons, filterPokemonsByTypes, filterOrigCrea, orderByName} from '../actions';
import {Link} from 'react-router-dom';
import PokemonCard from './PokemonCard';

export default function Home (){
	const dispatch = useDispatch();
	const allPokemons = useSelector((state) => state.pokemons);

	useEffect(() => {
		dispatch(getPokemons()); // reemplaza mapDispatchToProps y el mapStateToProps
	}, [dispatch]) //el [] es para que no sea un bucle infinito

	const [order, setOrder] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	function handleClick(e) {
		e.preventDefault();
		dispatch(getPokemons());
	}

	function handleFilterType(e){
		dispatch(filterPokemonsByTypes(e.target.value));
	}

	function handleOrigCrea(e){
		dispatch(filterOrigCrea(e.target.value));
	}

	function handleOnSort(e){
		e.preventDefault();
		dispatch(orderByName(e.target.value));
		//esto hace que se renderice la home cdo selecciono 'asc' o 'desc'
		setCurrentPage(1); 
		setOrder(`Ordered ${e.target.value}`)
	}

	return (
		<div>
			<Link to = '/pokemon'>Crear Pokemon</Link>
			<h1>Pokemons's World</h1>
			<button onClick={e=>{return handleClick(e)}}>
				Reload Pokemons
			</button>
		<div>
			<select onChange={e=> handleOnSort(e)}>
				<option value="ascName">Ascending by Name</option>
				<option value="descName">Descending by Name</option>
			</select>
			<select>
				<option value="ascAt">Ascending by Attack</option>
				<option value="descAt">Descending  by Attack</option>
			</select>
			<select name = "types" onChange={e=> handleFilterType(e)}> 
				<option value="All">All</option>
				<option value="Figthing">Figthing</option>
				<option value="Normal">Normal</option>
				<option value="Poison">Poison</option>
				<option value="Flying">Flying</option>
				<option value="Ground">Ground</option>
				<option value="Rock">Rock</option>
				<option value="Bug">Bug</option>
				<option value="Ghost">Ghost</option>
				<option value="Steel">Steel</option>
				<option value="Fire">Fire</option>
				<option value="Water">Water</option>
				<option value="Grass">Grass</option>
				<option value="Electric">Electric</option>
				<option value="Psychic">Psychic</option>
				<option value="Ice">Ice</option>
				<option value="Dragon">Dragon</option>
				<option value="Dark">Dark</option>
				<option value="Fairy">Fairy</option>
				<option value="Unknow">Unknow</option>
				<option value="Shadow">Shadow</option>
			</select>
			<select onChange={e=> handleOrigCrea(e)}>
				<option value="all">All</option>
				<option value="orig">Original</option>
				<option value="crea">Created</option>
			</select>
{
	allPokemons && allPokemons.map((pok) => {
		return (
			<>
				<Link to={"/home/" + pok.id}>
					<PokemonCard key={pok.id} id={pok.id} name={pok.name} image={pok.img} types={pok.types} />
				</Link>
			</>
		);		
	})
}
	</div>
</div>	
		)
}