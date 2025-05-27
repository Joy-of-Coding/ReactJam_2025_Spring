// ... your existing imports
import { useEffect, useState } from "react";
import StartScreen from "./components/Screens/StartScreen.jsx";
import GameScreen from "./components/Screens/GameScreen.jsx";
import BuyerChoice from "./components/Screens/BuyerChoice.jsx";
import SellerChoice from "./components/Screens/SellerChoice.jsx";
import TallyScores from "./components/Screens/TallyScores.jsx";
import NegotiationScreen from "./components/Screens/NegotiationScreen.jsx";
import oldHornAudio from "./assets/sound/old-car-horn-153262.mp3"
import Tempo from './components/Drag/tempPerson.json';



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
    //setGameStarted(false);
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
        if (action && action.name === "resetStart" && noNegotiations) setNegotiationStarted(false);
      },
    });
  }, []);

  if (!game) return;

  const { roles, personas, cars, scores, objects, gameStarted, noNegotiations } = game;
  const salespersonCar = Tempo.idealCar
  const buyerProfile = Tempo.profile
  const negotiatedDeal = Tempo.exampleDeal
  // if (noNegotiations) setNegotiationStarted(false);
  // if (ChoiceEnded) rune.noNegotiations == false;

  return (
    <>
    {/* //logic here to go here when game ends */}
    {Rune.actions.finalizeSale({ yourPlayerId, salespersonCar, buyerProfile, negotiatedDeal })}

{ !gameStarted &&
  <TallyScores
    // onEndChoice={onEndChoice}
    // onEndGame={onEndGame}
    // onNegotiation={onNegotiation}
    yourPlayerId={yourPlayerId} 
    game={game} 
  />
}
    
      {!gameStarted && !negotiationStarted && !ChoiceEnded && (
        <StartScreen onStartGame={handleStartGame} yourPlayerId={yourPlayerId} game={game} />
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

{negotiationStarted && gameStarted && (
  <NegotiationScreen 
    offNegotiation={handleStopNegotiation} 
    yourPlayerId={yourPlayerId} 
    game={game} 
  />
)}

{/* //logic here to go here when game ends
{ !gameStarted &&
  <TallyScores
    // onEndChoice={onEndChoice}
    // onEndGame={onEndGame}
    // onNegotiation={onNegotiation}
    yourPlayerId={yourPlayerId} 
    game={game} 
  />
}
       */}
      {/* {<SellerChoice onStartGame={handleStartGame} yourPlayerId={yourPlayerId} game={game} />}
      {<BuyerChoice onStartGame={handleStartGame} yourPlayerId={yourPlayerId} game={game} />}
      {<Showroom onStartGame={handleStartGame} yourPlayerId={yourPlayerId} game={game} />}
       */}

      {/* 🟡 Fixed Footer Buttons */}
      <div style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        padding: "0.5rem",
        backgroundColor: "transparent",
        zIndex: 1000
      }}>
        <button style={{
          backgroundColor: "#FFD700",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}>
          How to Play ❓
        </button>
        <button style={{
          backgroundColor: "#FFD700",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}>
          Credits 🏆
        </button>
      </div>
    </>
  );
}

export default App;
