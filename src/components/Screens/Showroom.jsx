import React, { useState } from "react";
import "../styles/StartScreen.css";
import DragAvatar from "../Drag/DragAvatar";

// import bg from '../assets/bg.jpg';

const Showroom = ({ onStartGame, yourPlayerId, game }) => {
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

  return (
  <>
    <div className="start-screen" style={{ backgroundColor: "#f0f0f0" }}>
      <div>
        <h1>Lots O Lemons Showroom</h1>
        <DragAvatar yourPlayerId={yourPlayerId} game={game} />
      </div>
    </div>
    {/* {game.role[yourPlayerId] === "Seller" && <div>Seller</div>} */}

  </>
);
}
export default Showroom;
