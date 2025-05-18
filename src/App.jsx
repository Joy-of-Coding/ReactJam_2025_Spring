import { useEffect, useState } from "react"
import Buyer from "./components/Buyer"
import Salesperson from "./components/Salesperson"

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
    </>
  )
}

export default App
