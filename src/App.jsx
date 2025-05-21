import { useEffect, useState } from "react";


import StartScreen from "./components/Screens/StartScreen.jsx";
import GameScreen from "./components/Screens/GameScreen.jsx";

import selectSoundAudio from "./assets/select.wav";
import { render } from "react-dom";

const selectSound = new Audio(selectSoundAudio);

function App() {
  //   ///
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    console.log("The game has started");
    setGameStarted(true);
  };

  const handleEndGame = () => {
    setGameStarted(false);
  };

  /// jaypox
  // const [game, setGame] = useState();
  // const [yourPlayerId, setYourPlayerId] = useState();
// client.js
  Rune.initClient({
    onChange: ({
                 game,
                 yourPlayerId,
                 allPlayerIds,
                 action,
               }) => {
      const { roles } = game;
      const playerIds = allPlayerIds
    },
  })
  // useEffect(() => {
  //   Rune.initClient({
  //     onChange: ({
  //                  game,
  //                  action,
  //                   yourPlayerId }) => {
  //       setGame(game);
  //       setYourPlayerId(yourPlayerId);
  //
  //       // if (action && action.name === "claimCell") selectSound.play();
  //     },
  //   });
  // }, []);

  // if (!game) {
  //   // Rune only shows your game after an onChange() so no need for loading screen
  //   return;
  // }



  return (
    <>
    	{!gameStarted && <StartScreen onStartGame={handleStartGame} />}
			{gameStarted && <GameScreen onStartGame={handleStartGame} />}
      {/* <StartScreen onStartGame={handleStartGame} /> */}
      

      <ul id="playersSection">
        {playerIds.map((p, index) => {
          const player = Rune.getPlayerInfo(p);

          return (
            <li
              key={playerId}
              data-player={index.toString()}
              // data-your-turn={String(
              //   playerIds[index] !== lastMovePlayerId && !winCombo && freeCells
              // )}
            >
              {/*<img src={player.avatarUrl} />*/}
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
          );
        })}
      </ul>

      
    </>
  );
}
export default App;
