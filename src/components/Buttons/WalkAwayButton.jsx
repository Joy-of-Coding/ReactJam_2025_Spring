import React from "react"

function WalkAwayButton(yourPlayerId) {
    const handleClick = () => {
        // When the button is clicked display an console! 
        console.log("Player has walked away from the deal!")
        const player = Rune.getPlayerInfo(yourPlayerId);
        console.log(yourPlayerId,  player)
    }

    return (
        <button onClick={handleClick}>
            Walk away
        </button>
    )
}

export default WalkAwayButton