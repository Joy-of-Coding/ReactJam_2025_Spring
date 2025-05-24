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

  </>
);
}
export default SellerChoice;
