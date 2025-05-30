import React, { useState } from 'react';
import carPersonas from '../../assets/car_buyer_personas_final_enriched.json';

const PlayerSection = ({ yourPlayerId, game, isExpanded }) => {
  const [showBuyerDetails, setShowBuyerDetails] = useState(false);
  
  // Find the buyer and seller IDs from game state
  const buyerId = game.playerIds.find(id => game.roles[id] === "Buyer");
  const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
  
  // Get player info using Rune API
  const buyerInfo = buyerId ? Rune.getPlayerInfo(buyerId) : null;
  const sellerInfo = sellerId ? Rune.getPlayerInfo(sellerId) : null;
  
  // Get buyer's persona if assigned
  const buyerPersonaId = game.personas && buyerId ? game.personas[buyerId] : null;
  const buyerPersona = buyerPersonaId !== null ? carPersonas.find(p => p.id === buyerPersonaId) : null;

  // Determine if current player is the buyer
  const isBuyer = yourPlayerId === buyerId;

  return (
    <div className="player-section-content" style={{ 
      width: '100%',
      padding: '0.3rem',
      backgroundColor: '#f5f5f5',
      borderBottomLeftRadius: '6px',
      borderBottomRightRadius: '6px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: isExpanded ? 'block' : 'none',
      boxSizing: 'border-box'
    }}>
      {/* Buyer Details Toggle - Only for buyer */}
      {isBuyer && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: '0.3rem' 
        }}>
          <button 
            onClick={() => setShowBuyerDetails(!showBuyerDetails)}
            style={{
              border: 'none',
              background: 'rgba(21, 101, 192, 0.1)',
              borderRadius: '4px',
              padding: '0.2rem 0.4rem',
              fontSize: '0.7rem',
              cursor: 'pointer'
            }}
          >
            {showBuyerDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      )}

      {/* Buyer Details Section - Only visible to buyer */}
      {isBuyer && showBuyerDetails && buyerPersona && (
        <div style={{ 
          backgroundColor: '#f0f8ff', 
          padding: '0.4rem', 
          marginBottom: '0.4rem', 
          borderRadius: '4px',
          fontSize: '0.75rem',
          border: '1px solid #1565C0',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ marginBottom: '0.3rem', display: 'flex', alignItems: 'center' }}>
            <strong style={{ color: '#1565C0' }}>{buyerPersona.nickName}</strong>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', backgroundColor: '#1565C0', color: 'white', padding: '0.1rem 0.3rem', borderRadius: '10px' }}>
              Budget: ${buyerPersona.profile.budgetAmount}
            </span>
          </div>
          <p style={{ margin: '0.2rem 0', fontSize: '0.7rem' }}>{buyerPersona.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.3rem' }}>
            <span style={{ 
              fontSize: '0.65rem', 
              backgroundColor: '#e8e8e8', 
              padding: '0.1rem 0.3rem', 
              borderRadius: '10px' 
            }}>
              {buyerPersona.profile.carType}
            </span>
            <span style={{ 
              fontSize: '0.65rem', 
              backgroundColor: '#e8e8e8', 
              padding: '0.1rem 0.3rem', 
              borderRadius: '10px' 
            }}>
              {buyerPersona.profile.colorModel}
            </span>
            <span style={{ 
              fontSize: '0.65rem', 
              backgroundColor: '#e8e8e8', 
              padding: '0.1rem 0.3rem', 
              borderRadius: '10px' 
            }}>
              {buyerPersona.profile.safety} safety
            </span>
          </div>
          <div style={{ fontSize: '0.7rem', marginTop: '0.3rem' }}>
            <span style={{ color: '#555' }}>Looking for: <strong>{buyerPersona.idealCar.name}</strong></span>
          </div>
        </div>
      )}

      {/* Buyer/Seller Container */}
      <div style={{ 
        display: 'flex', 
        gap: '0.3rem',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Buyer */}
        <div style={{ 
          flex: 1, 
          backgroundColor: '#f0f0f0', 
          padding: '0.3rem', 
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ fontSize: '0.85rem', margin: '0.2rem 0', color: '#1565C0' }}>Buyer</h4>
          
          {/* Buyer Info */}
          {buyerInfo && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div className="avatar-placeholder" style={{ fontSize: '0.9rem', backgroundColor: '#ddd', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {buyerInfo.displayName?.[0] || '?'}
              </div>
              <div className="player-name" style={{ fontSize: '0.85rem' }}>
                <strong>{buyerInfo.displayName || 'Buyer'}</strong>
              </div>
            </div>
          )}
          
          {/* Buyer Role Description */}
          <div style={{ fontSize: '0.75rem', marginTop: 'auto', backgroundColor: '#e8e8e8', padding: '0.3rem', borderRadius: '4px' }}>
            {buyerId === yourPlayerId ? (
              <p style={{ margin: '0' }}>Your role: Find the best car for your needs!</p>
            ) : (
              <p style={{ margin: '0' }}>Buyer is comparing options</p>
            )}
          </div>
        </div>

        {/* Seller */}
        <div style={{ 
          flex: 1, 
          backgroundColor: '#f0f0f0', 
          padding: '0.3rem', 
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ fontSize: '0.85rem', margin: '0.2rem 0', color: '#FFD700' }}>Seller</h4>
          
          {/* Seller Info */}
          {sellerInfo && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div className="avatar-placeholder" style={{ fontSize: '0.9rem', backgroundColor: '#ddd', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {sellerInfo.displayName?.[0] || '?'}
              </div>
              <div className="player-name" style={{ fontSize: '0.85rem' }}>
                <strong>{sellerInfo.displayName || 'Seller'}</strong>
              </div>
            </div>
          )}
          
          {/* Seller Role Description */}
          <div style={{ fontSize: '0.75rem', marginTop: 'auto', backgroundColor: '#e8e8e8', padding: '0.3rem', borderRadius: '4px' }}>
            {sellerId === yourPlayerId ? (
              <p style={{ margin: '0' }}>Your role: Make profitable sales!</p>
            ) : (
              <p style={{ margin: '0' }}>Seller wants to close a deal</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSection; 