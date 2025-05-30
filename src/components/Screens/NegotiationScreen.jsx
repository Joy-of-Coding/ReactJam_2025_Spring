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
    <div className="fullscreen-centered" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    }}>
      <div className="game-screen" style={{ 
        padding: '0.3rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.2rem', 
        alignItems: 'center',
        height: '100%',
        boxSizing: 'border-box',
        justifyContent: 'space-between'
      }}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1rem', margin: '0.1rem 0' }}>Negotiation</h2>
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
            marginTop: '0.2rem',
            marginBottom: '0.2rem',
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
    </div>
  );
};

export default NegotiationScreen;