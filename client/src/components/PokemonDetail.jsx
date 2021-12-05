import React from 'react';
import {Link }  from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {getPokemonDetail} from '../actions/index';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import styles from './PokemonDetail.module.css';

export default function PokemonDetail() {
	let {id} = useParams();
    
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
				<img src={myPokemon.img} alt='' width="200px" height="250px"/>
				<p>Height: {myPokemon.height} - Weight: {myPokemon.weight}</p>	
				<h2>Stats</h2>
			<h4>{!myPokemon.createAt? 
				myPokemon.stats.map(el=> {return <p>{el.name}: {el.base}</p>})  
				: myPokemon.stats.map(el=>el.name + (' '))
			}</h4>

			<h4>Types: {!myPokemon.createAt? 
							myPokemon.types + '  ' 
							: myPokemon.types.map(el=>el.name + ('  '))
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