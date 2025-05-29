// ... your existing imports
import { useEffect, useState } from "react";
import StartScreen from "./components/Screens/StartScreen.jsx";
import GameScreen from "./components/Screens/GameScreen.jsx";
import BuyerChoice from "./components/Screens/BuyerChoice.jsx";
import SellerChoice from "./components/Screens/SellerChoice.jsx";
import Showroom from "./components/Screens/Showroom.jsx";
import NegotiationScreen from "./components/Screens/NegotiationScreen.jsx";
import oldHornAudio from "./assets/sound/old-car-horn-153262.mp3"
import Carscreentest from "./components/Screens/Carscreentest.jsx";

function App() {
  //   ///
  const oldHorn = new Audio(oldHornAudio)
  // const [gameStarted, setGameStarted] = useState(false);
  const [negotiationStarted, setNegotiationStarted] = useState(false);
  const [ChoiceEnded, setChoiceEnded] = useState(false);
  const [game, setGame] = useState();
  const [yourPlayerId, setYourPlayerId] = useState();

  const handleStartGame = () => {
    Rune.actions.startCountdown();
    console.log("The game has started");
    Rune.actions.startGame();
    // setGameStarted(true);
  };

  const handleEndGame = () => {
    console.log("The game has ended");
    // Reset all states to return to start screen
    setNegotiationStarted(false);
    setChoiceEnded(false);
    // Reset roles and other game state
    Rune.actions.resetGame();
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

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        if (action && action.name === "assignRole") oldHorn.play();
        
        // Handle game reset
        if (action && action.name === "resetGame") {
          setNegotiationStarted(false);
          setChoiceEnded(false);
        }
        
        // Handle game end
        if (game && !game.gameStarted && action && action.name === "endGame") {
          setNegotiationStarted(false);
          setChoiceEnded(false);
        }
      },
    });
  }, []);

  // Add an effect to listen to window reload/refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      // This will run right before the page is unloaded (refreshed)
      localStorage.setItem('gameWasRefreshed', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Check if page was reloaded
    const wasRefreshed = localStorage.getItem('gameWasRefreshed') === 'true';
    if (wasRefreshed && game) {
      // Reset states after page reload
      setNegotiationStarted(false);
      setChoiceEnded(false);
      localStorage.removeItem('gameWasRefreshed');
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [game]);

  if (!game) return;

  const { roles, personas, cars, scores, objects, gameStarted, noNegotiations } = game;
  // if (noNegotiations) setNegotiationStarted(false);
  // if (ChoiceEnded) rune.noNegotiations == false;

  return (
    <>
      {/* <Carscreentest></Carscreentest> */}
      {!gameStarted && !negotiationStarted && !ChoiceEnded && (
        // <StartScreen onStartGame={handleStartGame} yourPlayerId={yourPlayerId} game={game} />
        <Carscreentest></Carscreentest>
      )}
      {gameStarted && !negotiationStarted && !ChoiceEnded && (
        game.roles[yourPlayerId] === "Buyer" ? (
          <BuyerChoice onEndChoice={handleChoiceEnded} yourPlayerId={yourPlayerId} game={game} />
        ) : game.roles[yourPlayerId] === "Seller" ? (
          <SellerChoice onEndChoice={handleChoiceEnded} yourPlayerId={yourPlayerId} game={game} />
        ) : (
          <GameScreen onEndChoice={handleChoiceEnded} onEndGame={handleEndGame} onNegotiation={handleStartNegotiation} yourPlayerId={yourPlayerId} game={game} />
        )
      )}

      {gameStarted && !negotiationStarted && ChoiceEnded && (
        <GameScreen onEndChoice={handleChoiceEnded} onEndGame={handleEndGame} onNegotiation={handleStartNegotiation} yourPlayerId={yourPlayerId} game={game} />
      )}

      {gameStarted && negotiationStarted && ChoiceEnded && (
        <NegotiationScreen 
          offNegotiation={handleStopNegotiation} 
          yourPlayerId={yourPlayerId} 
          game={game} 
          onEndGame={handleEndGame}
        />
      )}
    </>
  );
}

export default App;
