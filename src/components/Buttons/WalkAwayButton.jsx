import React from "react"

function WalkAwayButton(offNegotiation, playerId) {
    const handleClick = () => {
        // When the button is clicked display an console! 

        const player = Rune.getPlayerInfo(playerId);

        console.log("Player", player.displayName, "has walked away from the deal!")
 
    }

    return (
        <button onClick={handleClick}>
            Walk away
        </button>
    )
}

export default WalkAwayButton