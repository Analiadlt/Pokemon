import React from 'react';

export default function Paginado ({pokemonsByPage, cantPokemons, paginado}) {
	const pageNumbers = [];
	for (let i=0; i<Math.ceil(cantPokemons/pokemonsByPage); i++) {
		pageNumbers.push(i+1);
	}
	return(
		<nav>
			<ul>
				{ pageNumbers &&
					pageNumbers.map(number => (
						<ul className='number' key={number}>
							<p onClick={()=> paginado(number)}>{number}</p>
						</ul>	
					))}
			</ul>
		</nav>
		)
}