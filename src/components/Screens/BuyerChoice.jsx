import React, { useState } from "react";
import "../styles/StartScreen.css";

// import bg from '../assets/bg.jpg';

const BuyerChoice = ({ onStartGame, yourPlayerId, game }) => {

  // const StartScreen = () => {
  const openBuyer = () => {
    console.log("Buyer button clicked");
    Rune.actions.assignPersona("Moe")
    console.log("Buyer persona assigned");
    console.log("Current players:", game.playerIds);
    console.log("Current personas:", game.personas); 
    // Logic to open the buyer's screen
  };
  const openSalesperson = () => {
    console.log("Salesperson button clicked");
    Rune.actions.assignPersona("Curly")
    console.log("Salesperson persona assigned");
    console.log("Current players:", game.playerIds);
    console.log("Current personas:", game.personas); 
    // Logic to open the salesperson's screen
  };
  const handleSpectate = () => {
    console.log("Spectator button clicked");
    Rune.actions.assignPersona("Larry")
    console.log("Spectator persona assigned");
    console.log("Current players:", game.playerIds);
    console.log("Current personas:", game.personas); 
    // Logic to open the spectator's screen
  };

  return (
  <>
    <div className="start-screen" style={{ backgroundColor: "#f0f0f0" }}>
      <div>
        <h1>Buyer Game</h1>
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
    {/* {game.persona[yourPlayerId] === "Seller" && <div>Seller</div>} */}

  
    
  </>
);
}
export default BuyerChoice;
