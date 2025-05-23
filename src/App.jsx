import { useEffect, useState } from "react";
import StartScreen from "./components/Screens/StartScreen.jsx";
import GameScreen from "./components/Screens/GameScreen.jsx";
import selectSoundAudio from "./assets/select.wav";
import { render } from "react-dom";


const selectSound = new Audio(selectSoundAudio);

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    console.log("The game has started");
    setGameStarted(true);
  };

  const handleEndGame = () => {
    setGameStarted(false);
  };

  /// jaypox
  const [game, setGame] = useState();
  const [yourPlayerId, setYourPlayerId] = useState();

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId)

      }
    })
  }, []);

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return;
  }

  const { playerIds,  roles, cars } = game;


console.log(roles)
  return (
    <>
    	{!gameStarted && <StartScreen onStartGame={handleStartGame} />}
			{gameStarted && <GameScreen
        onStartGame={handleStartGame}
        roles={roles}
        game={game}
        yourPlayerId={yourPlayerId}
        cars={cars}
      />}
      {/* <StartScreen onStartGame={handleStartGame} /> */}
  
  
      <ul id="playersSection">
        {playerIds.map((playerId, index) => {
          const player = Rune.getPlayerInfo(playerId);
          console.log(playerId,  player)
          return (
            <li
              key={player.playerId}
              data-player={index.toString()}

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
