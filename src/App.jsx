// import { useEffect, useState } from "react"
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

import { useState, useEffect } from 'react';

// Mock Rune object for demonstration purposes
const Rune = {
  initClient: ({ onChange }) => {
    // Simulate game data
    const gameData = {
      winCombo: null,
      cells: [],
      lastMovePlayerId: "player2",
      freeCells: true,
      playerIds: ["player1", "player2", "player3", "player4"],
    };
    
    // Call onChange with mock data
    setTimeout(() => {
      onChange({ 
        game: gameData, 
        action: null, 
        yourPlayerId: "player1" 
      });
    }, 100);
  },
  getPlayerInfo: (playerId) => {
    const players = {
      player1: { 
        displayName: "You", 
        avatarUrl: "/api/placeholder/40/40",
        playerId: "player1",
        role: "buyer"
      },
      player2: { 
        displayName: "John", 
        avatarUrl: "/api/placeholder/40/40",
        playerId: "player2",
        role: "seller"
      },
      player3: { 
        displayName: "Maria", 
        avatarUrl: "/api/placeholder/40/40",
        playerId: "player3",
        role: "seller"
      },
      player4: { 
        displayName: "Alex", 
        avatarUrl: "/api/placeholder/40/40",
        playerId: "player4",
        role: "buyer"
      }
    };
    return players[playerId];
  }
};

// Car component
const Car = ({ year, model, condition, mileage, price, features }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">{year} {model}</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-700"><span className="font-semibold">Condition:</span> {condition}</p>
          <p className="text-gray-700"><span className="font-semibold">Mileage:</span> {mileage.toLocaleString()} miles</p>
          <p className="text-gray-700 text-xl font-bold mt-2">${price.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-semibold mb-1">Features:</p>
          <ul className="list-disc pl-5">
            {features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// DealershipLobby component
const DealershipLobby = ({ playerIds, yourPlayerId, onApproach }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  const handleApproach = (playerId) => {
    setSelectedPlayer(playerId);
    onApproach(playerId);
  };
  
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Dealership Lobby</h2>
      
      <div className="bg-blue-50 p-4 mb-6 rounded border border-blue-200">
        <p className="text-center text-blue-800">
          Welcome to the dealership! Approach a salesperson (marked with *seller) or wait for someone to approach you.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {playerIds.map((playerId) => {
          const player = Rune.getPlayerInfo(playerId);
          const isSeller = player.role === "seller";
          const isYou = player.playerId === yourPlayerId;
          
          return (
            <div 
              key={playerId}
              className={`relative p-4 rounded-lg cursor-pointer transition-all duration-300 
                ${selectedPlayer === playerId ? 'bg-green-100 border-2 border-green-500' : 'bg-white border border-gray-200 hover:border-blue-300'}
                ${isYou ? 'ring-2 ring-blue-400' : ''}
              `}
              onClick={() => !isYou && handleApproach(playerId)}
            >
              <div className="flex flex-col items-center">
                <img 
                  src={player.avatarUrl} 
                  alt={player.displayName}
                  className="w-16 h-16 rounded-full mb-2"
                />
                <p className="font-medium text-center">
                  {player.displayName}
                  {isSeller && <span className="text-red-500">*seller</span>}
                  {isYou && <span className="block text-sm text-blue-500">(You)</span>}
                </p>
              </div>
              
              {selectedPlayer === playerId && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {selectedPlayer && (
        <div className="mt-6 p-4 bg-green-50 rounded border border-green-200">
          <p className="text-center text-green-800">
            You are now interacting with {Rune.getPlayerInfo(selectedPlayer).displayName}!
          </p>
        </div>
      )}
    </div>
  );
};

function App() {
  const [game, setGame] = useState();
  const [yourPlayerId, setYourPlayerId] = useState();
  const [view, setView] = useState('lobby'); // 'lobby' or 'carDetails'
  const [selectedSeller, setSelectedSeller] = useState(null);
  
  // Mock select sound
  const selectSound = { play: () => console.log("Sound played") };

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        if (action && action.name === "claimCell") selectSound.play();
      },
    });
  }, []);

  if (!game) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const { playerIds } = game;
  
  const handleApproach = (playerId) => {
    const player = Rune.getPlayerInfo(playerId);
    if (player.role === 'seller') {
      setSelectedSeller(playerId);
      // After a brief delay, show the car details
      setTimeout(() => setView('carDetails'), 1000);
    }
  };

  const handleBackToLobby = () => {
    setView('lobby');
    setSelectedSeller(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {view === 'lobby' ? (
        <DealershipLobby 
          playerIds={playerIds}
          yourPlayerId={yourPlayerId}
          onApproach={handleApproach}
        />
      ) : (
        <div>
          <div className="mb-4">
            <button 
              onClick={handleBackToLobby}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              ← Back to Lobby
            </button>
            
            {selectedSeller && (
              <div className="mt-4 p-4 bg-gray-50 rounded border flex items-center">
                <img 
                  src={Rune.getPlayerInfo(selectedSeller).avatarUrl} 
                  alt="Seller"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <p>
                  Speaking with: <strong>{Rune.getPlayerInfo(selectedSeller).displayName}</strong>
                </p>
              </div>
            )}
          </div>
          
          <Car 
            year={1982} 
            model={'DeLorean'} 
            condition={'Used'} 
            mileage={185000} 
            price={39999.99} 
            features={['Gull-Wing Doors', 'Apple Carplay', 'LED Headlights']}
          />
          
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">All Players</h3>
            <ul id="playersSection" className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {playerIds.map((playerId, index) => {
                const player = Rune.getPlayerInfo(playerId);

                return (
                  <li
                    key={playerId}
                    className="flex flex-col items-center bg-gray-50 p-3 rounded"
                    data-player={index.toString()}
                  >
                    <img src={player.avatarUrl} className="w-12 h-12 rounded-full mb-2" />
                    <span className="text-center">
                      {player.displayName}
                      {player.playerId === yourPlayerId && (
                        <span className="block text-sm text-blue-500">
                          (You)
                        </span>
                      )}
                      {player.role === 'seller' && (
                        <span className="block text-sm text-red-500">
                          *seller
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
