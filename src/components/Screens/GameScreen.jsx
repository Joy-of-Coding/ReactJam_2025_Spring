import React, { useState } from "react";
import "../styles/NegotiationScreen.css"; // Custom styling for this page
import useCountdown from "../hooks/useCountdown";
import Showroom from "./Showroom.jsx";

const GameScreen = ({
  onEndChoice,
  onEndGame,
  onNegotiation,
  yourPlayerId,
  game,
}) => {
  // const [playerRole, setPlayerRole] = useState("buyer"); // Placeholder – should be set via Rune or game logic

  // state to show timer
  const remainingTime = useCountdown(game); // using counttimer hook

  return (
    <div className="game-screen">
      <div style={{ display: "flex", gap: "16px" }}>
        <button
          className="end-button"
          onClick={onNegotiation}
          style={{
            backgroundColor: "brown",
            color: "white",
            border: "none",
            padding: "0px 20px",
            fontSize: "16px",
            cursor: "pointer",
            flex: "1",
          }}
        >
          Join me at my desk
        </button>
      </div>
      <Showroom
        onEndChoice={onEndChoice}
        onEndGame={onEndGame}
        onNegotiation={onNegotiation}
        yourPlayerId={yourPlayerId}
        game={game}
      />
    </div>
  );
};

export default GameScreen;
