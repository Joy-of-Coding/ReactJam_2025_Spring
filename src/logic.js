import cars from "./components/CarInfo";

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4, //Buyer, Salesperson, Spectator, Additional Player joining mid game
  
  setup: (allPlayerIds) => {
    return {
      roles: Object.fromEntries(allPlayerIds.map(playerId => [playerId, null])),
      playerIds: allPlayerIds,
      cars: cars,
    //added timer for coundown
      countdownStart:null,
      countdownDuration: 5000,  //5 seconds
      countdownActive: false,
    };
  },
  // Assigns roles to players
  actions: {
    assignRole: (role, { game, playerId }) => {
      game.roles[playerId] = role;
    
    },
    //adding a countdown timer
    startCountdown: (_, { game }) => {
      game.countdownStart = Rune.gameTime();
      game.countdownActive = true; 
      /*onStartGame();*/
    
    }
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
  // Click the 'Add player' button on the desktop version succesfully adds a new player
  events: {
    playerJoined: (playerId, {game}) => {
      //const player = self.getPlayerInfo(playerId);
      //console.log(playerId,  player)
      console.log("Player joined:", playerId);

    },
  }    
});