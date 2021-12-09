import React from 'react';
import styles from './Paged.module.css';

export default function Paged ({pokemonsByPage, cantPokemons, paged}) {
	const pageNumbers = [];
	for (let i=0; i<Math.ceil(cantPokemons/pokemonsByPage); i++) {
		pageNumbers.push(i+1);
	}
	return(
		<nav>
			<ul>
				{ pageNumbers &&
					pageNumbers.map(number => (
						<ul className={styles.number} key={number}>
							<button onClick={()=> paged(number)}>{number}</button>
						</ul>	
					))}
			</ul>
		</nav>
		)
}