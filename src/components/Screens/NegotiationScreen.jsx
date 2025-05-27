import React from 'react';
import "../styles/NegotiationScreen.css";
import PlayerSection from "../Negotiation/PlayerSection";
import CarSection from "../Negotiation/CarSection";
import ContractSection from "../Negotiation/ContractSection";

const NegotiationScreen = ({ offNegotiation, yourPlayerId, game }) => {
  return (
    <div className="fullscreen-centered">
      <div className="game-screen" style={{ 
        padding: '0.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.3rem', 
        alignItems: 'center',
        height: '100vh',
        boxSizing: 'border-box',
        justifyContent: 'space-between'
      }}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1rem', margin: '0.2rem 0' }}>Negotiation</h2>
        </div>
        
        {/* Player Section */}
        <PlayerSection yourPlayerId={yourPlayerId} game={game} />
        
        {/* Car Section */}
        <CarSection game={game} />
        
        {/* Contract Section */}
        <ContractSection yourPlayerId={yourPlayerId} game={game} />
        
        {/* Exit Button */}
        <button 
          className="end-button" 
          style={{ 
            fontSize: '0.85rem', 
            padding: '0.3rem 0.6rem', 
            marginTop: '0.3rem',
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