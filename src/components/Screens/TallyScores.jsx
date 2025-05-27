import React from 'react';
import { scoreNegotiation } from '../Buttons/ScoringLogic';

const TallyScores = ({ negotiationData, onClose }) => {
  // This is a placeholder implementation
  // In a real implementation, negotiationData would include:
  // - selected car from the seller
  // - buyer profile/persona 
  // - negotiated deal details (price, spiffs, etc.)
  
  const placeholderResults = {
    buyerPoints: 45,
    salespersonPoints: 30,
    buyerMatchReasons: ['Under Budget', 'Car Type Match', 'Color Match'],
    sellerMatchReasons: ['Fair Price', 'Paint Upsell']
  };

  return (
    <div className="tally-scores-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="score-card" style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1rem',
        width: '90%',
        maxWidth: '360px',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>Negotiation Results</h2>
        
        {/* Scores Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          <div className="buyer-score">
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Buyer</h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1565C0'
            }}>
              {placeholderResults.buyerPoints}
            </div>
          </div>
          
          <div className="seller-score">
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Seller</h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#FFD700'
            }}>
              {placeholderResults.salespersonPoints}
            </div>
          </div>
        </div>
        
        {/* Reasons Section */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#1565C0' }}>Buyer Wins</h4>
            <ul style={{ 
              margin: 0,
              paddingLeft: '1.2rem',
              fontSize: '0.9rem'
            }}>
              {placeholderResults.buyerMatchReasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
          
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#FFD700' }}>Seller Wins</h4>
            <ul style={{ 
              margin: 0,
              paddingLeft: '1.2rem',
              fontSize: '0.9rem'
            }}>
              {placeholderResults.sellerMatchReasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Close Button */}
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: '#45a049',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TallyScores;
