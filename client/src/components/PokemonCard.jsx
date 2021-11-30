import React from 'react';

export default function Card({name, image, types}) {
	return (
		<div>
			<h3>{name}</h3>
			<img src={image} alt="img not found" width="50px" height="62px" />
			<h5>Types</h5>
		</div>
		)}
