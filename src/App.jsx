import { useEffect, useState } from "react"
// import Car from "./components/Car"

import selectSoundAudio from "./assets/select.wav"

const selectSound = new Audio(selectSoundAudio)

// function App() {
//   const [game, setGame] = useState()
//   const [yourPlayerId, setYourPlayerId] = useState()

//   useEffect(() => {
//     Rune.initClient({
//       onChange: ({ game, action, yourPlayerId }) => {
//         setGame(game)
//         setYourPlayerId(yourPlayerId)

//         if (action && action.name === "claimCell") selectSound.play()
//       },
//     })
//   }, [])

//   if (!game) {
//     // Rune only shows your game after an onChange() so no need for loading screen
//     return
//   }

//   const { winCombo, cells, lastMovePlayerId, playerIds, freeCells } = game

//   return (
//     <>
//       <Car 
//         year={1982} 
//         model={'DeLorean'} 
//         condition={'Used'} 
//         mileage={185000} 
//         price={39999.99} 
//         features={['Gull-Wing Doors', 'Apple Carplay', 'LED Headlights' ]}
//       />
//       <ul id="playersSection">
//         {playerIds.map((playerId, index) => {
//           const player = Rune.getPlayerInfo(playerId)

//           return (
//             <li
//               key={playerId}
//               data-player={index.toString()}
//               // data-your-turn={String(
//               //   playerIds[index] !== lastMovePlayerId && !winCombo && freeCells
//               // )}
//             >
//               <img src={player.avatarUrl} />
//               <span>
//                 {player.displayName}
//                 {player.playerId === yourPlayerId && (
//                   <span>
//                     <br />
//                     (You)
//                   </span>
//                 )}
//               </span>
//             </li>
//           )
//         })}
//       </ul>
//     </>
//   )
// }

// Car component - displays car details
function Car({ year, model, condition, mileage, price, features }) {
  return (
    <div className="car-details p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <h2 className="text-2xl font-bold">{year} {model}</h2>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <p><span className="font-semibold">Condition:</span> {condition}</p>
        <p><span className="font-semibold">Mileage:</span> {mileage.toLocaleString()} miles</p>
        <p><span className="font-semibold">Price:</span> ${price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
      </div>
      <div className="mt-3">
        <h3 className="font-semibold">Features:</h3>
        <ul className="list-disc pl-5">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// DealershipLobby component - displays players in a dealership environment
function DealershipLobby({ playerIds, yourPlayerId, onApproach }) {
  // Mocking some sellers among the players (in a real app, this would come from game state)
  const sellers = playerIds.filter((_, index) => index % 3 === 0); // Every 3rd player is a seller
  
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  const handlePlayerClick = (playerId) => {
    setSelectedPlayer(playerId);
    // In a real implementation, this would trigger an action in the game
  };

  // Approaching a player
  const handleApproach = () => {
    if (selectedPlayer) {
      onApproach(selectedPlayer);
      setSelectedPlayer(null);
    }
  };

  return (
    <div className="dealership-lobby p-4 bg-blue-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dealership Lobby</h2>
      
      {/* Dealership visualization */}
      <div className="dealership-floor relative bg-gray-200 rounded-lg p-4 h-64 mb-4">
        {/* Reception desk */}
        <div className="reception absolute top-4 left-1/2 transform -translate-x-1/2 bg-amber-100 w-32 h-12 rounded-md flex items-center justify-center">
          <span className="text-sm">Reception</span>
        </div>
        
        {/* Car display area */}
        <div className="car-display absolute bottom-4 left-4 right-4 h-24 bg-white rounded-md flex items-center justify-center">
          <span className="text-sm">Cars Display Area</span>
        </div>
        
        {/* Player avatars on the floor */}
        <div className="players-area absolute top-20 left-0 right-0 bottom-32 flex flex-wrap justify-around items-center">
          {playerIds.map((playerId) => {
            const player = Rune.getPlayerInfo(playerId);
            const isSeller = sellers.includes(playerId);
            
            return (
              <div 
                key={playerId}
                className={`avatar-container relative cursor-pointer transition-transform ${selectedPlayer === playerId ? 'scale-110' : ''}`}
                onClick={() => handlePlayerClick(playerId)}
              >
                <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${isSeller ? 'border-yellow-500' : 'border-blue-500'}`}>
                  <img 
                    src={player.avatarUrl} 
                    alt={player.displayName}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-center text-xs mt-1 font-semibold">
                  {player.displayName}
                  {playerId === yourPlayerId && " (You)"}
                  {isSeller && <span className="block text-yellow-600">*Seller</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Interaction controls */}
      <div className="interaction-controls">
        {selectedPlayer && (
          <div className="text-center">
            <p className="mb-2">Selected: {Rune.getPlayerInfo(selectedPlayer).displayName}</p>
            <button 
              onClick={handleApproach}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              {sellers.includes(selectedPlayer) ? "Talk to Seller" : "Approach Buyer"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [game, setGame] = useState();
  const [yourPlayerId, setYourPlayerId] = useState();
  const [view, setView] = useState('car_details'); // 'car_details' or 'dealership_lobby'
  const [selectSound] = useState(() => new Audio('path/to/select-sound.mp3'));
  const [interactionLog, setInteractionLog] = useState([]);

  useEffect(() => {
    // Mock Rune object if it doesn't exist (for testing without the Rune framework)
    if (typeof Rune === 'undefined') {
      window.Rune = {
        initClient: ({ onChange }) => {
          // Mock game data
          onChange({
            game: {
              winCombo: null,
              cells: Array(9).fill(null),
              lastMovePlayerId: 'player2',
              playerIds: ['player1', 'player2', 'player3', 'player4'],
              freeCells: true,
            },
            yourPlayerId: 'player1',
          });
        },
        getPlayerInfo: (playerId) => ({
          displayName: `Player ${playerId.slice(-1)}`,
          avatarUrl: 'https://via.placeholder.com/100',
          playerId,
        }),
      };
    }

    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        if (action && action.name === "claimCell") selectSound.play();
      },
    });
  }, [selectSound]);

  if (!game) {
    return null;
  }

  const { playerIds } = game;

  const handleApproach = (targetPlayerId) => {
    const currentTime = new Date().toLocaleTimeString();
    const approacher = Rune.getPlayerInfo(yourPlayerId).displayName;
    const target = Rune.getPlayerInfo(targetPlayerId).displayName;
    
    setInteractionLog(prev => [
      ...prev,
      `[${currentTime}] ${approacher} approached ${target}`
    ]);
    
    // In a real app, you would trigger a game action here
    // Rune.actions.approachPlayer({ targetPlayerId });
  };

  return (
    <div className="app-container max-w-3xl mx-auto p-4">
      {/* View toggle */}
      <div className="view-toggle mb-4 flex space-x-2">
        <button
          onClick={() => setView('car_details')}
          className={`px-4 py-2 rounded ${view === 'car_details' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Car Details
        </button>
        <button
          onClick={() => setView('dealership_lobby')}
          className={`px-4 py-2 rounded ${view === 'dealership_lobby' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Dealership Lobby
        </button>
      </div>
      
      {/* Current view */}
      {view === 'car_details' ? (
        <Car 
          year={1982} 
          model={'DeLorean'} 
          condition={'Used'} 
          mileage={185000} 
          price={39999.99} 
          features={['Gull-Wing Doors', 'Apple Carplay', 'LED Headlights']}
        />
      ) : (
        <DealershipLobby 
          playerIds={playerIds}
          yourPlayerId={yourPlayerId}
          onApproach={handleApproach}
        />
      )}
      
      {/* Player list - shown in both views */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Players</h3>
        <ul id="playersSection" className="flex flex-wrap gap-3">
          {playerIds.map((playerId, index) => {
            const player = Rune.getPlayerInfo(playerId);

            return (
              <li
                key={playerId}
                data-player={index.toString()}
                className="flex items-center bg-white p-2 rounded shadow"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={player.avatarUrl} alt={player.displayName} className="w-full h-full object-cover" />
                </div>
                <span className="ml-2 text-sm">
                  {player.displayName}
                  {player.playerId === yourPlayerId && (
                    <span className="block text-xs text-gray-500">
                      (You)
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Interaction log */}
      {view === 'dealership_lobby' && interactionLog.length > 0 && (
        <div className="interaction-log mt-4 bg-gray-100 p-3 rounded max-h-40 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-1">Activity</h3>
          <ul className="text-xs space-y-1">
            {interactionLog.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
