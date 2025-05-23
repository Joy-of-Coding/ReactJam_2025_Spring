import cars from "./components/CarInfo";

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4, //Buyer, Salesperson, Spectator, Additional Player joining mid game
  setup: (allPlayerIds) => ({
    roles: Object.fromEntries(allPlayerIds.map(playerId => [playerId, null])),
    playerIds: allPlayerIds,
    cars: cars
  }),
  // Assigns roles to players
  actions: {
    assignRole: (role, { game, playerId }) => {
      game.roles[playerId] = role;
    }
  },
  
  // Click the 'Add player' button on the desktop version succesfully adds a new player
  events: {
    playerJoined: (playerId, {game}) => {
      //const player = self.getPlayerInfo(playerId);
      //console.log(playerId,  player)
      console.log("Player joined:", playerId);

    },
    
  
}})