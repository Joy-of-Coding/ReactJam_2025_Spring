import React, { useState } from "react";
import "../styles/NegotiationScreen.css"; // Custom styling for this page
import useCountdown from "../hooks/useCountdown";
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
  const remainingTime = useCountdown(game); // using count timer hook
    
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

      <div className="player-component">
        <div className="player-info">
>>>>>>>>> Temporary merge branch 2
          <div className="roles-section">
            <div className="buyer-section">
              <h3>Buyer View</h3>
              <pre>{JSON.stringify(game.personas[yourPlayerId], null, 2)}</pre>
              <Buyer yourPlayerId={yourPlayerId} game={game} />
              </div>
            {/* {playerRole === "buyer" ? (
            <div className="buyer-section">
              <Buyer yourPlayerId={yourPlayerId} game={game}/>
            </div>
          ) : (
            <div className="salesperson-section">
              <Salesperson />
              <div className="secret-info">
                <p>Secret info and goals go here</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="car-list-section">
        <h3>Car List</h3>
        <div className="car-info">
          <CarList />
        </div>
      </div>

      <div className="contract-component">
        <h3>Contract</h3>

        <div className="input-row">
          <span>Car:</span>
          <input id="car-input" type="text" placeholder="Enter car name" />
        </div>

        <div className="input-row">
          <label htmlFor="price-input">Price:</label>
          <input id="price-input" type="text" placeholder="Enter your price" />
        </div>

        <div className="input-row">
          <span>Splits and Features:</span>
          <input type="text" placeholder="Splits and Features textbox" />
        </div>

        <div className="input-row">
          <span>Buyer:</span>
          <WalkAwayButton yourPlayerId={yourPlayerId} />
          <SignTheContractButton />
        </div>
      </div>

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
 
