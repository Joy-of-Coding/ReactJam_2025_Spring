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
    Rune.actions.assignPersona(persona.id);
    console.log(`${persona.nickName} persona assigned`);
  };

  useEffect(() => {
    if (hasConfirmed && game?.personas?.[yourPlayerId]) {
      console.log("Persona assigned in game state:", game.personas[yourPlayerId]);
      onEndChoice();
    }
  }, [game.personas, hasConfirmed, yourPlayerId, onEndChoice]);

  return (
    <div className="start-screen" style={{ backgroundColor: "#f0f0f0" }}>
      <h1>Buyer Game</h1>\
      <button
        className="start-button"
        onClick={() => setHasConfirmed(true)}
        disabled={selectedPersonaId === null}
      >
        Confirm Choice
      </button>
      <div className="persona-choice-list">
        {randomPersonas.map((persona) => (
          <div key={persona.id} className="persona-card">
            <p><strong>{persona.nickName}</strong></p>
            <p>{persona.description}</p>
            <p>Budget: ${persona.profile?.budgetAmount || 'Not specified'}</p>
            <button 
              onClick={() => handleChoosePersona(persona)}
              style={{
                backgroundColor: selectedPersonaId === persona.id ? '#4CAF50' : '#2196F3',
                color: 'white',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              I'm {persona.nickName}
            </button>
          </div>
        ))}
      </div>


    </div>
  );
};

export default BuyerChoice;
