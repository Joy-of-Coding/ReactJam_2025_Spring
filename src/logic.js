import cars from "./components/Cars/CarInfo";

const isGameOver = (game) => {
  // Game over if catHappiness reaches 2000 or drops to 0
  // return game.catHappiness >= 1000 || game.catHappiness <= 0;
  return game.scores[0] != 1;
};

const finalizeScores = (game) => {
  game.playerIds.forEach((playerId) => {
    if (game.scores[playerId] < 0) {
      game.scores[playerId] = 0;
    }
  });
};

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4, // Buyer, Salesperson, Spectator, Additional Player joining mid game

  setup: (allPlayerIds) => {
    return {
      roles: Object.fromEntries(allPlayerIds.map((id) => [id, null])),
      personas: Object.fromEntries(allPlayerIds.map((id) => [id, null])),
      playerIds: allPlayerIds,
      cars,
      scores: Object.fromEntries(allPlayerIds.map((playerId) => [playerId, 1])),
      objects: Object.fromEntries(
        allPlayerIds.map((playerId, index) => [
          playerId,
          {
            id: playerId,
            x: 50 + index * 50,
            y: 50,
            draggable: true,
            heldBy: null,
          },
        ]),
      ),
      sellerCars: {}, // To store cars selected by sellers
      gameState: { // For game flow persistence
        gameStarted: false,
        choiceCompleted: false,
        negotiationStarted: false
      },
      contracts: [], // To store signed contracts
    };
  },

  actions: {
    assignRole: (role, { game, playerId }) => {
      game.roles[playerId] = role;
    },

    assignPersona: (persona, { game, playerId }) => {
      game.personas[playerId] = persona;
    },

    updateSellerCars: ({ cars, prices }, { game, playerId }) => {
      if (game.roles[playerId] !== "Seller") {
        throw Rune.invalidAction();
      }
      
      // Store the seller's selected cars with prices
      game.sellerCars[playerId] = cars.map((car, index) => ({
        ...car,
        price: prices[index]
      }));
    },

    updateGameState: (newState, { game }) => {
      // Update game state properties for persistence
      game.gameState = {
        ...game.gameState,
        ...newState
      };
    },

    signContract: ({ buyerId, sellerId, carDetails }, { game }) => {
      // Create a new contract
      const contract = {
        buyerId,
        sellerId,
        carDetails,
        timestamp: Date.now()
      };
      
      // Add to contracts list
      game.contracts.push(contract);
      
      // Could trigger game end or other events here
    },

    startDrag: (_, { playerId, game }) => {
      const obj = game.objects[playerId];
      if (obj && obj.draggable && obj.heldBy === null) {
        obj.heldBy = playerId;
      } else {
        throw Rune.invalidAction();
      }
    },

    dragTo: ({ x, y }, { playerId, game }) => {
      const obj = game.objects[playerId];
      if (obj && obj.heldBy === playerId) {
        obj.x = x;
        obj.y = y;
      } else {
        throw Rune.invalidAction();
      }
    },

    endDrag: (_, { playerId, game }) => {
      const obj = game.objects[playerId];
      if (obj && obj.heldBy === playerId) {
        obj.heldBy = null;
      } else {
        throw Rune.invalidAction();
      }
    },

    updateScore: ({ yourPlayerId, amount }, { game }) => {
      if (!game.playerIds.includes(yourPlayerId)) {
        throw Rune.invalidAction();
      }

      if (game.scores[yourPlayerId] === undefined) {
        game.scores[yourPlayerId] = 0;
      }

      game.scores[yourPlayerId] += amount;

      if (isGameOver(game)) {
        finalizeScores(game);
        Rune.gameOver({
          players: Object.fromEntries(
            game.playerIds.map((id) => [id, game.scores[id]]),
          ),
        });
      }
    },

    myAction: (allPlayerIds) => {
      Rune.gameOver({
        players: {
          [allPlayerIds[0]]: 21981,
          // Add others if needed
        },
      });
    },
  },

  events: {
    playerJoined: (playerId, { game }) => {
      game.scores[playerId] = 0;
      if (!game.playerIds.includes(playerId)) {
        game.playerIds.push(playerId);
      }
      
      // Initialize new player objects
      game.roles[playerId] = null;
      game.personas[playerId] = null;
      game.objects[playerId] = {
        id: playerId,
        x: 50 + game.playerIds.length * 50,
        y: 50,
        draggable: true,
        heldBy: null,
      };
    },
    
    playerLeft: (playerId, { game }) => {
      // Remove player but keep the game state
      game.playerIds = game.playerIds.filter(id => id !== playerId);
      
      // Cleanup
      if (game.sellerCars[playerId]) {
        delete game.sellerCars[playerId];
      }
    }
  },
});
