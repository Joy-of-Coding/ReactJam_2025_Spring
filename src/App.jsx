import { useEffect, useState } from "react";

import StartScreen from "./components/Screens/StartScreen.jsx";
import GameScreen from "./components/Screens/GameScreen.jsx";
import BuyerChoice from "./components/Screens/BuyerChoice.jsx";
import SellerChoice from "./components/Screens/SellerChoice.jsx";
import Showroom from "./components/Screens/Showroom.jsx";
import NegotiationScreen from "./components/Screens/NegotiationScreen.jsx";

// Import styles
import "./components/styles/RoleSelection.css";

function App() {
  // Game state variables
  const [gameStarted, setGameStarted] = useState(false);
  const [choiceCompleted, setChoiceCompleted] = useState(false);
  const [negotiationStarted, setNegotiationStarted] = useState(false);
  
  // Game sounds (to be implemented)
  const [selectSound] = useState(null);

  // Handle game start
  const handleStartGame = () => {
    console.log("The game has started");
    setGameStarted(true);
  };

  // Handle end game (return to start)
  const handleEndGame = () => {
    console.log("The game has ended");
    setGameStarted(false);
    setChoiceCompleted(false);
    setNegotiationStarted(false);
    console.log("Current players:", game?.playerIds);
    console.log("Current roles:", game?.roles); 
  };
  
  // Handle starting a negotiation
  const handleStartNegotiation = () => {
    console.log("The negotiation has started");
    setNegotiationStarted(true);
  };
  
  // Handle ending a negotiation (return to showroom)
  const handleStopNegotiation = () => {
    setNegotiationStarted(false);
    console.log("Negotiation ended, returning to showroom");
    console.log("Current players:", game?.playerIds);
    console.log("Current roles:", game?.roles); 
  };
  
  // Handle when a player completes their role choice
  const handleChoiceCompleted = () => {
    console.log("Role/persona choice completed!");
    setChoiceCompleted(true);
  };

  // Game state from Rune
  const [game, setGame] = useState();
  const [yourPlayerId, setYourPlayerId] = useState();

  // Initialize Rune client
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);
        
        // Reset game flow states on refresh if they're not in game state
        if (game && !game.gameState) {
          setGameStarted(false);
          setChoiceCompleted(false);
          setNegotiationStarted(false);
        } else if (game && game.gameState) {
          // Restore game state from persisted state
          setGameStarted(game.gameState.gameStarted || false);
          setChoiceCompleted(game.gameState.choiceCompleted || false);
          setNegotiationStarted(game.gameState.negotiationStarted || false);
        }
        
        // Play sound on certain actions
        if (action && action.name === "claimCell") selectSound?.play();
      },
    });
  }, []);

  // Persist game flow state to game state
  useEffect(() => {
    if (game && yourPlayerId) {
      Rune.actions.updateGameState({
        gameStarted,
        choiceCompleted,
        negotiationStarted
      });
    }
  }, [gameStarted, choiceCompleted, negotiationStarted, game, yourPlayerId]);

  if (!game) {
    // Waiting for Rune to initialize
    return null;
  }

  // Show the appropriate screen based on game state
  return (
    <>
      {/* Start Screen - Show when game hasn't started */}
      {!gameStarted && (
        <StartScreen 
          onStartGame={handleStartGame} 
          yourPlayerId={yourPlayerId} 
          game={game} 
        />
      )}

      {/* Role/Persona Choice Screens - Show when game started but choice not completed */}
      {gameStarted && !choiceCompleted && (
        <>
          {/* Show BuyerChoice if player role is Buyer */}
          {game.roles[yourPlayerId] === "Buyer" && (
            <BuyerChoice 
              onEndChoice={handleChoiceCompleted} 
              yourPlayerId={yourPlayerId} 
              game={game} 
            />
          )}
          
          {/* Show SellerChoice if player role is Seller */}
          {game.roles[yourPlayerId] === "Seller" && (
            <SellerChoice 
              onEndChoice={handleChoiceCompleted} 
              yourPlayerId={yourPlayerId} 
              game={game} 
            />
          )}
          
          {/* Show role selection if no role assigned yet */}
          {!game.roles[yourPlayerId] && (
            <div className="role-selection">
              <h2>Choose Your Role</h2>
              <div className="role-buttons">
                <button onClick={() => Rune.actions.assignRole("Buyer")}>
                  I want to be a Buyer
                </button>
                <button onClick={() => Rune.actions.assignRole("Seller")}>
                  I want to be a Seller
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Showroom (Lobby) - Show when game started, choice completed, and not in negotiation */}
      {gameStarted && choiceCompleted && !negotiationStarted && (
        <Showroom 
          onEndChoice={handleChoiceCompleted} 
          onEndGame={handleEndGame} 
          onNegotiation={handleStartNegotiation} 
          yourPlayerId={yourPlayerId} 
          game={game} 
        />
      )}

      {/* Negotiation Screen - Show when in negotiation */}
      {gameStarted && negotiationStarted && (
        <NegotiationScreen 
          offNegotiation={handleStopNegotiation} 
          yourPlayerId={yourPlayerId} 
          game={game} 
        />
      )}
    </>
  );
}

export default App;
