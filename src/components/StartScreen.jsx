import React from "react";
import "./styles/StartScreen.css";
// import bg from '../assets/bg.jpg';

const StartScreen = ({ onStartGame }) => {
  // const StartScreen = () => {
  const openBuyer = () => {
    console.log("Buyer button clicked");
    // Logic to open the buyer's screen
  };
  const openSalesperson = () => {
    console.log("Salesperson button clicked");
    // Logic to open the salesperson's screen
  };
  const handleSpectate = () => {
    console.log("Spectate button clicked");
    // Logic to open the spectator's screen
  };
  return (
    // <div className="start-screen" style={{ backgroundImage: `url(${bg})` }}>
    <div className="start-screen" style={{ backgroundColor: "#f0f0f0" }}>
      <div className="overlay">
        <h1>Online Used Car Sales Game</h1>
        <section className="description">
          <h2>About the Game</h2>
          <p>
            Buy low, sell high! Compete to become the top car flipper in town.
          </p>
        </section>
        <section className="how-to">
          <h2>How To Play</h2>
          <p>
            Buy cars from auctions. Set your price. Sell to customers. Profit!
          </p>
        </section>
        <section className="credits">
          <h2>Credits</h2>
          <p>Created by Team ReactJam May 2025 – Add everyone involved</p>
        </section>
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
  );
};

export default StartScreen;
