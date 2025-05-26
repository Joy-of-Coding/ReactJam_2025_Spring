import cars from "./components/CarInfo";

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 4, // Buyer, Salesperson, Spectator, Additional Player joining mid game

  setup: (allPlayerIds) => {
    return {
      roles: Object.fromEntries(allPlayerIds.map(id => [id, null])),
      personas: Object.fromEntries(allPlayerIds.map(id => [id, null])),
      playerIds: allPlayerIds,
      cars,
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
  events: {
    playerJoined: (playerId, { game }) => {
      console.log("Player joined:", playerId);
    }
  }
});