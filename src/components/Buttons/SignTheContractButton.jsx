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
    <button onClick={handleClick}>
        Sign the contract!
    </button>
  )
}

export default SignTheContractButton