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
    <div className="game-screen" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <h2>The negotiation has started!</h2>

      {/* Section 1: Player & Role */}
      <div className="section-box" style={{ width: '90%', maxWidth: '800px', padding: '1rem', backgroundColor: 'green', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>Player Role</h3>

        {/* Player Info Container */}
        <div style={{ backgroundColor: '#87CEEB', padding: '1rem', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="avatar-placeholder">◉</div>
            <div>
              <div className="player-name"><strong>Barbara Player</strong></div>
              <div className="player-status">Role</div>
            </div>
          </div>
        </div>

        {/* Secret Info */}
        <div className="secret-info">
          *secret info and goals here*
        </div>

        {/* Buyer/Seller Side-by-Side Containers */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, backgroundColor: 'red', padding: '1rem', borderRadius: '8px', minHeight: '100px' }}>
            <h4>Buyer</h4>
            {/* Future content goes here */}
          </div>
          <div style={{ flex: 1, backgroundColor: 'yellow', padding: '1rem', borderRadius: '8px', minHeight: '100px' }}>
            <h4>Seller</h4>
            {/* Future content goes here */}
          </div>
        </div>
      </div>

      {/* Section 2: Car List */}
      <div className="section-box" style={{ width: '90%', maxWidth: '800px', padding: '1rem', backgroundColor: 'yellow', borderRadius: '8px' }}>
        <h3>Car List</h3>
        <div className="car-list">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="car-container"
              style={{
                padding: '0.4rem',
                marginBottom: '0.8rem',
                backgroundColor: 'blue',
                border: '1px solid #ccc',
                borderRadius: '6px'
              }}
            >
              <h4 style={{ fontSize: '1rem', margin: '0.5rem 0' }}>Car {index + 1}</h4>
              <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>Details coming soon...</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Contract */}
      <div className="section-box" style={{ width: '90%', maxWidth: '800px', padding: '1rem', backgroundColor: 'red', borderRadius: '8px' }}>
        <h3>Contract</h3>
        <div className="contract-component" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="price-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label htmlFor="price-input" style={{ minWidth: '80px' }}><strong>Price:</strong></label>
              <input id="price-input" type="text" placeholder="Enter price" style={{ flex: 1 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label htmlFor="car-input" style={{ minWidth: '80px' }}><strong>Car #:</strong></label>
              <input id="car-input" type="text" placeholder="Car number" style={{ flex: 1 }} />
            </div>
          </div>

          <div className="spiffs-row" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <strong style={{ minWidth: '80px' }}>Spiffs and features:</strong>
            <input type="text" placeholder="Spiffs textbox!" style={{ flex: 1 }} />
          </div>

          <div className="buyer-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ minWidth: '80px' }}><strong>Buyer:</strong></span>
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