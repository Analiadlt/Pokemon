import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemons, filterPokemonsByTypes, filterOrigCrea, orderByName, orderByAttack} from '../actions';
import {Link} from 'react-router-dom';
import PokemonCard from './PokemonCard';
import Paged from './Paged';
import SearchBar from './SearchBar';
import styles from './Home.module.css';

export default function Home (){
	const dispatch = useDispatch();
	
	const allPokemons = useSelector((state) => state.pokemons);
	const types = useSelector((state) => state.types);
	//estados y variables para paginado
	const [currentPage, setCurrentPage] = useState(1);
	const [pokemonsByPage, setPokemonsByPage] = useState(12);
	const indexOfLastPokemon = currentPage * pokemonsByPage;
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonsByPage;
	const currentPokemons = allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon);

	const paged = (pageNumber) => {
		setCurrentPage(pageNumber)
	}
	
	useEffect(() => {
		dispatch(getPokemons()); // reemplaza mapDispatchToProps y el mapStateToProps
//		dispatch(getTypes());
	}, [dispatch]) //el [] es para que no sea un bucle infinito



	const [order, setOrder] = useState('');

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
	 if (e.target.value !== 'without') {
		if (e.target.value === 'ascName' || e.target.value === 'descName') {
			dispatch(orderByName(e.target.value));
		} else {
			if (e.target.value === 'ascAt' || e.target.value === 'descAt') {
				dispatch(orderByAttack(e.target.value));
		}}
	}
		//esto hace que se renderice la home cdo selecciono 'asc' o 'desc'
		setCurrentPage(1); 
		setOrder(e.target.value)
	}

	types.sort((a,b) => a.name < b.name ? -1 : +(a.name > b.name));
	return (
		<div>
			<>
				<Link to = '/pokemon'>
				<button className ={styles.button}>New Pokemon Create</button>
				</Link>
			</>
			<h1 className={styles.h1}>Pokemons's World</h1>
			<button className ={styles.button} onClick={e=>{return handleClick(e)}}>
				Reload Pokemons
			</button>
		<div>
		<div>
			<select className={styles.select} onChange={e=> handleOnSort(e)}>
				<option value="without">Order By Name</option>
				<option value="ascName">Ascending</option>
				<option value="descName">Descending</option>
			</select>
			<select className={styles.select}  onChange={e=> handleOnSort(e)}>
				<option value="without">Order By Attack</option>
				<option value="ascAt">Ascending</option>
				<option value="descAt">Descending</option>
			</select>
		</div>
		<div>
			<select className={styles.select} name = "types" onChange={e=> handleFilterType(e)}> 
				<option value="All">All Types</option>
					{ types.map((typ) => (
							<option value={typ.name}>{typ.name}</option>
							))}
			</select>
			
			<select className={styles.select} onChange={e=> handleOrigCrea(e)}>
				<option value="All">All Pokemons</option>
				<option value="orig">Original</option>
				<option value="crea">Created</option>
			</select>
		</div>
	<Paged
		pokemonsByPage = {pokemonsByPage}
		cantPokemons={allPokemons?.length}
		paged={paged}
	/>
	<SearchBar />
	<div className = {styles.cards}>
	{
		currentPokemons && currentPokemons.map((pok) => {
			const id = pok.id;
			return (
				<>
				<Link to={"/home/" + pok.id}>
					<PokemonCard key={pok.id+pok.name} id={pok.id} name={pok.name} image={pok.img} types={pok.types} />
				</Link>
				</>
			);		
		})
	}
	</div>
	</div>
</div>	
		)
}