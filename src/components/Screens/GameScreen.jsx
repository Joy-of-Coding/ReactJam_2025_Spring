import React, { useState } from 'react';
import "../styles/GameScreen.css";
import Showroom from "./Showroom";



const GameScreen = ({ onEndGame, onNegotiation, yourPlayerId, game }) => {

  return (
 <>
        <h2>GAME SCREEN</h2>
        <h3>Your Player ID: {yourPlayerId}</h3>
        <h3>Your Role: {game.roles[yourPlayerId]}</h3>  
        <h3>Your Persona: {game.personas[yourPlayerId]}</h3>  
        <Showroom />


      <button className="end-button" onClick={onNegotiation}>
        
        Start Negotiation
      </button>

        {/* End Game Button */}
        <button className="end-button" onClick={onEndGame}>
          End Game
        </button>
</>
  );
};

export default GameScreen;