import { useState, useEffect } from 'react';

// HowToPopup component
const HowToPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          borderBottom: '1px solid #eee',
          paddingBottom: '12px'
        }}>How To Use Car Dealership App</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>For Buyers:</h3>
          <ol style={{ paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Start in the lobby and look for salespersons (marked with *seller)</li>
            <li style={{ marginBottom: '8px' }}>Click on a salesperson to approach them</li>
            <li style={{ marginBottom: '8px' }}>Browse the available vehicles they have in their inventory</li>
            <li style={{ marginBottom: '8px' }}>Consider your budget and requirements when selecting a vehicle</li>
            <li style={{ marginBottom: '8px' }}>Click back to lobby to speak with a different salesperson</li>
          </ol>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>For Sellers:</h3>
          <ol style={{ paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Wait for buyers to approach you in the lobby</li>
            <li style={{ marginBottom: '8px' }}>Show your inventory of vehicles based on customer preferences</li>
            <li style={{ marginBottom: '8px' }}>Highlight features that match the buyer's needs</li>
            <li style={{ marginBottom: '8px' }}>Consider price negotiations within the allowed range</li>
            <li style={{ marginBottom: '8px' }}>Close the sale by finding the right match for the buyer</li>
          </ol>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Tips for Success:</h3>
          <ul style={{ paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Buyers: Be clear about your budget and requirements</li>
            <li style={{ marginBottom: '8px' }}>Sellers: Listen to the buyer's needs and suggest appropriate vehicles</li>
            <li style={{ marginBottom: '8px' }}>Communication is key to a successful transaction</li>
            <li style={{ marginBottom: '8px' }}>Don't be afraid to negotiate on price and features</li>
          </ul>
        </div>
        
        <button 
          onClick={onClose}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0066ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'block',
            margin: '0 0 0 auto'
          }}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

// CSS styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '16px'
  },
  loadingContainer: {
    padding: '24px',
    textAlign: 'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    padding: '24px',
    marginBottom: '24px'
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px'
  },
  textLabel: {
    color: '#333',
    margin: '4px 0'
  },
  textLabelBold: {
    fontWeight: 'bold'
  },
  priceText: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '8px'
  },
  featuresList: {
    paddingLeft: '20px'
  },
  lobbyContainer: {
    backgroundColor: '#f3f3f3',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  lobbyTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textAlign: 'center'
  },
  infoBox: {
    backgroundColor: '#e6f0ff',
    padding: '16px',
    marginBottom: '24px',
    borderRadius: '4px',
    border: '1px solid #cce0ff'
  },
  infoText: {
    textAlign: 'center',
    color: '#0055cc'
  },
  successBox: {
    backgroundColor: '#e6ffec',
    padding: '16px',
    marginTop: '24px',
    borderRadius: '4px',
    border: '1px solid #ccffcc'
  },
  successText: {
    textAlign: 'center',
    color: '#006622'
  },
  playerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '24px'
  },
  playerCard: {
    position: 'relative',
    padding: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    border: '1px solid #ddd'
  },
  playerCardSelected: {
    backgroundColor: '#e6ffec',
    border: '2px solid #00cc44'
  },
  playerCardUser: {
    boxShadow: '0 0 0 2px #0066ff'
  },
  playerCardHover: {
    borderColor: '#66b3ff'
  },
  playerImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  playerImage: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    marginBottom: '8px'
  },
  playerName: {
    fontWeight: '500',
    textAlign: 'center'
  },
  playerSeller: {
    color: '#ff3300'
  },
  playerUser: {
    display: 'block',
    fontSize: '14px',
    color: '#0066ff'
  },
  checkmark: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#00cc44',
    color: 'white',
    borderRadius: '50%',
    padding: '4px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#0066ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  sellerInfo: {
    marginTop: '16px',
    padding: '16px',
    backgroundColor: '#f8f8f8',
    borderRadius: '4px',
    border: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center'
  },
  sellerImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '12px'
  },
  playersSection: {
    marginTop: '24px',
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  playersSectionTitle: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '8px'
  },
  playersList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '16px',
    listStyle: 'none',
    padding: 0
  },
  playersListItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: '12px',
    borderRadius: '4px'
  },
  smallPlayerImage: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    marginBottom: '8px'
  }
};

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
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>{year} {model}</h2>
      <div style={styles.cardGrid}>
        <div>
          <p style={styles.textLabel}>
            <span style={styles.textLabelBold}>Condition:</span> {condition}
          </p>
          <p style={styles.textLabel}>
            <span style={styles.textLabelBold}>Mileage:</span> {mileage.toLocaleString()} miles
          </p>
          <p style={styles.priceText}>${price.toLocaleString()}</p>
        </div>
        <div>
          <p style={styles.textLabelBold}>Features:</p>
          <ul style={styles.featuresList}>
            {features.map((feature, index) => (
              <li key={index} style={styles.textLabel}>{feature}</li>
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
  const [hoverPlayerId, setHoverPlayerId] = useState(null);
  
  const handleApproach = (playerId) => {
    setSelectedPlayer(playerId);
    onApproach(playerId);
  };
  
  return (
    <div style={styles.lobbyContainer}>
      <h2 style={styles.lobbyTitle}>Dealership Lobby</h2>
      
      <div style={styles.infoBox}>
        <p style={styles.infoText}>
          Welcome to the dealership! Approach a salesperson (marked with *seller) or wait for someone to approach you.
        </p>
      </div>
      
      <div style={styles.playerGrid}>
        {playerIds.map((playerId) => {
          const player = Rune.getPlayerInfo(playerId);
          const isSeller = player.role === "seller";
          const isYou = player.playerId === yourPlayerId;
          const isHovered = hoverPlayerId === playerId;
          const isSelected = selectedPlayer === playerId;
          
          const cardStyle = {
            ...styles.playerCard,
            ...(isSelected && styles.playerCardSelected),
            ...(isYou && styles.playerCardUser),
            ...(isHovered && styles.playerCardHover)
          };
          
          return (
            <div 
              key={playerId}
              style={cardStyle}
              onClick={() => !isYou && handleApproach(playerId)}
              onMouseEnter={() => setHoverPlayerId(playerId)}
              onMouseLeave={() => setHoverPlayerId(null)}
            >
              <div style={styles.playerImageContainer}>
                <img 
                  src={player.avatarUrl} 
                  alt={player.displayName}
                  style={styles.playerImage}
                />
                <p style={styles.playerName}>
                  {player.displayName}
                  {isSeller && <span style={styles.playerSeller}>&nbsp;*seller</span>}
                  {isYou && <span style={styles.playerUser}>(You)</span>}
                </p>
              </div>
              
              {isSelected && (
                <div style={styles.checkmark}>
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {selectedPlayer && (
        <div style={styles.successBox}>
          <p style={styles.successText}>
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
  const [showHowTo, setShowHowTo] = useState(true); // Show by default when app loads
  
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
    return <div style={styles.loadingContainer}>Loading...</div>;
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

  // Define help button style
  const helpButtonStyle = {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#0066ff',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    border: 'none'
  };

  return (
    <div style={styles.container}>
      {/* How To Popup */}
      <HowToPopup 
        isOpen={showHowTo}
        onClose={() => setShowHowTo(false)}
      />
      
      {/* Help Button */}
      {!showHowTo && (
        <button 
          style={helpButtonStyle}
          onClick={() => setShowHowTo(true)}
          title="Show Help"
        >
          ?
        </button>
      )}

      {view === 'lobby' ? (
        <DealershipLobby 
          playerIds={playerIds}
          yourPlayerId={yourPlayerId}
          onApproach={handleApproach}
        />
      ) : (
        <div>
          <div>
            <button 
              style={styles.backButton}
              onClick={handleBackToLobby}
            >
              ← Back to Lobby
            </button>
            
            {selectedSeller && (
              <div style={styles.sellerInfo}>
                <img 
                  src={Rune.getPlayerInfo(selectedSeller).avatarUrl} 
                  alt="Seller"
                  style={styles.sellerImage}
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
          
          <div style={styles.playersSection}>
            <h3 style={styles.playersSectionTitle}>All Players</h3>
            <ul id="playersSection" style={styles.playersList}>
              {playerIds.map((playerId, index) => {
                const player = Rune.getPlayerInfo(playerId);

                return (
                  <li
                    key={playerId}
                    style={styles.playersListItem}
                    data-player={index.toString()}
                  >
                    <img 
                      src={player.avatarUrl} 
                      style={styles.smallPlayerImage} 
                    />
                    <span style={{textAlign: 'center'}}>
                      {player.displayName}
                      {player.playerId === yourPlayerId && (
                        <span style={styles.playerUser}>
                          (You)
                        </span>
                      )}
                      {player.role === 'seller' && (
                        <span style={styles.playerSeller}>
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