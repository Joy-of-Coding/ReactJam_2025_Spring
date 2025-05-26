import React from 'react';
import "../styles/NegotiationScreen.css";
import Buyer from "../Buyer.jsx";
import Salesperson from "../Salesperson.jsx";
import CarList from "../Cars/CarList.jsx";
import WalkAwayButton from "../Buttons/WalkAwayButton.jsx";
import SignTheContractButton from "../Buttons/SignTheContractButton.jsx";
import carData from '../Cars/CarInfo';

const NegotiationScreen = ({ offNegotiation, yourPlayerId, game }) => {
  return (
    <div className="game-screen" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2>The negotiation has started!</h2>

      {/* Section 1: Player & Role */}
      <div className="section-box" style={{ padding: '1rem', backgroundColor: 'gray', borderRadius: '8px' }}>
        <h3>Player Role</h3>
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
      <div className="section-box" style={{ padding: '1rem', backgroundColor: 'gray', borderRadius: '8px' }}>
        <h3>Car List</h3>
        <div className="car-list">
          {/* Future dynamic rendering */}
          {/* {carData && carData.map((car, index) => (
            <div key={index} className="car-container">
              <h3>{car.make} {car.model}</h3>
              <p>Price: ${car.price ? car.price.toLocaleString() : 'N/A'}</p>
            </div>
          ))} */}

          {/* Temporary placeholder containers */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="car-container" style={{ padding: '.5rem', marginBottom: '1rem', backgroundColor: 'blue', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h4>Car {index + 1}</h4>
              <p>Details coming soon...</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Contract */}
      <div className="section-box" style={{ padding: '1rem', backgroundColor: 'gray', borderRadius: '8px' }}>
        <h3>Contract</h3>
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
