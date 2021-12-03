import React, {useState, useEffect} from 'react';
import {Link, useNavigate  }  from 'react-router-dom';
import {postPokemons, getTypes} from '../actions/index';
import { useDispatch, useSelector} from 'react-redux';

function validate (input){
	let errors={};
	if (!input.name) {
		errors.name='Please, insert a lower case Name.'
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
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
		setErrors(validate({
			...input,
			[e.target.name]: e.target.value
		}));
		console.log('inputt', input)
	}

	function handleSelect(e){
		setInput({
			...input,
			types: [...input.types, e.target.value]
		})
	}

	function handleSubmit(e){
		e.preventDefault();
		dispatch(postPokemons(input));
		alert('Pokemon created!');
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
		types: input.types.filter(typ=>typ !==el)
	})
}


	useEffect(() => {
		dispatch(getTypes());
	}, [dispatch]);

	return (
		<div>
			<Link to='/home'><button>Come back</button></Link>
			<h1>New Pokemon Creation</h1>
			<form onSubmit={(e)=>handleSubmit(e)}>
				<div>
					<label>Name:</label>
					<input type='text' value= {input.name} name='name' onChange={(e)=> handleChange(e)} />
					{errors.name&& (
						<p>{errors.name}</p>
						)}
				</div>
				<div>
					<label>Height:</label>
					<input type='number' value= {input.height} name='height' onChange={(e)=> handleChange(e)}/>

					<label>Weight:</label>
					<input type='number' value= {input.weight} name='weight' onChange={(e)=> handleChange(e)} />
				</div>
				
				<div>
					<label>Life:</label>
					<input type='number' value= {input.life} name='life' onChange={(e)=> handleChange(e)}/>
					<label>Attack:</label>
					<input type='number' value= {input.attack} name='attack' onChange={(e)=> handleChange(e)}/>
					<label>Defense:</label>
					<input type='number' value= {input.defense} name='defense' onChange={(e)=> handleChange(e)}/>
					<label>Speed:</label>
					<input type='number' value= {input.speed} name='speed' onChange={(e)=> handleChange(e)}/>
				</div>
				<div>
					<label>Image:</label>
					<input type='text' value= {input.img} name='img' onChange={(e)=> handleChange(e)}/>
				</div>
				<label>Types:</label>
				<select onChange={(e)=> handleSelect(e)}>
					{types.map((typ) => (
						<option value={typ.name}>{typ.name}</option>
						))}
				</select>
				<ul>{input.types.map(t => t + " -")}</ul>
				<button type='submit'>Create Pokemon</button>
			</form>
			{input.types.map(el=>
				<div>
				<p>{el}</p>
				<button onClick={()=>handleDelete(el)}>x</button>
				</div>)

			}
		</div>
	)
}