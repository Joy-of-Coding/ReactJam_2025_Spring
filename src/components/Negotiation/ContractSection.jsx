import React, { useState, useEffect, useRef } from 'react';
import WalkAwayButton from '../Buttons/WalkAwayButton';
import SignTheContractButton from '../Buttons/SignTheContractButton';
import carPersonas from '../../assets/car_buyer_personas_final_enriched.json';
import { scoreNegotiation } from '../Buttons/ScoringLogic';

const ContractSection = ({ yourPlayerId, game, selectedCar, selectedCarIndex, isExpanded }) => {
  const [price, setPrice] = useState('');
  const [carName, setCarName] = useState('');
  const [spiffs, setSpiffs] = useState('');
  const [carMatchScore, setCarMatchScore] = useState(null);
  
  // Create refs for debouncing
  const updateTimeoutRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  
  // Determine player roles
  const buyerId = game.playerIds.find(id => game.roles[id] === "Buyer");
  const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
  const isBuyer = yourPlayerId === buyerId;
  const isSeller = yourPlayerId === sellerId;

  // Get buyer's persona
  const buyerPersonaId = game.personas && buyerId ? game.personas[buyerId] : null;
  const buyerPersona = buyerPersonaId !== null ? carPersonas.find(p => p.id === buyerPersonaId) : null;

  // Update local state from game's contract details
  useEffect(() => {
    if (game.contractDetails) {
      if (game.contractDetails.carName) setCarName(game.contractDetails.carName);
      if (game.contractDetails.price) setPrice(game.contractDetails.price);
      if (game.contractDetails.spiffs) setSpiffs(game.contractDetails.spiffs);
    }
  }, [game.contractDetails]);

  // Update form when selected car changes
  useEffect(() => {
    if (selectedCar) {
      // Always update the car name and price in the contract when a car is selected
      setCarName(selectedCar.name);
      setPrice(selectedCar.price.toString());
      
      // Only have the seller update the shared contract details
      if (isSeller) {
        updateContractDetailsThrottled({
          carName: selectedCar.name,
          price: selectedCar.price.toString(),
          spiffs: spiffs
        });
      }
      
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
        const currentPrice = price || selectedCar.price.toString();
        if (parseInt(currentPrice) <= buyerPersona.profile.budgetAmount) {
          matchScore += 1;
          if (parseInt(currentPrice) <= buyerPersona.profile.budgetAmount * 0.9) {
            matchScore += 1; // bonus for being significantly under budget
          }
        }
        
        // Calculate percentage match (7 attributes + price = 8 total points possible)
        totalAttributes = 8;
        const matchPercentage = Math.round((matchScore / totalAttributes) * 100);
        setCarMatchScore(matchPercentage);
      }
    }
  }, [selectedCar, buyerPersona, isSeller, spiffs]);

  // Throttled update function to avoid hitting rate limits
  const updateContractDetailsThrottled = (details) => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateTimeRef.current;
    
    // Clear any pending updates
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    // If we updated recently, schedule an update for later
    if (timeSinceLastUpdate < 300) { // 300ms minimum between updates
      updateTimeoutRef.current = setTimeout(() => {
        Rune.actions.updateContractDetails(details);
        lastUpdateTimeRef.current = Date.now();
      }, 300 - timeSinceLastUpdate);
    } else {
      // Otherwise update immediately
      Rune.actions.updateContractDetails(details);
      lastUpdateTimeRef.current = now;
    }
  };

  // Handle input changes and update the shared contract details
  const handleCarNameChange = (e) => {
    const newValue = e.target.value;
    setCarName(newValue);
    if (isSeller) {
      updateContractDetailsThrottled({
        carName: newValue,
        price: price,
        spiffs: spiffs
      });
    }
  };

  const handlePriceChange = (e) => {
    const newValue = e.target.value;
    setPrice(newValue);
    if (isSeller) {
      updateContractDetailsThrottled({
        carName: carName,
        price: newValue,
        spiffs: spiffs
      });
    }
  };

  const handleSpiffsChange = (e) => {
    const newValue = e.target.value;
    setSpiffs(newValue);
    if (isSeller) {
      updateContractDetailsThrottled({
        carName: carName,
        price: price,
        spiffs: newValue
      });
    }
  };

  return (
    <div className="contract-section-content" style={{
      width: '100%',
      padding: '0',
      display: isExpanded ? 'block' : 'none'
    }}>
      {/* Contract form */}
      <div className="contract-form" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.4rem',
        padding: '0.7rem',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        {/* Contract title */}
        <div style={{
          textAlign: 'center',
          borderBottom: '1px dashed #8B4513',
          marginBottom: '0.5rem',
          paddingBottom: '0.3rem'
        }}>
          <h4 style={{
            margin: 0,
            fontFamily: 'cursive, sans-serif',
            fontSize: '1rem',
            color: '#8B4513'
          }}>
            VEHICLE SALE CONTRACT
          </h4>
        </div>
        
        {/* Car Name Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <label htmlFor="car-input" style={{ minWidth: '80px', fontSize: '0.75rem', color: '#8B4513' }}>
            <strong>Vehicle:</strong>
          </label>
          <input 
            id="car-input"
            type="text" 
            placeholder="Car name" 
            value={carName}
            onChange={handleCarNameChange}
            disabled={!isSeller}
            style={{ 
              flex: 1, 
              fontSize: '0.75rem', 
              padding: '0.3rem',
              borderRadius: '4px',
              border: '1px solid #dbc1ac',
              backgroundColor: isSeller ? 'white' : '#f9f9f9'
            }} 
          />
        </div>
        
        {/* Price Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <label htmlFor="price-input" style={{ minWidth: '80px', fontSize: '0.75rem', color: '#8B4513' }}>
            <strong>Sale Price:</strong>
          </label>
          <input 
            id="price-input"
            type="text" 
            placeholder="Enter price" 
            value={price}
            onChange={handlePriceChange}
            disabled={!isSeller}
            style={{ 
              flex: 1, 
              fontSize: '0.75rem', 
              padding: '0.3rem',
              borderRadius: '4px',
              border: '1px solid #dbc1ac',
              backgroundColor: isSeller ? 'white' : '#f9f9f9'
            }} 
          />
        </div>
        
        {/* Spiffs Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <label htmlFor="spiffs-input" style={{ minWidth: '80px', fontSize: '0.75rem', color: '#8B4513' }}>
            <strong>Add-ons:</strong>
          </label>
          <input 
            id="spiffs-input"
            type="text" 
            placeholder="Warranties, add-ons, etc." 
            value={spiffs}
            onChange={handleSpiffsChange}
            disabled={!isSeller}
            style={{ 
              flex: 1, 
              fontSize: '0.75rem', 
              padding: '0.3rem',
              borderRadius: '4px',
              border: '1px solid #dbc1ac',
              backgroundColor: isSeller ? 'white' : '#f9f9f9'
            }} 
          />
        </div>
        
        {/* Match score - only visible to buyer */}
        {isBuyer && carMatchScore !== null && (
          <div style={{ 
            fontSize: '0.75rem', 
            textAlign: 'center',
            padding: '0.4rem',
            margin: '0.3rem 0',
            backgroundColor: carMatchScore > 75 ? '#e6ffe6' : carMatchScore > 50 ? '#fff9e6' : '#ffe6e6',
            borderRadius: '4px',
            border: '1px solid ' + (carMatchScore > 75 ? '#c3e6cb' : carMatchScore > 50 ? '#ffeeba' : '#f5c6cb')
          }}>
            <span>Car match for your needs: <strong>{carMatchScore}%</strong></span>
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
        
        {/* Signature line */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.7rem',
          borderTop: '1px dashed #8B4513',
          paddingTop: '0.5rem'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#8B4513' }}>
            <div>Date: {new Date().toLocaleDateString()}</div>
          </div>
          <div style={{ 
            borderBottom: '1px solid #8B4513', 
            width: '130px', 
            marginTop: '1rem',
            position: 'relative'
          }}>
            <div style={{ 
              position: 'absolute', 
              top: '3px', 
              fontSize: '0.65rem', 
              color: '#8B4513', 
              width: '100%', 
              textAlign: 'center' 
            }}>
              Signature
            </div>
          </div>
        </div>
        
        {/* Buttons - only enabled for buyer */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          marginTop: '1rem',
          justifyContent: 'space-around'
        }}>
          {isBuyer ? (
            <>
              <WalkAwayButton playerId={yourPlayerId} game={game} />
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
                Sign contract
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractSection; 