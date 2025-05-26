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
      roles: Object.fromEntries(allPlayerIds.map(id => [id, null])),
      personas: Object.fromEntries(allPlayerIds.map(id => [id, null])),
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
        ])
      ),
    };
  },

  // Assigns roles to players
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
  },

  // ✅ Correctly placed outside `actions`
    assignPersona: (personaObj, { game, playerId }) => {
      game.personas[playerId] = personaObj;
    },
    //End game action
    // onEndGame: () => {
    //   Rune.gameOver({
    //     players: getScores(game.players),
    //     delayPopUp: true,
    //   });
    // },
    updateScore: ({ yourPlayerId, amount }, { game }) => {
      if (!game.playerIds.includes(yourPlayerId)) {
        throw Rune.invalidAction();
      }

      if (game.scores[yourPlayerId] === undefined) {
        game.scores[yourPlayerId] = 0;
      }

      game.scores[yourPlayerId] += amount;
      // game.catHappiness += amount;
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
          [allPlayerIds[0]]: 21981, //game.scores[allPlayerIds[0]]
          // [allPlayerIds[1]]: 8911,
          // [allPlayerIds[2]]: 20109,
          // [allPlayerIds[3]]: 323,
        },
      });
    },
  },

  // Click the 'Add player' button on the desktop version succesfully adds a new player
  events: {
    playerJoined: (playerId, { game }) => {
      console.log("Player joined:", playerId);
    },
    playerLeft: (playerId, { game }) => {
      console.log("Player left:", playerId);
      // Remove the player from roles and personas
      delete game.roles[playerId];
      delete game.personas[playerId];
    },
  },
});
