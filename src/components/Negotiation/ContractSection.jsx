import React, { useState, useEffect } from 'react';
import WalkAwayButton from '../Buttons/WalkAwayButton';
import SignTheContractButton from '../Buttons/SignTheContractButton';
import carPersonas from '../../assets/car_buyer_personas_final_enriched.json';
import { scoreNegotiation } from '../Buttons/ScoringLogic';

const ContractSection = ({ yourPlayerId, game, selectedCar, selectedCarIndex }) => {
  const [price, setPrice] = useState('');
  const [carName, setCarName] = useState('');
  const [spiffs, setSpiffs] = useState('');
  const [carMatchScore, setCarMatchScore] = useState(null);
  
  // Determine player roles
  const buyerId = game.playerIds.find(id => game.roles[id] === "Buyer");
  const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
  const isBuyer = yourPlayerId === buyerId;
  const isSeller = yourPlayerId === sellerId;

  // Get buyer's persona
  const buyerPersonaId = game.personas && buyerId ? game.personas[buyerId] : null;
  const buyerPersona = buyerPersonaId !== null ? carPersonas.find(p => p.id === buyerPersonaId) : null;

  // Update form when selected car changes
  useEffect(() => {
    if (selectedCar) {
      setCarName(selectedCar.name);
      setPrice(selectedCar.price.toString());
      
      // Calculate match score if we have buyer persona
      if (buyerPersona) {
        // Compare selected car to buyer's ideal car
        const idealCar = buyerPersona.idealCar;
        let matchScore = 0;
        let totalAttributes = 0;
        
        // Simple matching algorithm - each matching attribute adds points
        if (selectedCar.carType === idealCar.carType) matchScore += 1;
        if (selectedCar.colorModel === idealCar.colorModel) matchScore += 1;
        if (selectedCar.safety === idealCar.safety) matchScore += 1;
        if (selectedCar.maintenanceExpenses === idealCar.maintenanceExpenses) matchScore += 1;
        if (selectedCar.techFeatures === idealCar.techFeatures) matchScore += 1;
        if (selectedCar.driveType === idealCar.driveType) matchScore += 1;
        if (selectedCar.gasMileage === idealCar.gasMileage) matchScore += 1;
        
        // Budget match (better if under budget)
        if (parseInt(price) <= buyerPersona.profile.budgetAmount) {
          matchScore += 1;
          if (parseInt(price) <= buyerPersona.profile.budgetAmount * 0.9) {
            matchScore += 1; // bonus for being significantly under budget
          }
        }
        
        // Calculate percentage match (7 attributes + price = 8 total points possible)
        totalAttributes = 8;
        const matchPercentage = Math.round((matchScore / totalAttributes) * 100);
        setCarMatchScore(matchPercentage);
      }
    }
  }, [selectedCar, buyerPersona, price]);

  return (
    <div className="contract-section" style={{
      width: '100%',
      maxWidth: '360px',
      padding: '0.3rem',
      height: '25vh',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Clipboard top */}
      <div style={{ 
        backgroundColor: '#db4c3f',
        height: '20px',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          position: 'absolute',
          top: '-10px',
          width: '80px',
          height: '35px',
          backgroundColor: '#a5a5a5',
          borderRadius: '20px 20px 0 0',
          zIndex: -1
        }} />
        <div style={{
          position: 'absolute',
          top: '3px',
          width: '60px',
          height: '10px',
          backgroundColor: '#8d8d8d',
          borderRadius: '5px'
        }} />
      </div>
      
      {/* Contract form */}
      <div className="contract-form" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.4rem',
        height: 'calc(100% - 25px)',
        backgroundColor: '#ffffff',
        padding: '0.5rem',
        borderBottomLeftRadius: '6px',
        borderBottomRightRadius: '6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        border: '1px solid #ddd',
        borderTop: 'none'
      }}>
        <div style={{ 
          textAlign: 'center', 
          borderBottom: '1px dashed #ccc', 
          paddingBottom: '0.3rem',
          marginBottom: '0.3rem'
        }}>
          <h3 style={{ fontSize: '0.9rem', margin: '0', fontFamily: 'cursive' }}>Vehicle Sale Contract</h3>
        </div>
        
        {/* Car Name Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <label htmlFor="car-input" style={{ minWidth: '50px', fontSize: '0.75rem' }}>
            <strong>Car:</strong>
          </label>
          <input 
            id="car-input"
            type="text" 
            placeholder="Car name" 
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            disabled={!isSeller}
            style={{ 
              flex: 1, 
              fontSize: '0.75rem', 
              padding: '0.2rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: isSeller ? 'white' : '#f9f9f9'
            }} 
          />
        </div>
        
        {/* Price Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <label htmlFor="price-input" style={{ minWidth: '50px', fontSize: '0.75rem' }}>
            <strong>Price:</strong>
          </label>
          <input 
            id="price-input"
            type="text" 
            placeholder="Enter price" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={!isSeller}
            style={{ 
              flex: 1, 
              fontSize: '0.75rem', 
              padding: '0.2rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: isSeller ? 'white' : '#f9f9f9'
            }} 
          />
        </div>
        
        {/* Spiffs Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <label htmlFor="spiffs-input" style={{ minWidth: '50px', fontSize: '0.75rem' }}>
            <strong>Extras:</strong>
          </label>
          <input 
            id="spiffs-input"
            type="text" 
            placeholder="Warranties, add-ons, etc." 
            value={spiffs}
            onChange={(e) => setSpiffs(e.target.value)}
            disabled={!isSeller}
            style={{ 
              flex: 1, 
              fontSize: '0.75rem', 
              padding: '0.2rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: isSeller ? 'white' : '#f9f9f9'
            }} 
          />
        </div>
        
        {/* Match score - only visible to buyer */}
        {isBuyer && carMatchScore !== null && (
          <div style={{ 
            fontSize: '0.75rem', 
            textAlign: 'center',
            padding: '0.2rem',
            backgroundColor: carMatchScore > 75 ? '#e6ffe6' : carMatchScore > 50 ? '#fff9e6' : '#ffe6e6',
            borderRadius: '4px',
            border: '1px solid ' + (carMatchScore > 75 ? '#c3e6cb' : carMatchScore > 50 ? '#ffeeba' : '#f5c6cb')
          }}>
            <span>Car match: <strong>{carMatchScore}%</strong></span>
            <div style={{
              width: '100%',
              height: '6px',
              backgroundColor: '#eee',
              borderRadius: '3px',
              marginTop: '0.2rem'
            }}>
              <div style={{
                width: `${carMatchScore}%`,
                height: '100%',
                backgroundColor: carMatchScore > 75 ? '#28a745' : carMatchScore > 50 ? '#ffc107' : '#dc3545',
                borderRadius: '3px',
                transition: 'width 0.5s'
              }} />
            </div>
          </div>
        )}
        
        {/* Buttons - only enabled for buyer */}
        <div style={{ 
          display: 'flex', 
          gap: '0.3rem', 
          marginTop: 'auto',
          justifyContent: 'space-around'
        }}>
          {isBuyer ? (
            <>
              <WalkAwayButton playerId={yourPlayerId} />
              <SignTheContractButton yourPlayerId={yourPlayerId} game={game} />
            </>
          ) : (
            <>
              <button 
                disabled 
                style={{ 
                  opacity: 0.5,
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.8rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              >
                Walk away
              </button>
              <button 
                disabled 
                style={{ 
                  opacity: 0.5,
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.8rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              >
                Sign the contract!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractSection; 