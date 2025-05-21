
const cars = [
  {make: "Ford", model: "F150", color: "Red", features: ["chrome hub caps", "CB Radio", "Turbo Engine"], price: 35000},
  {make: "Jeep", model: "Rubicon", color: "Rhino", features: ["winch", "Co2 Cannister", "Cloth Top"], price: 42000}

]




Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds) => {
    return {
      players: allPlayerIds.map((p) => ({
        playerId: p,
        role: null,
        negotiations: { buyer: 0, seller: 0 },
        wins: { buyer: 0, seller: 0 },
      })),
    }
  },
  actions: {
    assignRole: (role, { game, playerId }) => {
      const player = game.players.find((p) => p.playerId === playerId)
      if (player) player.role = role
    }
  }
})
