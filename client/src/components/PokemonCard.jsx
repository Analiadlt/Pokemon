import React from 'react';
import styles from './PokemonCard.module.css';

export default function Card({name, image, types, id}) {
	const foo = types.map(function(typ) {
   			return (<p key={typ}>{typ}</p>)
	 		})

	return (
		<div className = {styles.pokemoncard}>
			<span className={styles.pokName}>{name}</span>
			<img src={image} alt="img not found" width="100px" height="125px" />
			<div className={styles.pokTypes}>
				<label>Types</label>
				<div id='typs'>{foo}</div>			
			</div>	
		</div>
		)
}

