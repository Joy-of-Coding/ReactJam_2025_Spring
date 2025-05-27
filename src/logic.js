import cars from "./components/Cars/CarInfo";

const isGameOver = (game) => {
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
      gameStarted: false,
      noNegotiations: true,
      //added timer for coundown
      countdownStart: null,
      countdownDuration: 5000, //5 seconds
      countdownActive: false,

      // timeElapsed: 0,
      // stopTimer: false,
      // setBombs: 9,
      // baselineScore: 100,

      roles: Object.fromEntries(allPlayerIds.map((id) => [id, null])),
      personas: Object.fromEntries(allPlayerIds.map((id) => [id, null])),
      playerIds: allPlayerIds,
      cars,
      sellerCars: [], // Array to store the seller's selected cars with prices
      contractDetails: {
        carName: "",
        price: "",
        spiffs: ""
      }, // Contract details shared between buyer and seller
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
    };
  },

  actions: {
    assignRole: (role, { game, playerId }) => {
      game.roles[playerId] = role;
    },

    assignPersona: (persona, { game, playerId }) => {
      game.personas[playerId] = persona;
    },

    // New action to save seller's car selections and prices
    saveSellerCars: ({ cars }, { game, playerId }) => {
      if (game.roles[playerId] === "Seller") {
        game.sellerCars = cars;
      } else {
        throw Rune.invalidAction();
      }
    },

    // New action to update contract details
    updateContractDetails: ({ carName, price, spiffs }, { game, playerId }) => {
      // Only seller can update contract details
      if (game.roles[playerId] === "Seller") {
        game.contractDetails = {
          carName: carName || game.contractDetails.carName,
          price: price || game.contractDetails.price,
          spiffs: spiffs || game.contractDetails.spiffs
        };
      } else {
        throw Rune.invalidAction();
      }
    },

    // New action to end the game with results
    endGame: ({ result }, { game }) => {
      // Prepare players object with results
      const players = {};
      
      if (result === "walkAway") {
        // When buyer walks away, both buyer and seller tie
        const buyerId = game.playerIds.find(id => game.roles[id] === "Buyer");
        const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
        
        if (buyerId) players[buyerId] = "TIE";
        if (sellerId) players[sellerId] = "TIE";
        
        // Set all other players to TIE as well
        game.playerIds.forEach(id => {
          if (!players[id]) {
            players[id] = "TIE";
          }
        });
        
        console.log("Game ended with walk away. Result:", players);
      } 
      else if (result === "buyerWins") {
        // Buyer wins, seller loses
        const buyerId = game.playerIds.find(id => game.roles[id] === "Buyer");
        const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
        
        if (buyerId) players[buyerId] = "WON";
        if (sellerId) players[sellerId] = "LOST";
        
        // Set all other players to TIE
        game.playerIds.forEach(id => {
          if (!players[id]) {
            players[id] = "TIE";
          }
        });
        
        console.log("Game ended with buyer win. Result:", players);
      }
      else if (result === "sellerWins") {
        // Seller wins, buyer loses
        const buyerId = game.playerIds.find(id => game.roles[id] === "Buyer");
        const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
        
        if (buyerId) players[buyerId] = "LOST";
        if (sellerId) players[sellerId] = "WON";
        
        // Set all other players to TIE
        game.playerIds.forEach(id => {
          if (!players[id]) {
            players[id] = "TIE";
          }
        });
        
        console.log("Game ended with seller win. Result:", players);
      }
      else {
        // Custom results provided (for future extensibility)
        Object.assign(players, result);
        console.log("Game ended with custom result:", players);
      }
      
      // End the game with the calculated results
      Rune.gameOver({ players });
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
    //adding a countdown timer
    startCountdown: (_, { game }) => {
      game.countdownStart = Rune.gameTime();
      game.countdownActive = true;
    },
    startGame: (_, { game }) => {
      // game.countdownStart = Rune.gameTime();
      // game.countdownActive = true;
      /*onStartGame();*/
      console.log("press all the burttons");
      game.gameStarted = true;
      game.noNegotiations = true;
    },

    resetGameStart: (_, { game }) => {
      game.gameStarted = true;
      game.noNegotiations = true;
    },

    // New resetGame action to reset the game state
    resetGame: (_, { game }) => {
      // Reset game state
      game.gameStarted = false;
      game.noNegotiations = true;
      game.countdownStart = null;
      game.countdownActive = false;

      // Reset all player roles
      Object.keys(game.roles).forEach(playerId => {
        game.roles[playerId] = null;
      });

      // Reset all personas
      Object.keys(game.personas).forEach(playerId => {
        game.personas[playerId] = null;
      });

      // Reset player positions to initial positions
      Object.entries(game.objects).forEach(([playerId, obj], index) => {
        obj.x = 50 + index * 50;
        obj.y = 50;
        obj.heldBy = null;
      });
      
      // Reset contract details
      game.contractDetails = {
        carName: "",
        price: "",
        spiffs: ""
      };
    },

    update: ({ game }) => {
      if (game.countdownActive) {
        const elapsed = Rune.gameTime() - game.countdownStart;
        if (elapsed >= game.countdownDuration) {
          game.countdownActive = false;
          console.log("countdown completed let the game begin");
        }
      }
    },
  },
  // Click the 'Add player' button on the desktop version succesfully adds a new player
  events: {
    playerJoined: (playerId, { game }) => {
      game.scores[playerId] = 0;
      if (!game.playerIds.includes(playerId)) {
        game.playerIds.push(playerId);
      }
    },
    playerLeft: (playerId, { game }) => {
      game.playerIds = game.playerIds.filter((id) => id !== playerId);
    },
  },
});
