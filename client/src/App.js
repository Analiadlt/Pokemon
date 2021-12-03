import './App.css';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import React from 'react';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate';
import PokemonDetail from './components/PokemonDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
     
        <Routes>
         <Route exact path="/" element={<LandingPage />}></Route>
         <Route exact path="/home" element={<Home />}></Route>
         <Route path="/pokemon" element={<PokemonCreate />}></Route>
         <Route path="/home/:id" element={<PokemonDetail />}></Route>
        </Routes>
        
      </div>
    </BrowserRouter>
    
  )
}

export default App;
