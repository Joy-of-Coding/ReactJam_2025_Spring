import { useEffect, useState } from "react"
import Buyer from "./components/Buyer"
import Salesperson from "./components/Salesperson"
import Car from "./components/Car"
import CarList from "./components/CarList"

import selectSoundAudio from "./assets/select.wav"

const selectSound = new Audio(selectSoundAudio)

function App() {
  const [game, setGame] = useState()
  const [yourPlayerId, setYourPlayerId] = useState()

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId)

        if (action && action.name === "claimCell") selectSound.play()
      },
    })
  }, [])

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return
  }

  const { winCombo, cells, lastMovePlayerId, playerIds, freeCells } = game

  return (
    <>
      <Salesperson />
      <Buyer />
      <Car 
        year={1982} 
        model={'DeLorean'} 
        condition={'Used'} 
        mileage={185000} 
        price={39999.99} 
        features={['Gull-Wing Doors', 'Apple Carplay', 'LED Headlights' ]}
      />
      <CarList />
      
      <ul id="playersSection">
        {playerIds.map((playerId, index) => {
          const player = Rune.getPlayerInfo(playerId)

          return (
            <li
              key={playerId}
              data-player={index.toString()}
              // data-your-turn={String(
              //   playerIds[index] !== lastMovePlayerId && !winCombo && freeCells
              // )}
            >

              <img src={player.avatarUrl} />
              <span>
                {player.displayName}
                {player.playerId === yourPlayerId && (
                  <span>
                    <br />
                    (You)
                  </span>
                )}
              </span>
            </li>
          )
        })}
      </ul>

      {/* === Buttons Section === */}
      <div style={{ display: "flex", gap: "1rem"  }}>
        <button 
          style={{ backgroundColor: "blue", color: "white" ,
             boxShadow: "rgba(25, 25, 25, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0",
            color: "#008000",
            cursor: "pointer",
            display: "inline-block",
            fontFamily: "Arial, sans-serif",
            fontSize: "1em",
            height: "50px",
            padding: "0 25px",
            transition: "all 200ms"
          }} 
          onClick={() => alert("Instructions go here")}
        >
          How to play
        </button
          >
        <button 
          style={{ backgroundColor: "magenta", color: "white" ,
          boxShadow: "rgba(218, 25, 225, 0.04) 0 0 1px 0, rgba(0, 0, 0, 0.1) 0 3px 4px 0",
          color: "#008000",
          cursor: "pointer",
          display: "inline-block",
          fontFamily: "Arial, sans-serif",
          fontSize: "1em",
          height: "50px",
          padding: "0 25px",
          transition: "all 200ms"
        }} 
        
        onClick={() => alert("Game by Your Name")}>
          Credits
        </button>
      </div>
  </>
)
}
export default App
