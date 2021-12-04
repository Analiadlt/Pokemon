import React from 'react';
import{useState} from 'react';
import {useDispatch} from 'react-redux';
import {getPokemonByName} from '../actions';
import styles from './SearchBar.module.css';

export default function SearchBar(){
	const dispatch = useDispatch();
	const [name, setName] = useState('');


function handleInputChange(e) {
	e.preventDefault();
	setName(e.target.value);
}

function handleSubmit (e) {
	e.preventDefault();
	dispatch(getPokemonByName(name));
	setName('');
}

return (
	<div className={styles.searchBar}>
		<input
		type = 'text'
		placeholder= "Search for..."
		onChange= {(e) => handleInputChange(e)}
		/>
		<button type='submit' onClick={(e) => handleSubmit(e)}>Search for</button>
	</div>
	)
}