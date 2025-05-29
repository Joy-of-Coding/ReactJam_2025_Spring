import React, { useState, useEffect } from "react";
import "../styles/StartScreen.css";
import useCountdown from "../hooks/useCountdown";

import car_image from "../../assets/img/car_sales7.svg";
import DragAvatar from "../Drag/DragAvatar";
import HowToContent from "./HowToContent";
import CreditsContent from "./CreditsContent";

// import bg from '../assets/bg.jpg';
// game NOT started, choices NOT finished, Negotiations NOT started === startScreen
const StartScreen = ({ onStartGame, yourPlayerId, game }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [popupType, setPopupType] = useState(null);

  const isSpectator = game.roles[yourPlayerId] === "Spectator";
  
  // Check if we have at least one buyer and one seller
  const buyerExists = Object.values(game.roles).includes("Buyer");
  const sellerExists = Object.values(game.roles).includes("Seller");
  const canStartGame = buyerExists && sellerExists;

  const remainingTime = useCountdown(game);

  // Define drop zones for the buyer and seller areas
  const buyerZone = { x1: 50, y1: 250, x2: 150, y2: 350 };
  const sellerZone = { x1: 200, y1: 250, x2: 300, y2: 350 };

  useEffect(() => {
    // Check if any player's avatar is in a drop zone and assign role
    Object.entries(game.objects).forEach(([playerId, obj]) => {
      // Check if the player has no role yet or is changing roles
      if (obj.heldBy === null) { // Only check when not being dragged
        // Check if player is in buyer zone
        if (obj.x >= buyerZone.x1 && obj.x <= buyerZone.x2 && 
            obj.y >= buyerZone.y1 && obj.y <= buyerZone.y2) {
          if (game.roles[playerId] !== "Buyer") {
            // Player is in buyer zone, assign Buyer role
            if (playerId === yourPlayerId) {
              Rune.actions.assignRole("Buyer");
            }
          }
        }
        // Check if player is in seller zone
        else if (obj.x >= sellerZone.x1 && obj.x <= sellerZone.x2 && 
                 obj.y >= sellerZone.y1 && obj.y <= sellerZone.y2) {
          if (game.roles[playerId] !== "Seller") {
            // Player is in seller zone, assign Seller role
            if (playerId === yourPlayerId) {
              Rune.actions.assignRole("Seller");
            }
          }
        }
      }
    });
  }, [game.objects, yourPlayerId]);

  const openBuyer = () => {
    console.log("Buyer button clicked");
    Rune.actions.assignRole("Buyer");
    console.log("Buyer role assigned");
    console.log("Current players:", game.playerIds);
    console.log("Current roles:", game.roles);
    // Logic to open the buyer's screen
  };
  
  const openSalesperson = () => {
    console.log("Salesperson button clicked");
    Rune.actions.assignRole("Seller");
    console.log("Salesperson role assigned");
    console.log("Current players:", game.playerIds);
    console.log("Current roles:", game.roles);
    // Logic to open the salesperson's screen
  };
  
  const handleSpectate = () => {
    console.log("Spectator button clicked");
    Rune.actions.assignRole("Spectator");
    console.log("Spectator role assigned");
    console.log("Current players:", game.playerIds);
    console.log("Current roles:", game.roles);
    // Logic to open the spectator's screen
  };
  
  const handleStartgame = () => {
    Rune.actions.startCountdown();
    onStartGame();
  };

  const handleShowInstructions = () => {
    setPopupType("instructions");
    setPopupContent(<HowToContent />);
    setShowPopup(true);
  };
  
  const handleShowCredits = () => {
    setPopupType("credits");
    setPopupContent(<CreditsContent />);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Group players by role for display
  const buyerPlayers = Object.entries(game.roles)
    .filter(([_, role]) => role === "Buyer")
    .map(([id]) => Rune.getPlayerInfo(id));

  const sellerPlayers = Object.entries(game.roles)
    .filter(([_, role]) => role === "Seller")
    .map(([id]) => Rune.getPlayerInfo(id));

  return (
    <>
      {/* Countdown Timer */}
      {remainingTime !== null && (
        <div className="countdown-timer">
          Game starting in: {remainingTime} second
          {remainingTime !== 1 ? "s" : ""}
        </div>
      )}
      <DragAvatar yourPlayerId={yourPlayerId} game={game} />
      <div className="start-screen" style={{ backgroundColor: "#f0f0f0" }}>
        <div className="start-roles" style={{ maxHeight: "80vh" }}>
          <h1>Lot O Lemons</h1>
          <div className="flex">
            <button onClick={handleSpectate}>Spectate</button>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ textAlign: "center" }}>
              <img
                src={car_image}
                alt="image of buyer and seller. Buyer on the left and Seller on the right"
                className="car-image"
              />
            </div>
          </div>
          
          {/* Role selection buttons with drop zones */}
          <div className="flex">
            {/* Seller Button with Drop Zone */}
            <div className="role-container">
              <button 
                className="buyer-button" 
                onClick={openSalesperson}
                style={{
                  position: "relative",
                  zIndex: 5
                }}
              >
                I'm the Seller
              </button>
              
              {/* Display seller players */}
              {sellerPlayers.length > 0 && (
                <div className="players-list">
                  {sellerPlayers.map(player => (
                    <div key={player.playerId} className="player-name">
                      {player.displayName}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Invisible drop zone marker */}
              <div 
                className="drop-zone" 
                style={{
                  position: "absolute",
                  left: `${sellerZone.x1}px`,
                  top: `${sellerZone.y1}px`,
                  width: `${sellerZone.x2 - sellerZone.x1}px`,
                  height: `${sellerZone.y2 - sellerZone.y1}px`,
                  border: "2px dashed rgba(0,0,255,0.2)",
                  borderRadius: "8px",
                  pointerEvents: "none",
                  zIndex: 1
                }}
              />
            </div>
            
            {/* Buyer Button with Drop Zone */}
            <div className="role-container">
              <button 
                className="seller-button" 
                onClick={openBuyer}
                style={{
                  position: "relative",
                  zIndex: 5
                }}
              >
                I'm the Buyer
              </button>
              
              {/* Display buyer players */}
              {buyerPlayers.length > 0 && (
                <div className="players-list">
                  {buyerPlayers.map(player => (
                    <div key={player.playerId} className="player-name">
                      {player.displayName}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Invisible drop zone marker */}
              <div 
                className="drop-zone" 
                style={{
                  position: "absolute",
                  left: `${buyerZone.x1}px`,
                  top: `${buyerZone.y1}px`,
                  width: `${buyerZone.x2 - buyerZone.x1}px`,
                  height: `${buyerZone.y2 - buyerZone.y1}px`,
                  border: "2px dashed rgba(0,255,0,0.2)",
                  borderRadius: "8px",
                  pointerEvents: "none",
                  zIndex: 1
                }}
              />
            </div>
          </div>
          
          <button
            className="start-button"
            onClick={canStartGame && !isSpectator ? onStartGame : undefined}
            disabled={!canStartGame || isSpectator}
            style={!canStartGame || isSpectator ? { opacity: 0.5, cursor: "not-allowed" } : {}}
          >
            {!canStartGame ? "Need 1 Buyer & 1 Seller" : "Start Game"}
          </button>
          
          <div className="instructions-text" style={{ marginTop: "10px", fontSize: "0.9rem" }}>
            Drag your avatar to a role or click the buttons above
          </div>
        </div>
      </div>

      {/* Instructions and Credits Buttons */}
      <div className="footer-buttons">
        <button
          className="footer-button"
          onClick={handleShowInstructions}
        >
          How to Play
        </button>
        <button
          className="footer-button"
          onClick={handleShowCredits}
        >
          Credits
        </button>
      </div>

      {showPopup && (
        <div className="popup-container">
          <div className="popup-overlay" onClick={handleClosePopup} />
          <div className="popup-content">
            <button className="popup-close" onClick={handleClosePopup}>
              &times;
            </button>
            <div className="popup-body">
              {popupContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default StartScreen;
