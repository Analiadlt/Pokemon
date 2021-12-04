import React from 'react';
import{useState} from 'react';
import {useDispatch} from 'react-redux';
import {getPokemonByName} from '../actions';
import styles from './SearchBar.module.css';

export default function SearchBar(){
	const dispatch = useDispatch();
	const [pokeName, setPokeName] = useState('');


function handleInputChange(e) {
	e.preventDefault();
	setPokeName(e.target.value);
}

function handleSubmit (e) {
	e.preventDefault();
	dispatch(getPokemonByName(pokeName.trim()));
	setPokeName('');
}

return (
	<form className={styles.searchBar}>
		<input
		type = 'text'
		placeholder= "Search for..."
		onChange= {(e) => handleInputChange(e)}
		></input>

		<button type='submit' onClick={(e) => handleSubmit(e)}>Search for</button>
	</form>
	)
}