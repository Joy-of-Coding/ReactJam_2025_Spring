import React, { useState } from 'react';
import "../styles/NegotiationScreen.css";
import PlayerSection from "../Negotiation/PlayerSection";
import CarSection from "../Negotiation/CarSection";
import ContractSection from "../Negotiation/ContractSection";

const NegotiationScreen = ({ offNegotiation, yourPlayerId, game, onEndGame }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  
  // Handle car selection from the CarSection
  const handleCarSelect = (car, index) => {
    setSelectedCar(car);
    setSelectedCarIndex(index);
  };

  
  const handleSignContract = () => {
    // Handle signing the contract
    onEndGame(); // End the game when contract is signed
  };
  
  return (
    <div className="fullscreen-centered">

    <div className="game-screen" style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
      <h2 style={{ fontSize: '1.1rem', margin: '0.3rem 0' }}>The negotiation has started!</h2>

      {/* Section 1: Player & Role */}
      <div className="section-box" style={{ width: '95%', maxWidth: '360px', padding: '0.3rem', color: 'white', backgroundColor: '#45a049', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <h3 style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}>Player</h3>

        {/* Player Info Container */}
        <div style={{ backgroundColor: '#1565C0', padding: '0.3rem', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <div className="avatar-placeholder" style={{ fontSize: '0.9rem' }}>◉</div>
            <div>
              <div className="player-name" style={{ fontSize: '0.85rem' }}><strong>Barbara Player</strong></div>
              <div className="player-status" style={{ fontSize: '0.75rem' }}>Role</div>
            </div>
          </div>
        </div>

        {/* Secret Info */}
        <div className="secret-info" style={{ fontSize: '0.75rem', padding: '0.2rem' }}>
          *secret info and goals here*
        </div>

        {/* Buyer/Seller Container Wrapper */}
        <div style={{ backgroundColor: '#e8e8e8', padding: '0.3rem', borderRadius: '6px' }}>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <div style={{ flex: 1, backgroundColor: '#45a049', padding: '0.3rem', borderRadius: '6px', minHeight: '50px' }}>
              <h4 style={{ fontSize: '0.85rem', margin: '0.2rem 0' }}>Buyer</h4>
              {/* Future content goes here */}
            </div>
            <div style={{ flex: 1, backgroundColor: '#D32F2F', padding: '0.3rem', borderRadius: '6px', minHeight: '50px' }}>
              <h4 style={{ fontSize: '0.85rem', margin: '0.2rem 0' }}>Seller</h4>
              {/* Future content goes here */}
            </div>
          </div>

        </div>
        
        {/* Player Section */}
        <PlayerSection yourPlayerId={yourPlayerId} game={game} />
        
        {/* Car Section */}
        <CarSection 
          game={game} 
          yourPlayerId={yourPlayerId} 
          onCarSelect={handleCarSelect} 
        />
        
        {/* Contract Section */}
        <ContractSection 
          yourPlayerId={yourPlayerId} 
          game={game} 
          selectedCar={selectedCar}
          selectedCarIndex={selectedCarIndex}
        />
        
        {/* Exit Button */}
        <button 
          className="end-button" 
          style={{ 
            fontSize: '0.85rem', 
            padding: '0.3rem 0.6rem', 
            marginTop: '0.3rem',
            marginBottom: '0.3rem',
            backgroundColor: '#45a049',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }} 
          onClick={offNegotiation}
        >
          Back to Showroom
        </button>
      </div>


      {/* Section 2: Car List */}
      <div className="section-box" style={{ width: '95%', maxWidth: '360px', padding: '0.3rem', color: 'white', backgroundColor: '#D32F2F', borderRadius: '6px' }}>
        <h3 style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}>Car List</h3>
        <div className="car-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="car-container"
              style={{
                padding: '0.2rem',
                backgroundColor: '#FFD700',
                color: '#2C3E50',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <h4 style={{ fontSize: '0.85rem', margin: '0.1rem 0' }}>Car {index + 1}</h4>
              <p style={{ fontSize: '0.75rem', margin: '0.1rem 0' }}>Details coming soon...</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Contract */}
      <div className="section-box" style={{ width: '95%', maxWidth: '360px', padding: '0.3rem', color: 'white', backgroundColor: '#1565C0', borderRadius: '6px' }}>
        <h3 style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}>Contract</h3>
        <div className="contract-component" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="price-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <label htmlFor="price-input" style={{ minWidth: '50px', fontSize: '0.75rem' }}><strong>Price:</strong></label>
              <input id="price-input" type="text" placeholder="Enter price" style={{ flex: 1, fontSize: '0.75rem', padding: '0.2rem' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <label htmlFor="car-input" style={{ minWidth: '50px', fontSize: '0.75rem' }}><strong>Car #:</strong></label>
              <input id="car-input" type="text" placeholder="Car number" style={{ flex: 1, fontSize: '0.75rem', padding: '0.2rem' }} />
            </div>
          </div>

          <div className="spiffs-row" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <strong style={{ minWidth: '50px', fontSize: '0.75rem' }}>Spiffs:</strong>
            <input type="text" placeholder="Spiffs textbox!" style={{ flex: 1, fontSize: '0.75rem', padding: '0.2rem' }} />
          </div>

          <div className="buyer-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ minWidth: '50px', fontSize: '0.75rem' }}><strong>Buyer:</strong></span>
            <WalkAwayButton playerId={yourPlayerId} />
            <SignTheContractButton yourPlayerId={yourPlayerId} game={game} />
          </div>
        </div>
      </div>

      {/* Exit Button */}
      <button className="end-button" style={{ fontSize: '0.85rem', padding: '0.3rem 0.6rem', marginTop: '0.3rem' }} onClick={offNegotiation}>
        Back to Showroom
      </button>
    </div>

    </div>
  );
};

export default NegotiationScreen;