import React from 'react'

function SignTheContractButton ({yourPlayerId, game}) {
    const handleClick = () => {
      const amount = 1;
        // When the button is clicked display an console! 
        console.log("Player has signed the contract!")
        // console.log("OldScore: ", game.scores[yourPlayerId])
        Rune.actions.updateScore({ yourPlayerId, amount});
        // console.log("newScore: ", game.scores[yourPlayerId])
    }
  return (
    <button 
        onClick={handleClick}
        style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "0.3rem 0.6rem",
            fontSize: "0.8rem",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "background-color 0.2s",
            fontWeight: "bold"
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
    >
        Sign the contract!
    </button>
  )
}

export default SignTheContractButton