import cars from "./components/CarInfo";

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4, //Buyer, Salesperson, Spectator, Additional Player joining mid game
  setup: (allPlayerIds) => ({
    roles: Object.fromEntries(allPlayerIds.map(playerId => [playerId, null])),
    personas: Object.fromEntries(allPlayerIds.map(playerId => [playerId, null])),
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
        Rune.gameOver();
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
    