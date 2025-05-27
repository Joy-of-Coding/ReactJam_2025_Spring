import React from 'react';

const PlayerSection = ({ yourPlayerId, game }) => {
  // Find the buyer and seller IDs from game state
  const buyerId = game.playerIds.find(id => game.roles[id] === "Buyer");
  const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
  
  // Get player info using Rune API
  const buyerInfo = buyerId ? Rune.getPlayerInfo(buyerId) : null;
  const sellerInfo = sellerId ? Rune.getPlayerInfo(sellerId) : null;

  return (
    <div className="player-section" style={{ 
      width: '100%', 
      maxWidth: '360px', 
      padding: '0.3rem', 
      backgroundColor: '#45a049', 
      borderRadius: '6px',
      marginBottom: '0.5rem',
      height: '30vh',
      overflow: 'hidden'
    }}>
      <h3 style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}>Negotiators</h3>

      {/* Buyer/Seller Container */}
      <div style={{ 
        display: 'flex', 
        gap: '0.3rem', 
        height: 'calc(100% - 1.5rem)'
      }}>
        {/* Buyer */}
        <div style={{ 
          flex: 1, 
          backgroundColor: '#f0f0f0', 
          padding: '0.3rem', 
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column'
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
          
          {/* Buyer Details - Placeholder for now */}
          <div style={{ fontSize: '0.75rem', marginTop: 'auto', backgroundColor: '#e8e8e8', padding: '0.3rem', borderRadius: '4px' }}>
            {buyerId === yourPlayerId ? (
              <p>Your role: Make a good deal on a car!</p>
            ) : (
              <p>Buyer is looking for a great deal</p>
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
          flexDirection: 'column'
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
          
          {/* Seller Details - Placeholder for now */}
          <div style={{ fontSize: '0.75rem', marginTop: 'auto', backgroundColor: '#e8e8e8', padding: '0.3rem', borderRadius: '4px' }}>
            {sellerId === yourPlayerId ? (
              <p>Your role: Sell cars for profit!</p>
            ) : (
              <p>Seller wants to make a profit</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSection; 