import React from 'react';
import { Link } from 'react-router-dom';

/*import clases from './Landing.module.css'
import pokemon from '../../Imagenes/Logo.png'
import family from '../../Imagenes/FamilyPokes.png'*/ 
 

 export default function LandingPage() {
     return (
        <div>
            <div>
                <h1>Welcome</h1>
            </div>
            <div>
                <Link to='/home'>
                    <button>Enter</button>
                </Link>
            </div>
        </div>
        );
 }

