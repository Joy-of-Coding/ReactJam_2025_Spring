import React, { useState } from "react";
import "../styles/NegotiationScreen.css"; // Custom styling for this page

import Buyer from "../Buyer.jsx";
import Salesperson from "../Salesperson.jsx";
import CarList from "../CarList.jsx";
import WalkAwayButton from "../Buttons/WalkAwayButton.jsx";
import SignTheContractButton from "../Buttons/SignTheContractButton.jsx";

const GameScreen = ({ onEndGame, onNegotiation, playerId, game }) => {
  const [playerRole, setPlayerRole] = useState("buyer"); // Placeholder – should be set via Rune or game logic

  return (
    <div>
      <button className="end-button" onClick={onNegotiation}>
        Start Negotiation
      </button>
    </div>
  );
};

export default GameScreen;
