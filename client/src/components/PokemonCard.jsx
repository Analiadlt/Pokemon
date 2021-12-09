import React from 'react';
import styles from './PokemonCard.module.css';

export default function Card({name, image, types, id}) {
	return (
		<div className = {styles.pokemoncard}>
			<span className={styles.pokName}>{name}</span>
			<img src={image} alt= '' width="100px" height="125px" />
			<div className={styles.pokTypes}>
				<label>Types</label>
				<h4>{ (typeof id === 'number')? 
							types?.reduce((e1,e2) => e1 + '-' + e2)
							: types?.map(el=>el.name + '- ')
						}</h4>
			</div>	
		</div>
		)
}



