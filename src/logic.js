const cars = [
  {
    make: "Ford",
    model: "F150",
    color: "Red",
    features: ["chrome hub caps", "CB Radio", "Turbo Engine"],
    price: 35000,
  },
  {
    make: "Jeep",
    model: "Rubicon",
    color: "Rhino",
    features: ["winch", "Co2 Cannister", "Cloth Top"],
    price: 42000,
  },
];

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds) => ({
    // const roles = {};
    // const playerIds = []
    roles: allPlayerIds.forEach((p) => {
      [p, null];
    }),

    playerIds: allPlayerIds,
  }),
  actions: {
    assignRole: (role, { game, playerId }) => {
      game.roles[playerId] = role;
    },
  },
});
