import React from 'react';
import smile from './smile.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={smile} className="App-logo"/>
        <p>  
          Welcome to your interactive tamagotchi
        </p>
      
      </header>
    </div>
  );
}

export default App;
