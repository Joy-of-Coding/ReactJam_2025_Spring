// function findWinningCombo(cells) {
//   return (
//     [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ].find((combo) =>
//       combo.every((i) => cells[i] && cells[i] === cells[combo[0]])
//     ) || null
//   )
// }

// Rune.initLogic({
//   minPlayers: 2,
//   maxPlayers: 2,
//   setup: (allPlayerIds) => ({
//     cells: new Array(9).fill(null),
//     winCombo: null,
//     lastMovePlayerId: null,
//     playerIds: allPlayerIds,
//   }),
//   actions: {
//     claimCell: (cellIndex, { game, playerId, allPlayerIds }) => {
//       if (
//         game.cells[cellIndex] !== null ||
//         playerId === game.lastMovePlayerId
//       ) {
//         throw Rune.invalidAction()
//       }

//       game.cells[cellIndex] = playerId
//       game.lastMovePlayerId = playerId
//       game.winCombo = findWinningCombo(game.cells)

//       if (game.winCombo) {
//         const [player1, player2] = allPlayerIds

//         Rune.gameOver({
//           players: {
//             [player1]: game.lastMovePlayerId === player1 ? "WON" : "LOST",
//             [player2]: game.lastMovePlayerId === player2 ? "WON" : "LOST",
//           },
//         })
//       }

//       game.freeCells = game.cells.findIndex((cell) => cell === null) !== -1

//       if (!game.freeCells) {
//         Rune.gameOver({
//           players: {
//             [game.playerIds[0]]: "LOST",
//             [game.playerIds[1]]: "LOST",
//           },
//         })
//       }
//     },
//   },
// })
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
      console.log("Current players:", game.playerIds);
      console.log("Current roles:", game.roles); 

    },
    
  
}})