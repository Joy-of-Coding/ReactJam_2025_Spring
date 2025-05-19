import React from "react"

function WalkAwayButton() {
    const handleClick = () => {
        // When the button is clicked display an console! 
        console.log("Player has walked away from the deal!")
    }

    return (
        <button onClick={handleClick}>
            Walk away
        </button>
    )
}

export default WalkAwayButton