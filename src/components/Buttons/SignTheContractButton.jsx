import React from 'react'

function SignTheContractButton () {
    const handleClick = () => {
        // When the button is clicked display an console! 
        console.log("Player has signed the contract!")
    }
  return (
    <button onClick={handleClick}>
        Sign the contract
    </button>
  )
}

export default SignTheContractButton