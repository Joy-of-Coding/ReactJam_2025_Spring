import React, { useState } from 'react';
import "../styles/GameScreen.css";
import Buyer from "../Buyer.jsx";
import Salesperson from "../Salesperson.jsx";
import CarList from "../CarList.jsx";
import WalkAwayButton from "../Buttons/WalkAwayButton.jsx";
import SignTheContractButton from "../Buttons/SignTheContractButton.jsx";

const GameScreen = ({ onEndGame }) => {
  // State to track the player's role
  const [playerRole, setPlayerRole] = useState('buyer'); // Default to 'buyer'; can be 'salesperson'

  return (
    <div className="game-screen">
      {/* Negotiation Screen */}
      <div className="negotiation-screen">
        <h2>Negotiations</h2>

        {/* Player Component */}
        <div className="player-component">
          <div className="player-info">
            <h3>Player</h3>
            <div className="player-name">Barbara Smith</div>
            <p>{playerRole === 'buyer' ? 'Buyer' : 'Salesperson'}</p>
          </div>
          <div className="roles-section">
            {playerRole === 'buyer' ? (
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

        {/* Car List */}
        <div className="car-list-section">
          <h3>Car List</h3>
          <div className="car-info">
            <CarList />
          </div>
        </div>

        {/* Contract Component */}
        <div className="contract-component">
          <h3>Contract</h3>
          <div className="price-car-inputs">
            <span style={{ fontWeight: "bold" }}>Car:</span>
            <input id="car-input" type="text" placeholder="Enter car name" />
            <label htmlFor="price-input" style={{ fontWeight: "bold" }}>Price:</label>
            <input id="price-input" type="text" placeholder="Enter your price" />
          </div>
          <div className="splits-features">
            <span style={{ fontWeight: "bold" }}>Splits and Features:</span>
            <input type="text" placeholder="Splits and Features textbox" />
          </div>
          <div className="buyer-actions">
            <span style={{ fontWeight: "bold" }}>Buyer:</span>
            <WalkAwayButton />
            <SignTheContractButton />
          </div>
        </div>

        {/* End Game Button */}
        <button className="end-button" onClick={onEndGame}>
          End Game
        </button>
      </div>
    </div>
  );
};

export default GameScreen;