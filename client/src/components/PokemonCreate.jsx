import React, {useState, useEffect} from 'react';
import { useNavigate  }  from 'react-router-dom';
import { Link }  from 'react-router-dom';
import {postPokemons, getTypes} from '../actions/index';
import { useDispatch, useSelector} from 'react-redux';
import styles from './PokemonCreate.module.css';

function validate (input){
	let errors={};
	if (!input.name) {
		errors.name='Please, insert a Name.'
	}
	if (!input.types.length) {
		errors.types='You must select a Type.'
	}
	return errors;
}

export default function PokemonCreate(){
	const dispatch = useDispatch();
	const navigate  = useNavigate();
	const types = useSelector((state)=> state.types);
	const [errors, setErrors] = useState({});

	const [input, setInput] = useState({
		name: '',
		img: '',
		height: '',
		weight: '',
		life: '',
		attack: '',
		defense: '',
		speed: '',
		types: []
	});

	function handleChange(e) {
		setInput((input)=>{
			const newInput = {
				...input,
			[e.target.name]: e.target.value
			}
		//	const errors= validate(newInput)
		//	setErrors(errors)
			setErrors(validate(newInput));

			return newInput;
		});
	};

	function handleSelect(e){
		setInput({
			...input,
			types: [...input.types, e.target.value]
		})
}

function handleSubmit(e){
	e.preventDefault();
	dispatch(postPokemons(input));
	alert('Pokemon succesfully created!');
	setInput({
		name: '',
		img: '',
		height: '',
		weight: '',
		life: '',
		attack: '',
		defense: '',
		speed: '',
		types: []
	})
	navigate('/home');
}

function handleDelete(el){
	setInput({
		...input,
		types: input.types?.filter(typ=>typ !==el)
	})
}

	useEffect(() => {
		dispatch(getTypes());
	}, [dispatch]);

types.sort((a,b) => a.name < b.name ? -1 : +(a.name > b.name));
return (
		<div >
			<Link to='/home'><button className={styles.button}>Come back</button></Link>
			<h1 className={styles.h1}>New Pokemon Creation</h1>
			<form className={styles.newPokemon} onSubmit={(e)=>handleSubmit(e)}>
				<div className={styles.inputDiv}>	
					<label>Types:</label>
					<select className={styles.inputDiv} onChange={(e)=> handleSelect(e)}>
						{ types.map((typ) => (
							<option value={typ.name}>{typ.name}</option>
							))}
					</select>
				</div>
				<div className={styles.inputDiv}>
					<label>Name:</label>
					<input type='text' value= {input.name} name='name' onChange={(e)=> handleChange(e)} />
					{errors.name && <p className ={styles.errors}>{errors.name}</p>}
				</div>
				<div className={styles.inputDiv}>
					<label>Height:</label>
					<input type='number' value= {input.height} name='height' onChange={(e)=> handleChange(e)}/>

					<label>Weight:</label>
					<input type='number' value= {input.weight} name='weight' onChange={(e)=> handleChange(e)} />
				</div>
				
				<div className={styles.inputDiv}>
					<label>Life:</label>
					<input type='number' value= {input.life} name='life' onChange={(e)=> handleChange(e)}/>
					<label>Attack:</label>
					<input type='number' value= {input.attack} name='attack' onChange={(e)=> handleChange(e)}/>
				</div>
				<div className={styles.inputDiv}>
					<label>Defense:</label>
					<input type='number' value= {input.defense} name='defense' onChange={(e)=> handleChange(e)}/>
					<label>Speed:</label>
					<input type='number' value= {input.speed} name='speed' onChange={(e)=> handleChange(e)}/>					
				</div>
				<div className={styles.inputDiv}>
					<label>Image:</label>
					<input type='text' value= {input.img} name='img' placeholder='Enter image url' onChange={(e)=> handleChange(e)}/>
				</div>
			
			<button className={styles.button} type='submit' disabled={Object.keys(errors).length? true : false}>
				Create Pokemon
			</button>
		</form>
		{input.types.map(el=>
			<>
			<p>{el}</p><button onClick={()=>handleDelete(el)}>x</button>
			</>)
		}
		
		</div>
	)
}