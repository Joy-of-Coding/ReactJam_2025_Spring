import React from 'react';
import "../styles/NegotiationScreen.css";
import Buyer from "../Buyer.jsx";
import Salesperson from "../Salesperson.jsx";
import CarList from "../Cars/CarList.jsx";
import WalkAwayButton from "../Buttons/WalkAwayButton.jsx";
import SignTheContractButton from "../Buttons/SignTheContractButton.jsx";

const NegotiationScreen = ({ offNegotiation, yourPlayerId, game }) => {
  return (
    <div className="game-screen">
      <h2>The negotiation has started!</h2>

      {/* Section 1: Player & Role */}
      <div className="section-box">Player
        <div className="player-component">
          <div className="player-info-component">
            <div className="avatar-placeholder">◉</div>
            <div className="player-name">Barbara Player</div>
            <div className="player-status">Role</div>
          </div>
          <div className="player-role-component">
            <div className="secret-info">*secret info and goals here*</div>
            <div className="role-component">
              {game?.playerRole === "buyer" ? <Buyer /> : <Salesperson />}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Car List */}
      <div className="section-box">
        <div className="car-list-container">
          <CarList />
        </div>
      </div>

      {/* Section 3: Contract */}
      <div className="section-box">
        <div className="contract-component">
          <div className="price-row">
            <label htmlFor="price-input"><strong>Price:</strong></label>
            <input id="price-input" type="text" placeholder="Enter price" />
            <label htmlFor="car-input"><strong>Car #:</strong></label>
            <input id="car-input" type="text" placeholder="Car number" />
          </div>

          <div className="spiffs-row">
            <strong>Spiffs and features:</strong>
            <input type="text" placeholder="Spiffs textbox!" />
          </div>

          <div className="buyer-actions">
            <span><strong>Buyer:</strong></span>
            <WalkAwayButton playerId={yourPlayerId} />
            <SignTheContractButton yourPlayerId={yourPlayerId} game={game} />
          </div>
        </div>
      </div>

      {/* Exit Button */}
      <button className="end-button" onClick={offNegotiation}>
        Back to Showroom
      </button>
    </div>
  );
};

export default NegotiationScreen;
