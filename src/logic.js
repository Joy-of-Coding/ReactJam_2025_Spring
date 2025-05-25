import cars from "./components/CarInfo";

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4, //Buyer, Salesperson, Spectator, Additional Player joining mid game
  setup: (allPlayerIds) => ({
    roles: Object.fromEntries(allPlayerIds.map(id => [id, null])),
    personas: Object.fromEntries(allPlayerIds.map(id => [id, null])),
    playerIds: allPlayerIds,
    cars,
    objects,
    },
    // const objects = {},
    objects[playerId] = {
      id: playerId,
      x: 100 + index * 100,
      y: 100,
      draggable: true,
      heldBy: null,
      }
    ),
      // Assigns roles to players
  actions: {
      assignRole: (role, { game, playerId }) => {
        game.roles[playerId] = role;
      },
        assignPersona: (persona, { game, playerId }) => {
        game.personas[playerId] = persona;
      },

      startDrag: (_, { playerId, game }) => {
      const object = game.objects[playerId];
      if (object && object.draggable && !object.heldBy) {
        object.heldBy = playerId;
        }
      },

      dragTo: ({ x, y }, { playerId, game }) => {
      const object = game.objects[playerId];
      if (object?.heldBy === playerId) {
        object.x = x;
        object.y = y;
        }
      },

      endDrag: (_, { playerId, game }) => {
      const object = game.objects[playerId];
      if (object?.heldBy === playerId) {
        object.heldBy = null;
        }
      },
    },

  
  // Click the 'Add player' button on the desktop version succesfully adds a new player
  events: {
    playerJoined: (playerId, {game}) => {
      //const player = self.getPlayerInfo(playerId);
      //console.log(playerId,  player)
      console.log("Player joined:", playerId);
    },
    
  
}})