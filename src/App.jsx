// ... your existing imports
import { useEffect, useState } from "react";
import StartScreen from "./components/Screens/StartScreen.jsx";
import GameScreen from "./components/Screens/GameScreen.jsx";
import BuyerChoice from "./components/Screens/BuyerChoice.jsx";
import SellerChoice from "./components/Screens/SellerChoice.jsx";
import Showroom from "./components/Screens/Showroom.jsx";
import NegotiationScreen from "./components/Screens/NegotiationScreen.jsx";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [negotiationStarted, setNegotiationStarted] = useState(false);
  const [ChoiceEnded, setChoiceEnded] = useState(false);
  const [game, setGame] = useState();
  const [yourPlayerId, setYourPlayerId] = useState();

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

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        if (action && action.name === "claimCell") selectSound.play();
      },
    });
  }, []);

  if (!game) return;

  const { winCombo, cells, lastMovePlayerId, playerIds, freeCells } = game;

  return (
    <>
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

      {negotiationStarted && (
        <NegotiationScreen offNegotiation={handleStopNegotiation} yourPlayerId={yourPlayerId} game={game} />
      )}

      <ul id="playersSection">
        {playerIds.map((playerId, index) => {
          const player = Rune.getPlayerInfo(playerId);
          return (
            <li key={playerId} data-player={index.toString()}>
              <img src={player.avatarUrl} />
              <span>
                {player.displayName}
                {player.playerId === yourPlayerId && <><br />(You)</>}
              </span>
            </li>
          );
        })}
      </ul>

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
