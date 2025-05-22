// const cars = [
//   {
//     make: "Ford",
//     model: "F150",
//     color: "Red",
//     features: ["chrome hub caps", "CB Radio", "Turbo Engine"],
//     price: 35000,
//   },
//   {
//     make: "Jeep",
//     model: "Rubicon",
//     color: "Rhino",
//     features: ["winch", "Co2 Cannister", "Cloth Top"],
//     price: 42000,
//   },
// ];

import cars from './CarInfo.js'

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 3,
  setup: (allPlayerIds) => ({
    roles: Object.fromEntries(allPlayerIds.map(playerId => [playerId, null])),
    playerIds: allPlayerIds,
    cars: cars
  }),
  actions: {
    assignRole: (role, { game, playerId }) => {
      game.roles[playerId] = role;
    }
  }
})

