import React, { useState, useEffect } from "react";
import "../styles/StartScreen.css";
import personas from "../../assets/car_buyer_personas_final_enriched.json";

const BuyerChoice = ({ onEndChoice, yourPlayerId, game }) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState(null);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [randomPersonas, setRandomPersonas] = useState([]);

  // 🔁 Run once to pick 3 random personas
  useEffect(() => {
    const shuffled = [...personas].sort(() => 0.5 - Math.random());
    setRandomPersonas(shuffled.slice(0, 3));
  }, []);

  const handleChoosePersona = (persona) => {
    if (selectedPersonaId !== null) return;
    setSelectedPersonaId(persona.id);
    Rune.actions.assignPersona(persona);
    console.log(`${persona.nickName} persona assigned`);
  };

  useEffect(() => {
    if (
      hasConfirmed &&
      game?.personas?.[yourPlayerId] &&
      game.personas[yourPlayerId].id === selectedPersonaId
    ) {
      console.log("Persona sync confirmed in game state!");
      onEndChoice();
    }
  }, [game.personas, hasConfirmed]);

  return (
    <div className="start-screen" style={{ backgroundColor: "#f0f0f0" }}>
      <h1>Buyer Game</h1>
      <div className="persona-choice-list">
        {randomPersonas.map((persona) => (
          <div key={persona.id} className="persona-card">
            <p><strong>{persona.nickName}</strong></p>
            <p>{persona.description}</p>
            <p>{persona.budgetAmount}</p>
            <button onClick={() => handleChoosePersona(persona)}>
              I'm {persona.nickName}
            </button>
          </div>
        ))}
      </div>

      <button
        className="start-button"
        onClick={() => setHasConfirmed(true)}
        disabled={selectedPersonaId === null}
      >
        Confirm Choice
      </button>
    </div>
  );
};

export default BuyerChoice;
