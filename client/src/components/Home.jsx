import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemons} from '../actions';
import {Link} from 'react-router-dom';
import PokemonCard from './PokemonCard';

export default function Home (){
	const dispatch = useDispatch();
	const allPokemons = useSelector((state) => state.pokemons);

	useEffect(() => {
		dispatch(getPokemons()); // reemplaza mapDispatchToProps y el mapStateToProps
	}, [dispatch]) //el [] es para que no sea un bucle infinito

	function handleClick(e) {
		e.preventDefault();
		dispatch(getPokemons());
	}

	return (
		<div>
			<Link to = '/pokemon'>Crear Pokemon</Link>
			<h1>Pokemons's World</h1>
			<button onClick={e=>{handleClick(e)}}>
				Volver a cargar todos los pokemons
			</button>
		<div>
			<select>
				<option value="asc">Ascendente</option>
				<option value="desc">Descendente</option>
			</select>
			<select>
				<option value="asc">Ascendente</option>
				<option value="desc">Descendente</option>
			</select>
			<select> 
				<option value="1">Figthing</option>
				<option value="2">Normal</option>
				<option value="3">Poison</option>
				<option value="4">Flying</option>
				<option value="5">Ground</option>
				<option value="6">Rock</option>
				<option value="7">Bug</option>
				<option value="8">Ghost</option>
				<option value="9">Steel</option>
				<option value="10">Fire</option>
				<option value="11">Water</option>
				<option value="12">Grass</option>
				<option value="13">Electric</option>
				<option value="14">Psychic</option>
				<option value="15">Ice</option>
				<option value="16">Dragon</option>
				<option value="17">Dark</option>
				<option value="18">Fairy</option>
				<option value="19">Unknow</option>
				<option value="20">Shadow</option>
			</select>
			<select>
				<option value="all">All</option>
				<option value="orig">Original</option>
				<option value="crea">Created</option>
			</select>
{
	allPokemons && allPokemons.map((pok) => {
		return (
			<fragment>
				<Link to={"/home/" + pok.id}>
					<PokemonCard name={pok.name} image={pok.img} types={pok.types} key={pok.id}/>
				</Link>
			</fragment>
		);
		
	})}
	</div>
</div>	
		)
}