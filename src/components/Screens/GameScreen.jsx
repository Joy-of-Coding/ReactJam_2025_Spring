import React, { useState } from "react";
import "../styles/NegotiationScreen.css"; // Custom styling for this page

import Buyer from "../Buyer.jsx";
import Salesperson from "../Salesperson.jsx";
import CarList from "../Cars/CarList.jsx";
import WalkAwayButton from "../Buttons/WalkAwayButton.jsx";
import SignTheContractButton from "../Buttons/SignTheContractButton.jsx";
import useCountdown from "../hooks/useCountdown";
import Showroom from "./Showroom.jsx";

const GameScreen = ({ onEndChoice, onEndGame, onNegotiation, yourPlayerId, game }) => {
  // const [playerRole, setPlayerRole] = useState("buyer"); // Placeholder – should be set via Rune or game logic

  // state to show timer
  const remainingTime = useCountdown(game); // using counttimer hook
    
  return (
    <>
    <div className="game-screen">
      <h1>Game Screen</h1>
        {/*countdown timer*/}
      {remainingTime !== null && (
        <div className="countdown-timer">
            Game starting in: {remainingTime} second{remainingTime !== 1 ? 's' : ''}
        </div>
        )}

        {/* Negotiation Screen */}
           <h2>Negotiations</h2>
            <h2>LOBBY</h2>  

      <button className="end-button" onClick={onNegotiation}>
        Start Negotiation
      </button>

      <Showroom
        onEndChoice={onEndChoice}
        onEndGame={onEndGame}
        onNegotiation={onNegotiation}
        yourPlayerId={yourPlayerId} 
        game={game} 
      />
      
    </div>
  </>
  );
};

export default GameScreen;
 
