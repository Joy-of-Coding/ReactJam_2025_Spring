import React from 'react'

function ThinkingBuyer () {
    const handleClick = () => {
        // When the button is clicked display an console! 
        console.log("Thinking Buyer")
    }
  return (
    <button onClick={handleClick}>
        Thinking Buyer
    </button>
  )
}

export default ThinkingBuyer