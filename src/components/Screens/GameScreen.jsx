import React, { useState } from "react";
import "../styles/NegotiationScreen.css"; // Custom styling for this page

import Buyer from "../Buyer.jsx";
import Salesperson from "../Salesperson.jsx";
import CarList from "../Cars/CarList.jsx";
import WalkAwayButton from "../Buttons/WalkAwayButton.jsx";
import SignTheContractButton from "../Buttons/SignTheContractButton.jsx";

const GameScreen = ({ onEndChoice, onEndGame, onNegotiation, yourPlayerId, game }) => {
  // const [playerRole, setPlayerRole] = useState("buyer"); // Placeholder – should be set via Rune or game logic

  return (
    <div className="game-screen">
      <h2>LOBBY</h2>

      <div className="player-component">
        <div className="player-info">
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
    </div>
  );
};

export default GameScreen;
