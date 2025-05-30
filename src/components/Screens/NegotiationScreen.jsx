import React, { useState, useEffect } from 'react';
import "../styles/NegotiationScreen.css";
import PlayerSection from "../Negotiation/PlayerSection";
import CarSection from "../Negotiation/CarSection";
import ContractSection from "../Negotiation/ContractSection";

const NegotiationScreen = ({ offNegotiation, yourPlayerId, game, onEndGame }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  
  // States for expandable sections - changed to track each section separately
  const [expandedSections, setExpandedSections] = useState({
    player: false,
    car: false,
    contract: false
  });
  
  const [summaryData, setSummaryData] = useState({
    player: null,
    car: null,
    contract: null
  });
  
  // Get initial data for summaries
  useEffect(() => {
    // Set player summary data
    const buyerId = game.playerIds.find(id => game.roles[id] === "Buyer");
    const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
    const buyerInfo = buyerId ? Rune.getPlayerInfo(buyerId) : null;
    const sellerInfo = sellerId ? Rune.getPlayerInfo(sellerId) : null;
    
    setSummaryData(prev => ({
      ...prev,
      player: {
        buyer: buyerInfo?.displayName || 'Buyer',
        seller: sellerInfo?.displayName || 'Seller'
      }
    }));
    
    // Set contract summary if available
    if (game.contractDetails && game.contractDetails.carName && game.contractDetails.price) {
      setSummaryData(prev => ({
        ...prev,
        contract: {
          carName: game.contractDetails.carName,
          price: game.contractDetails.price
        }
      }));
    }
  }, [game]);
  
  // Handle car selection from the CarSection
  const handleCarSelect = (car, index) => {
    setSelectedCar(car);
    setSelectedCarIndex(index);
    
    // Update car summary
    setSummaryData(prev => ({
      ...prev,
      car: {
        name: car.name,
        price: car.price
      }
    }));
    
    // Update contract details when car is selected
    if (car) {
      // Get seller id
      const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
      const isSeller = yourPlayerId === sellerId;
      
      // If user is seller, update contract with new car name and price
      if (isSeller) {
        Rune.actions.updateContractDetails({
          carName: car.name,
          price: car.price.toString(),
          spiffs: game.contractDetails?.spiffs || ""
        });
      }
    }
  };

  // Toggle section expansion - modified to handle multiple open sections
  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };
  
  // Handle contract updates for summary
  useEffect(() => {
    if (game.contractDetails && game.contractDetails.carName && game.contractDetails.price) {
      setSummaryData(prev => ({
        ...prev,
        contract: {
          carName: game.contractDetails.carName,
          price: game.contractDetails.price
        }
      }));
    }
  }, [game.contractDetails]);
  
  const handleSignContract = () => {
    // Handle signing the contract
    onEndGame(); // End the game when contract is signed
  };
  
  return (
    <div className="fullscreen-centered">
      <div className="game-screen" style={{ 
        padding: '0.3rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.3rem', 
        alignItems: 'center',
        height: '100%',
        boxSizing: 'border-box',
        justifyContent: 'flex-start',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <div style={{ 
          width: '360px', 
          textAlign: 'center', 
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '6px',
          padding: '0.3rem',
          marginBottom: '0.5rem',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '1.1rem', margin: '0.1rem 0', color: '#333' }}>Car Dealership</h2>
        </div>
        

         {/* Contract Section - Expandable */}
        <div className={`expandable-section`}>
          <div 
            className="section-header contract-section-header" 
            onClick={() => toggleSection('contract')}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3>Vehicle Sale Contract</h3>
              {summaryData.contract && !expandedSections.contract && (
                <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>
                  {summaryData.contract.carName}: ${summaryData.contract.price}
                </span>
              )}
            </div>
            <div className={`expand-icon ${expandedSections.contract ? 'expanded' : ''}`}>
              ▼
            </div>
          </div>
          <div className={`section-content ${expandedSections.contract ? 'expanded' : ''}`}>
            <ContractSection 
              yourPlayerId={yourPlayerId} 
              game={game} 
              selectedCar={selectedCar}
              selectedCarIndex={selectedCarIndex}
              isExpanded={expandedSections.contract} 
            />
          </div>
        </div>
        {/* Car Section - Expandable */}
        <div className={`expandable-section`}>
          <div 
            className="section-header car-section-header" 
            onClick={() => toggleSection('car')}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3>Available Cars</h3>
              {summaryData.car && !expandedSections.car && (
                <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>
                  Selected: {summaryData.car.name} - ${summaryData.car.price?.toLocaleString()}
                </span>
              )}
            </div>
            <div className={`expand-icon ${expandedSections.car ? 'expanded' : ''}`}>
              ▼
            </div>
          </div>
          <div className={`section-content ${expandedSections.car ? 'expanded' : ''}`}>
            <CarSection 
              game={game} 
              yourPlayerId={yourPlayerId} 
              onCarSelect={handleCarSelect}
              isExpanded={expandedSections.car} 
            />
          </div>
        </div>
                {/* Player Section - Expandable */}
        <div className={`expandable-section`}>
          <div 
            className="section-header player-section-header" 
            onClick={() => toggleSection('player')}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3>Negotiators</h3>
              {summaryData.player && !expandedSections.player && (
                <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>
                  {summaryData.player.buyer} & {summaryData.player.seller}
                </span>
              )}
            </div>
            <div className={`expand-icon ${expandedSections.player ? 'expanded' : ''}`}>
              ▼
            </div>
          </div>
          <div className={`section-content ${expandedSections.player ? 'expanded' : ''}`}>
            <PlayerSection 
              yourPlayerId={yourPlayerId} 
              game={game} 
              isExpanded={expandedSections.player} 
            />
          </div>
        </div>
       
        {/* Exit Button */}
        <button 
          className="end-button" 
          style={{ 
            fontSize: '0.85rem', 
            padding: '0.3rem 0.6rem', 
            marginTop: '0.4rem',
            marginBottom: '0.4rem',
            backgroundColor: '#45a049',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} 
          onClick={offNegotiation}
        >
          Back to Showroom
        </button>
      </div>
    </div>
  );
};

export default NegotiationScreen;