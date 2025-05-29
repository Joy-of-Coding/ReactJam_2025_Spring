import React, { useState } from 'react';
import carPersonas from '../../assets/car_buyer_personas_final_enriched.json';

const CarSection = ({ game, yourPlayerId, onCarSelect }) => {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  // Determine if current player is the seller
  const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
  const isSeller = yourPlayerId === sellerId;
  
  // Get cars from the seller's selections
  const sellerCars = game.sellerCars && game.sellerCars.length > 0 
    ? game.sellerCars 
    // Fallback to placeholder data if seller cars are not yet available
    : carPersonas.slice(0, 3).map((persona, index) => ({
        ...persona.idealCar,
        price: 20000 + (index * 5000) // Placeholder prices
      }));
  
  const handleCarSelect = (index) => {
    setSelectedCarIndex(index);
    if (onCarSelect) {
      onCarSelect(sellerCars[index], index);
    }
  };

  const toggleDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  return (
    <div className="car-section" style={{
      width: '100%',
      maxWidth: '360px',
      padding: '0.3rem',
      backgroundColor: '#FFD700',
      borderRadius: '6px',
      marginBottom: '0.5rem',
      height: '35vh',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}>Available Cars</h3>
        {isSeller && (
          <button 
            onClick={toggleDetails}
            style={{
              border: 'none',
              background: 'rgba(0,0,0,0.1)',
              borderRadius: '4px',
              padding: '0.2rem 0.4rem',
              fontSize: '0.7rem',
              cursor: 'pointer'
            }}
          >
            {showDetails ? 'Simple View' : 'Detailed View'}
          </button>
        )}
      </div>
      
      {/* Car Carousel */}
      <div className="car-carousel" style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '0.5rem',
        padding: '0.2rem',
        height: 'calc(100% - 1.5rem)'
      }}>
        {sellerCars.map((car, index) => (
          <div 
            key={index}
            className={`car-card ${index === selectedCarIndex ? 'selected' : ''}`}
            style={{
              flex: '0 0 auto',
              width: isSeller && showDetails ? '240px' : '160px',
              height: '100%',
              backgroundColor: index === selectedCarIndex ? '#1565C0' : '#f0f0f0',
              color: index === selectedCarIndex ? 'white' : 'black',
              borderRadius: '6px',
              padding: '0.5rem',
              boxSizing: 'border-box',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: index === selectedCarIndex ? '0 0 8px rgba(0,0,0,0.3)' : 'none',
              transition: 'width 0.3s, transform 0.2s',
              transform: index === selectedCarIndex ? 'scale(1.02)' : 'scale(1)'
            }}
            onClick={() => handleCarSelect(index)}
          >
            {/* Car Image - Display from picture property */}
            <div style={{ 
              height: '80px', 
              backgroundColor: '#ddd',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              backgroundImage: car.picture ? `url(/src/assets/img/${car.picture})` : 'none',

              //backgroundImage: car.picture ? `url(../../assets/img/${car.picture})` : 'none',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} />
            
            <h4 style={{ 
              fontSize: '0.85rem', 
              margin: '0 0 0.2rem 0', 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis' 
            }}>
              {car.name}
            </h4>
            
            <div style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>
              <div><strong>Type:</strong> {car.carType}</div>
              <div><strong>Color:</strong> {car.colorModel}</div>
              <div><strong>Safety:</strong> {car.safety}</div>
              <div><strong>Maint:</strong> {car.maintenanceExpenses}</div>
              
              {/* Additional details for sellers */}
              {isSeller && showDetails && (
                <>
                  <div><strong>Mileage:</strong> {car.mileage.toLocaleString()} miles</div>
                  <div><strong>Gas:</strong> {car.gasMileage}</div>
                  <div><strong>Tech:</strong> {car.techFeatures || 'Basic'}</div>
                  <div><strong>Drive:</strong> {car.driveType}</div>
                  <div><strong>Dealer Cost:</strong> ${car.dealerCost.toLocaleString()}</div>
                </>
              )}
            </div>
            
            <div style={{ 
              marginTop: 'auto', 
              fontWeight: 'bold', 
              fontSize: '0.9rem', 
              textAlign: 'center',
              backgroundColor: index === selectedCarIndex ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
              padding: '0.2rem',
              borderRadius: '4px'
            }}>
              ${car.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarSection; 