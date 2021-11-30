import './App.css';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import React from 'react';
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
     
        <Routes>
         <Route exact path="/" element={<LandingPage />}></Route>
         <Route path="/home" element={<Home />}></Route>
        </Routes>
        
      </div>
    </BrowserRouter>
    
  );
}

export default App;
