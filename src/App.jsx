import { useEffect, useState } from "react";


import StartScreen from "./components/Screens/StartScreen.jsx";
import GameScreen from "./components/Screens/GameScreen.jsx";
import BuyerChoice from "./components/Screens/BuyerChoice.jsx";
import SellerChoice from "./components/Screens/SellerChoice.jsx";
import Showroom from "./components/Screens/Showroom.jsx";
import NegotiationScreen from "./components/Screens/NegotiationScreen.jsx";


function App() {
  //   ///
  const [gameStarted, setGameStarted] = useState(false);
  const [negotiationStarted, setNegotiationStarted] = useState(false);
  const [ChoiceEnded, setChoiceEnded] = useState(false);

  const handleStartGame = () => {
    console.log("The game has started");
    setGameStarted(true);
  };

  const handleEndGame = () => {
    console.log("The game has ended");
    setGameStarted(false);
    console.log("Current players:", game.playerIds);
    console.log("Current roles:", game.roles); 
  };
  

  const handleStartNegotiation = () => {
    console.log("The negotiation has started");
    setNegotiationStarted(true);
  };
  const handleStopNegotiation = () => {
    setNegotiationStarted(false);
    console.log("Current players:", game.playerIds);
    console.log("Current roles:", game.roles); 
  };
  
  const handleChoiceEnded = () => {
    console.log("Choice made!");
    setChoiceEnded(true);
  };

  // const handleEndGame = () => {
  //   console.log("The game has ended");
  //   setGameStarted(false);
  //   console.log("Current players:", game.playerIds);
  //   console.log("Current roles:", game.roles); 
  // };

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
    	{/* {!gameStarted && !negotiationStarted && !ChoiceEnded && <StartScreen onStartGame={handleStartGame} yourPlayerId={yourPlayerId} game={game} />}
      {gameStarted && !negotiationStarted && !ChoiceEnded && <Showroom onEndChoice={handleChoiceEnded} onEndGame={handleEndGame} onNegotiation={handleStartNegotiation} yourPlayerId={yourPlayerId} game={game}/>}
      {gameStarted && !negotiationStarted && ChoiceEnded && <GameScreen onEndChoice={handleChoiceEnded} onEndGame={handleEndGame} onNegotiation={handleStartNegotiation} playerId={yourPlayerId} game={game}/>}
      {negotiationStarted && <NegotiationScreen offNegotiation={handleStopNegotiation} yourPlayerId={yourPlayerId} game={game}/>}      
       */}

       {/* game has not started, choices have not finished, and negotiations have not finished === StartScreen */}
      {!gameStarted && !negotiationStarted && !ChoiceEnded && (
  <StartScreen 
    onStartGame={handleStartGame} 
    yourPlayerId={yourPlayerId} 
    game={game} 
  />
)}

 {/* game HAS started, Negotiations NOT started, Choices NOT ended */}
{gameStarted && !negotiationStarted && !ChoiceEnded && (
  game.roles[yourPlayerId] === "Buyer" ? (
    <BuyerChoice 
      onEndChoice={handleChoiceEnded} 
      yourPlayerId={yourPlayerId} 
      game={game} 
    />
  ) : game.roles[yourPlayerId] === "Seller" ? (
    <SellerChoice 
      onEndChoice={handleChoiceEnded} 
      yourPlayerId={yourPlayerId} 
      game={game} 
    />
  ) : (
    <GameScreen 
      onEndChoice={handleChoiceEnded} 
      onEndGame={handleEndGame} 
      onNegotiation={handleStartNegotiation} 
      yourPlayerId={yourPlayerId} 
      game={game} 
    />
  )
)}
{gameStarted && !negotiationStarted && ChoiceEnded && (
  <GameScreen 
    onEndChoice={handleChoiceEnded} 
    onEndGame={handleEndGame} 
    onNegotiation={handleStartNegotiation} 
    yourPlayerId={yourPlayerId} 
    game={game} 
  />
)}

{negotiationStarted && (
  <NegotiationScreen 
    offNegotiation={handleStopNegotiation} 
    yourPlayerId={yourPlayerId} 
    game={game} 
  />
)}

  
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
      {/* {<SellerChoice onStartGame={handleStartGame} yourPlayerId={yourPlayerId} game={game} />}
      {<BuyerChoice onStartGame={handleStartGame} yourPlayerId={yourPlayerId} game={game} />}
      {<Showroom onStartGame={handleStartGame} yourPlayerId={yourPlayerId} game={game} />}
       */}
    </>
  );
}
export default App;
