import React, { useState } from "react";
import "../styles/StartScreen.css";

// import bg from '../assets/bg.jpg';

const SellerChoice = ({ onStartGame, yourPlayerId, game }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("Loading...");
  const [isHtmlContent, setIsHtmlContent] = useState(false); // to determine if content is HTML or plain text
  // const StartScreen = () => {
  const openBuyer = () => {
    console.log("Buyer button clicked");
    Rune.actions.assignRole("Buyer")
    console.log("Buyer role assigned");
    console.log("Current players:", game.playerIds);
    console.log("Current roles:", game.roles); 
    // Logic to open the buyer's screen
  };
  const openSalesperson = () => {
    console.log("Salesperson button clicked");
    Rune.actions.assignRole("Seller")
    console.log("Salesperson role assigned");
    console.log("Current players:", game.playerIds);
    console.log("Current roles:", game.roles); 
    // Logic to open the salesperson's screen
  };
  const handleSpectate = () => {
    console.log("Spectator button clicked");
    Rune.actions.assignRole("Spectator")
    console.log("Spectator role assigned");
    console.log("Current players:", game.playerIds);
    console.log("Current roles:", game.roles); 
    // Logic to open the spectator's screen
  };

  const handleShowInstructions = () => {
  setShowPopup(true);
  setIsHtmlContent(true);
  fetch("../src/assets/instructions.txt")
    .then((res) => res.text())
    .then((text) => setPopupContent(text))
    .catch(() => setPopupContent("Failed to load instructions."));
  };
  const handleShowCredits = () => {
    setShowPopup(true);
    setIsHtmlContent(false);
    fetch("../src/assets/credits.txt")
      .then((res) => res.text())
      .then((text) => setPopupContent(text))
      .catch(() => setPopupContent("Failed to load credits."));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
  <>
    <div className="start-screen" style={{ backgroundColor: "#f0f0f0" }}>
      <div>
        <h1>Online Used Car Sales Game</h1>
        <div className="flex">
          <button onClick={handleSpectate}>Spectate</button>
        </div>
        <div className="flex">
          <button className="buyer-button" onClick={openBuyer}>
            I'm the Buyer
          </button>
          <button className="seller-button" onClick={openSalesperson}>
            I'm the Salesperson
          </button>
        </div>
        <button className="start-button" onClick={onStartGame}>
          Start Game
        </button>
      </div>
    </div>
    {/* {game.role[yourPlayerId] === "Seller" && <div>Seller</div>} */}

    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
      <button
        style={{
          backgroundColor: "blue",
          color: "#fff",
          boxShadow:
            "rgba(25, 25, 25, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0",
          cursor: "pointer",
          display: "inline-block",
          fontFamily: "Arial, sans-serif",
          fontSize: "1em",
          height: "50px",
          padding: "0 25px",
          transition: "all 200ms",
        }}
        onClick={handleShowInstructions}
      >
        How to play
      </button>
      <button
        style={{
          backgroundColor: "magenta",
          color: "#fff",
          boxShadow:
            "rgba(218, 25, 225, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0",
          cursor: "pointer",
          display: "inline-block",
          fontFamily: "Arial, sans-serif",
          fontSize: "1em",
          height: "50px",
          padding: "0 25px",
          transition: "all 200ms",
        }}
        onClick={handleShowCredits}
      >
        Credits
      </button>
    </div>

    {showPopup && (
      <>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
            color: "#ccc",
          }}
          onClick={handleClosePopup}
        />
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -20%)",
            backgroundColor: "#fff",
            padding: "20px",
            maxWidth: "600px",
            width: "80%",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            zIndex: 1000,
            overflowY: "auto",
            maxHeight: "70vh",
            color: "#ccc",
          }}
        >
          <button
            style={{
              float: "right",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={handleClosePopup}
          >
            &times;
          </button>
          <div style={{ marginTop: "1.5rem", whiteSpace: "pre-wrap" }}>
            {isHtmlContent ? (
              <div dangerouslySetInnerHTML={{ __html: popupContent }} />
            ) : (
              popupContent
            )}
          </div>
        </div>
      </>
    )}
  </>
);
}
export default SellerChoice;
