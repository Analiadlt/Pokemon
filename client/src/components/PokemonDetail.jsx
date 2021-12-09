import React from 'react';
import {Link }  from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {getPokemonDetail} from '../actions/index';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import styles from './PokemonDetail.module.css';

export default function PokemonDetail() {
	let {id} = useParams();
    const default_img = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';

	const dispatch=useDispatch()
	useEffect(() => {
		dispatch(getPokemonDetail(id))
	}, [dispatch, id])

	const myPokemon = useSelector ((state)=> state.detail);
	
	return (
		<div className={styles.myPokemon}>
		{
			myPokemon ?
			<div>
				<h2>{myPokemon.name}</h2>
				<img src={myPokemon.img? myPokemon.img : default_img} alt='' width="200px" height="250px"/>
				<p>Height: {myPokemon.height} - Weight: {myPokemon.weight}</p>	
				<h2>Stats</h2>
			<h4>
				<p>Life: {myPokemon.life} </p>
				<p>Attack: {myPokemon.attack} </p>
				<p>Defense: {myPokemon.defense} </p> 
				<p>Speed: {myPokemon.speed}</p>
			</h4>

			<h4>Types: {(id.length<5)? 
							myPokemon.types?.reduce((e1,e2) => e1 + '-' + e2)
							: myPokemon.types?.map(el=>el.name + ('-'))
						}</h4>
			</div> 
			: <p>Loading...</p>	
		}
			<Link to= '/home'>
				<button className={styles.button}>Come back</button>
			</Link>
		</div>
		)
}
