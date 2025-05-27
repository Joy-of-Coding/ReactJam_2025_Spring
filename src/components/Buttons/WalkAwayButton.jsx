import React from "react";

function WalkAwayButton({ yourPlayerId, game }) {
  const handleClick = () => {
    // When the button is clicked display an console!
    console.log("Player has walked away from the deal!");
    const player = Rune.getPlayerInfo(playerId);
    console.log(playerId, player);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "4px",
        padding: "0.3rem 0.6rem",
        fontSize: "0.8rem",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "background-color 0.2s",
        fontWeight: "bold",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f44336")}
    >
      Walk away
    </button>
  );
}

export default WalkAwayButton;
