import React, { useState } from 'react';
import WalkAwayButton from '../Buttons/WalkAwayButton';
import SignTheContractButton from '../Buttons/SignTheContractButton';

const ContractSection = ({ yourPlayerId, game }) => {
  const [price, setPrice] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [spiffs, setSpiffs] = useState('');

  return (
    <div className="contract-section" style={{
      width: '100%',
      maxWidth: '360px',
      padding: '0.3rem',
      backgroundColor: '#ff6b6b', // Slightly softer red
      borderRadius: '6px',
      height: '25vh',
      overflow: 'hidden'
    }}>
      <h3 style={{ fontSize: '0.9rem', margin: '0.2rem 0', color: 'white' }}>Contract</h3>
      
      <div className="contract-form" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.3rem',
        height: 'calc(100% - 1.5rem)',
        backgroundColor: '#f0f0f0',
        padding: '0.3rem',
        borderRadius: '6px'
      }}>
        {/* Price Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <label htmlFor="price-input" style={{ minWidth: '50px', fontSize: '0.75rem' }}>
            <strong>Price:</strong>
          </label>
          <input 
            id="price-input"
            type="text" 
            placeholder="Enter price" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ 
              flex: 1, 
              fontSize: '0.75rem', 
              padding: '0.2rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }} 
          />
        </div>
        
        {/* Car Number Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <label htmlFor="car-input" style={{ minWidth: '50px', fontSize: '0.75rem' }}>
            <strong>Car #:</strong>
          </label>
          <input 
            id="car-input"
            type="text" 
            placeholder="Car number" 
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            style={{ 
              flex: 1, 
              fontSize: '0.75rem', 
              padding: '0.2rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }} 
          />
        </div>
        
        {/* Spiffs Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <label htmlFor="spiffs-input" style={{ minWidth: '50px', fontSize: '0.75rem' }}>
            <strong>Spiffs:</strong>
          </label>
          <input 
            id="spiffs-input"
            type="text" 
            placeholder="Extras, warranties, etc." 
            value={spiffs}
            onChange={(e) => setSpiffs(e.target.value)}
            style={{ 
              flex: 1, 
              fontSize: '0.75rem', 
              padding: '0.2rem',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }} 
          />
        </div>
        
        {/* Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '0.3rem', 
          marginTop: 'auto',
          justifyContent: 'space-around'
        }}>
          <WalkAwayButton playerId={yourPlayerId} />
          <SignTheContractButton yourPlayerId={yourPlayerId} game={game} />
        </div>
      </div>
    </div>
  );
};

export default ContractSection; 