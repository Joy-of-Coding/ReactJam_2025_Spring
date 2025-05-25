import React, { useState } from "react";
import "../styles/NegotiationScreen.css"; // Custom styling for this page

import Buyer from "../Buyer.jsx";
import Salesperson from "../Salesperson.jsx";
import CarList from "../CarList.jsx";
import WalkAwayButton from "../Buttons/WalkAwayButton.jsx";
import SignTheContractButton from "../Buttons/SignTheContractButton.jsx";

const GameScreen = ({ onEndGame, onNegotiation, playerId, game }) => {
  const [playerRole, setPlayerRole] = useState("buyer"); // Placeholder – should be set via Rune or game logic

  return (
    <div className="game-screen">
      <h2>Negotiations</h2>

      <div className="player-component">
        <div className="player-info">
          <h3>Player</h3>
          <div className="player-name">Barbara Smith</div>
          <p>{playerRole === "buyer" ? "Buyer" : "Salesperson"}</p>
        </div>

        <div className="roles-section">
          {playerRole === "buyer" ? (
            <div className="buyer-section">
              <Buyer />
            </div>
          ) : (
            <div className="salesperson-section">
              <Salesperson />
              <div className="secret-info">
                <p>Secret info and goals go here</p>
              </div>
            </div>
          )}
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
          <WalkAwayButton playerId={playerId} />
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
