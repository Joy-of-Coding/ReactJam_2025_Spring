import React from 'react';
import './styles/GameScreen.css';

const GameScreen = ({ onEndGame }) => {
  return (
    <div className="game-screen">
      <h2>The game has started!</h2>
      <button className="end-button" onClick={onEndGame}>
        End Game
      </button>
    </div>
  );
};

export default GameScreen;
