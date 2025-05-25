import React from 'react';
import "../styles/ChoicesScreen.css"
import Buyer from "../Buyer.jsx";
import Salesperson from "../Salesperson.jsx";
import Car from "../Car.jsx";
import CarList from "../CarList.jsx";
import WalkAwayButton from "../Buttons/WalkAwayButton.jsx";
import SignTheContractButton from "../Buttons/SignTheContractButton.jsx";


const ChoicesScreen = ({ onEndGame, onNegotiation, playerId, game}) => {
  const player = Rune.getPlayerInfo(playerId);
  // const playerName = Rune.getPlayerInfo(displayName)
  // const avatarIcon = Rune.getPlayerInfo(avatarUrl)
        
  
  return (
    <div className="game-screen">
    <h2>I am {player.playerId}, called {player.displayName} </h2>

      {/* To NegotiationScreen Button */}    
      <button className="end-button" onClick={onNegotiation}>
        
        Talk to a Seller
      </button>

      {/* End Game Button */}
      <button className="end-button" onClick={onEndGame}>
        Leave without a Car (end game)
      </button>
    </div>
  );
};

export default ChoicesScreen;
