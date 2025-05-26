import React from 'react';

const WalkAwayButton = ({ playerId, offNegotiation }) => {
  const handleWalkAway = () => {
    console.log("Buyer decided to walk away");
    
    // If offNegotiation function is provided, call it to exit negotiation
    if (typeof offNegotiation === 'function') {
      offNegotiation();
    }
  };

  return (
    <button 
      className="walk-away-button" 
      onClick={handleWalkAway}
      style={{
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        fontSize: '14px',
        cursor: 'pointer'
      }}
    >
      Walk Away
    </button>
  );
};

export default WalkAwayButton;