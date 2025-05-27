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
      countdownStart:null,
      countdownDuration: 5000,  //5 seconds
      countdownActive: false,

      // timeElapsed: 0,
      // stopTimer: false,
      // setBombs: 9,
      // baselineScore: 100,

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
    };
  },

  actions: {
    assignRole: (role, { game, playerId }) => {
      game.roles[playerId] = role;
    },

    assignPersona: (persona, { game, playerId }) => {
      game.personas[playerId] = persona;
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
      game.playerIds = game.playerIds.filter(id => id !== playerId);
    }
  },
});
