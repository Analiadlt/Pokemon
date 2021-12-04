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
				<h1>{myPokemon.name}</h1>
				<img src={myPokemon.img} alt='' width="100px" height="125px"/>
				<h2>Estadísticas</h2>
				<h5>Types: {!myPokemon.createAt? myPokemon.types + ' ' : myPokemon.types.map(el=>el.name + (' '))}</h5>
			</div> 
			: <p>Loading...</p>	
		}
		<Link to= '/home'>
			<button className={styles.button}>Come back</button>
		</Link>
		</div>
		)
}