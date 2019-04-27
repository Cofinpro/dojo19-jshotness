import React from 'react';
import Gotchi from './components/Gotchi.js'
import './App.css';

function App() {
  return ( 
    <div className="App">
      <header className="App-header">
        <h1>Welcome to your interactive Tamagotchi</h1>
        <h2>Take care of it and keep it in good mood and health</h2>
        <Gotchi />
      </header>
    </div>
  );
}

export default App;
