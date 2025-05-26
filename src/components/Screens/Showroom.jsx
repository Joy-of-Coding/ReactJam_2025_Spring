import React, { useState } from "react";
import "../styles/Showroom.css";
import DragAvatar from "../Drag/DragAvatar";

const Showroom = ({ onEndChoice, onEndGame, onNegotiation, yourPlayerId, game }) => {
  // Function to check if a player is in negotiation zone (desk)
  const isInNegotiationZone = (playerPosition, deskPosition) => {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - deskPosition.x, 2) + 
      Math.pow(playerPosition.y - deskPosition.y, 2)
    );
    return distance < 50; // Proximity threshold
  };

  // Define desk positions
  const desks = [
    { id: 1, x: 200, y: 200 },
    { id: 2, x: 400, y: 200 },
    { id: 3, x: 600, y: 200 },
  ];

  // Checking for negotiation
  const buyerPlayers = Object.keys(game.roles).filter(id => game.roles[id] === "Buyer");
  const sellerPlayers = Object.keys(game.roles).filter(id => game.roles[id] === "Seller");
  
  // For each desk, check if there's a buyer and seller nearby
  const negotiationPossible = desks.some(desk => {
    const nearbyBuyer = buyerPlayers.find(id => 
      isInNegotiationZone(game.objects[id], desk)
    );
    const nearbySeller = sellerPlayers.find(id => 
      isInNegotiationZone(game.objects[id], desk)
    );
    
    return nearbyBuyer && nearbySeller;
  });

  return (
    <div className="showroom-container">
      <div className="showroom-header">
        <h2>Car Dealership Showroom</h2>
        <p>Drag your avatar to a desk to start negotiation</p>
      </div>
      
      {/* Left side - Buyer waiting area */}
      <div className="buyer-area">
        <h3>Buyer Waiting Area</h3>
        <div className="buyer-seats">
          {buyerPlayers.map(id => (
            <div key={id} className="player-info">
              <span>{Rune.getPlayerInfo(id)?.displayName}</span>
              {game.personas[id] && <span>({game.personas[id].nickName})</span>}
            </div>
          ))}
        </div>
      </div>
      
      {/* Right side - Seller desks */}
      <div className="seller-area">
        <h3>Seller Desks</h3>
        <div className="seller-desks">
          {sellerPlayers.map(id => (
            <div key={id} className="player-info">
              <span>{Rune.getPlayerInfo(id)?.displayName}</span>
              <span>Desk {sellerPlayers.indexOf(id) + 1}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Showroom floor with desks */}
      <div className="showroom-floor">
        {desks.map(desk => (
          <div 
            key={desk.id} 
            className="desk" 
            style={{ left: desk.x, top: desk.y }}
          >
            <div className="desk-surface">
              <span>Desk {desk.id}</span>
            </div>
          </div>
        ))}
        
        <DragAvatar yourPlayerId={yourPlayerId} game={game} />
      </div>
      
      {negotiationPossible && yourPlayerId === buyerPlayers[0] && (
        <button 
          className="negotiation-button" 
          onClick={onNegotiation}
        >
          Start Negotiation
        </button>
      )}
    </div>
  );
};

export default Showroom;
  
