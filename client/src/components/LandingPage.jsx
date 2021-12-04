import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import landing from '../images/family_landing.png'; 

 

 export default function LandingPage() {
    
     return (
        <div className={styles.gral}>
            <div>
                <h1 className={styles.h1}>Welcome</h1>
            </div>
            <img src={landing} alt="Pokemon" />
            <div>
                <Link to='/home'>
                    <button className={styles.enter}>Enter</button>
                </Link>
            </div>
        </div>
        );
 }

