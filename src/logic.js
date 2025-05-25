import cars from "./components/CarInfo";

const isGameOver = (game) => {
  // Game over if catHappiness reaches 2000 or drops to 0
  // return game.catHappiness >= 1000 || game.catHappiness <= 0;
  return game.scores[0] != 1
}

const finalizeScores = (game) => {
  game.playerIds.forEach(playerId => {
    if (game.scores[playerId] < 0) {
      game.scores[playerId] = 0;
    }
  });
};


Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4, //Buyer, Salesperson, Spectator, Additional Player joining mid game
  setup: (allPlayerIds) => ({
    roles: Object.fromEntries(allPlayerIds.map(playerId => [playerId, null])),
    personas: Object.fromEntries(allPlayerIds.map(playerId => [playerId, null])),
    scores: Object.fromEntries(allPlayerIds.map(playerId => [playerId, 1])),
    playerIds: allPlayerIds,
    cars: cars
  }),
  // Assigns roles to players
  actions: {
    assignRole: (role, { game, playerId }) => {
      game.roles[playerId] = role;
    },
    assignPersona: (persona, { game, playerId }) => {
      game.personas[playerId] = persona;
    },
      //End game action
    onEndGame: () => {
        Rune.gameOver({
        players: getScores(game.players),
        delayPopUp: true,
      })
    },
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
        // finalizeScores(game);
        Rune.gameOver({
          players: Object.fromEntries(game.playerIds.map(id => [id, game.scores[id]]))
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
      })
    },
  },
  
// Click the 'Add player' button on the desktop version succesfully adds a new player
events: {
    playerJoined: (playerId, {game}) => {
      //const player = self.getPlayerInfo(playerId);
      //console.log(playerId,  player)
      console.log("Player joined:", playerId);

    },
      playerLeft: (playerId, {game}) => {
        console.log("Player left:", playerId);
        // Remove the player from roles and personas
        delete game.roles[playerId];
        delete game.personas[playerId];
    }
    
  
}})
    