import React from "react";
import "../styles/StartScreen.css";
// import bg from '../assets/bg.jpg';



const StartScreen = ({ onStartGame }) => {
  // const StartScreen = () => {
  const updateBuyer = () => {
    console.log("Buyer button clicked");
    Rune.actions.assignRole("Buyer")
    // Logic to open the buyer's screen
  };
  const openSalesperson = () => {
    console.log("Salesperson button clicked");
    Rune.actions.assignRole("Seller")
    // Logic to open the salesperson's screen
  };
  const handleSpectate = () => {
    console.log("Spectate button clicked");
    Rune.actions.assignRole("Spectator")
    // Logic to open the spectator's screen
  };
  return (
    // <div className="start-screen" style={{ backgroundImage: `url(${bg})` }}>
    <>
    <div className="start-screen" style={{ backgroundColor: "#f0f0f0" }}>
      <div >
        <h1>Online Used Car Sales Game</h1>
        <div className="flex">
          <button onClick={handleSpectate}>Spectate</button>
        </div>
        <div className="flex">
          <button className="buyer-button" onClick={updateBuyer}>
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
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
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
          onClick={() => alert("Instructions go here")}
        >
          How to play
        </button>
        <button
          style={{
            backgroundColor: "magenta",
            color: "white",
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
          onClick={() => alert("Game by Your Name")}
        >
          Credits
        </button>
      </div>
      </>
  );
};

export default StartScreen;
