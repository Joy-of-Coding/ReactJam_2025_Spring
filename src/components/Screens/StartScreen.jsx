import React, { useState, useEffect} from "react";
import "../styles/StartScreen.css";
import useCountdown from "../hooks/useCountdown";

import car_image from "../../assets/img/car_sales7.svg";
import DragAvatar from "../Drag/DragAvatar";

// import bg from '../assets/bg.jpg';
// game NOT started, choices NOT finished, Negotiations NOT started === startScreen
const StartScreen = ({ onStartGame, yourPlayerId, game }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("Loading...");
  const [isHtmlContent, setIsHtmlContent] = useState(false); // to determine if content is HTML or plain text

  const isSpectator = game.roles[yourPlayerId] === "Spectator";

  const remainingTime = useCountdown(game);
  
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
  const handleStartgame = () => {
    Rune.actions.startCountdown();
    onStartGame();
  };
   // adding countdow timed) / 1000))
  
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
     {/* Countdown Timer */}
      {remainingTime !== null && (
        <div className="countdown-timer">
          Game starting in: {remainingTime} second{remainingTime !== 1 ? "s" : ""}
        </div>
      )}
    <DragAvatar yourPlayerId={yourPlayerId} game={game} />
    <div className="start-screen" style={{ backgroundColor: "#f0f0f0" }}>
      <div className="start-roles" style={{maxHeight: "80vh"}}>
        <h1>Lot O Lemons</h1>
        <div className="flex">
          <button onClick={handleSpectate}>Spectate</button>
        </div>
    <div style={{ textAlign: "center" }}>
  <img 
    src= {car_image} alt = "image of buyer and seller. Buyer on the left and Seller on the right"
    style={{ width: "300px", height: "auto" }}
  />
  </div>
        <div className="flex">
          <button className="buyer-button" onClick={openSalesperson}>
            I'm the Seller
          </button>
          <button className="seller-button" onClick={openBuyer}>
            I'm the Buyer
          </button>
        </div>
        {/* <button className="start-button" onClick={handleStartgame}></button> */}
        <button className="start-button"
          onClick={!isSpectator ? onStartGame : undefined}
          disabled={isSpectator}
          style={isSpectator ? { opacity: 0.5, cursor: "not-allowed" } : {}}
          >
          Start Game
        </button>
      </div>
    </div>

    {/* <div className="flex" style={{ marginTop: "1rem" }}>
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
    </div> */}

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
export default StartScreen;
