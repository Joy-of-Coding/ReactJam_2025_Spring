import React from "react";
import "./styles/StartScreen.css";
// import bg from '../assets/bg.jpg';

const StartScreen = ({ onStartGame }) => {
  // const StartScreen = () => {
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
          <div className="flex" style={{ gap: "1rem" }}>
            <button className="buyer-button">I'm the Buyer</button>
            <button className="seller-button">I'm the Salesperson</button>
          </div>
        </div>
        <button className="start-button" onClick={onStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
