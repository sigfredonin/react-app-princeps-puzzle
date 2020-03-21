import React from 'react';
import './princeps.css';
import Game from './components/game';

function App() {
  return (
    <div className="princeps-app">
      <div className="princeps-title">
          Princeps Puzzle
      </div>
      <div className="princeps-panel">
        <Game />
      </div>
    </div>
  );
}

export default App;
