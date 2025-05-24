import { useEffect, useState } from "react";


import StartScreen from "./components/Screens/StartScreen.jsx";
import GameScreen from "./components/Screens/GameScreen.jsx";
import NegotiationScreen from "./components/Screens/NegotiationScreen.jsx";
import selectSoundAudio from "./assets/select.wav";

// const selectSound = new Audio(selectSoundAudio);

function App() {
  //   ///
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    console.log("The game has started");
    setGameStarted(true);
  };
  const [negotiationStarted, setNegotiationStarted] = useState(false);

  const handleStartNegotiation = () => {
    console.log("The negotiation has started");
    setNegotiationStarted(true);
  };
  const handleStopNegotiation = () => {
    setNegotiationStarted(false);
    console.log("Current players:", game.playerIds);
    console.log("Current roles:", game.roles); 
  };
  
  const handleEndGame = () => {
    console.log("The game has ended");
    setGameStarted(false);
    console.log("Current players:", game.playerIds);
    console.log("Current roles:", game.roles); 
  };

  /// jaypox
  const [game, setGame] = useState();
  const [yourPlayerId, setYourPlayerId] = useState();

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        if (action && action.name === "claimCell") selectSound.play();
      },
    });
  }, []);

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return;
  }

  const { winCombo, cells, lastMovePlayerId, playerIds, freeCells } = game;

  return (
    <>
    	{!gameStarted && !negotiationStarted && <StartScreen onStartGame={handleStartGame} yourPlayerId={yourPlayerId} game={game} />}
      {gameStarted && !negotiationStarted && <GameScreen onEndGame={handleEndGame} onNegotiation={handleStartNegotiation} playerId={yourPlayerId} game={game}/>}
      {/* {!negotiationStarted && <NegotiationScreen onStartGame={handleStartNegotiation} playerId={yourPlayerId} />} */}
      {negotiationStarted && <NegotiationScreen offNegotiation={handleStopNegotiation} playerId={yourPlayerId} />}      
      {/* <StartScreen onStartGame={handleStartGame} /> */}
  
      <ul id="playersSection"> 
        {playerIds.map((playerId, index) => {
          const player = Rune.getPlayerInfo(playerId);

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
          );
        })}
      </ul>

      
    </>
  );
}
export default App;
