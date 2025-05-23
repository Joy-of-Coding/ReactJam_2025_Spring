import React from 'react';
import "../styles/GameScreen.css"
import Buyer from "../Buyer.jsx";
import Salesperson from "../Salesperson.jsx";
import Car from "../Car.jsx";
import CarList from "../CarList.jsx";
import WalkAwayButton from "../Buttons/WalkAwayButton.jsx";
import SignTheContractButton from "../Buttons/SignTheContractButton.jsx";


const GameScreen = ({ onEndGame, onNegotiation, playerId }) => {
  
  return (
    <div className="game-screen">
      <h2>Welcome to the Showroom!</h2>
      
      <>

      <CarList />

      </>
      {/* End game button */}

      <button className="end-button" onClick={onNegotiation}>
        
        Start Negotiation
      </button>

      <button className="end-button" onClick={onEndGame}>
        
        End Game
      </button>
    </div>
  );
};

export default GameScreen;
