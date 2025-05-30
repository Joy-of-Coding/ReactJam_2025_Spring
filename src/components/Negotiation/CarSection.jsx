import React, { useState, useEffect } from 'react';
import carPersonas from '../../assets/car_buyer_personas_final_enriched.json';

// Import all car images that might be used
import blackVan from '../../assets/img/black_van.svg';
import greenVan from '../../assets/img/green_van.svg';
import whiteCoupe from '../../assets/img/white_coupe.svg';
import sportsCar from '../../assets/img/sports_car.svg';
import dreamstreamer from '../../assets/img/dreamstreamer.svg';
import suv from '../../assets/img/suv.svg';
import van from '../../assets/img/van.svg';
import spark from '../../assets/img/spark.svg';
import leafluxeEco from '../../assets/img/leafluxe_eco.svg';
import greenBulletMk2 from '../../assets/img/green_bullet_mk2.svg';
import redCometZr from '../../assets/img/red_comet_zr.svg';
import gruntxlV8 from '../../assets/img/gruntxl_v8.svg';

// Create a mapping of image filenames to their imported values
const carImages = {
  'black_van.svg': blackVan,
  'green_van.svg': greenVan,
  'white_coupe.svg': whiteCoupe,
  'sports_car.svg': sportsCar,
  'dreamstreamer.svg': dreamstreamer,
  'suv.svg': suv,
  'van.svg': van,
  'spark.svg': spark,
  'leafluxe_eco.svg': leafluxeEco,
  'green_bullet_mk2.svg': greenBulletMk2,
  'red_comet_zr.svg': redCometZr,
  'gruntxl_v8.svg': gruntxlV8,
};

const CarSection = ({ game, yourPlayerId, onCarSelect, isExpanded }) => {
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

  // Helper function to get the correct image source
  const getCarImage = (pictureName) => {
    if (!pictureName) return null;
    return carImages[pictureName] || null;
  };

  return (
    <div className="car-section-content" style={{
      width: '100%',
      padding: '0.3rem',
      backgroundColor: '#f9f9f9',
      borderBottomLeftRadius: '6px',
      borderBottomRightRadius: '6px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: isExpanded ? 'block' : 'none',
      boxSizing: 'border-box'
    }}>
      {/* Detail toggle button for seller */}
      {isSeller && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.3rem' }}>
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
        </div>
      )}
      
      {/* Car Carousel */}
      <div className="car-carousel" style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '0.5rem',
        padding: '0.3rem',
        height: isExpanded ? 'auto' : '0',
        maxHeight: '60vh',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {sellerCars.map((car, index) => (
          <div 
            key={index}
            className={`car-card ${index === selectedCarIndex ? 'selected' : ''}`}
            style={{
              flex: '0 0 auto',
              width: isSeller && showDetails ? '240px' : '160px',
              height: isExpanded ? 'auto' : '0',
              backgroundColor: index === selectedCarIndex ? '#1565C0' : '#f0f0f0',
              color: index === selectedCarIndex ? 'white' : 'black',
              borderRadius: '6px',
              padding: '0.5rem',
              boxSizing: 'border-box',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: index === selectedCarIndex ? '0 0 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'width 0.3s, transform 0.2s, box-shadow 0.2s',
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
              backgroundImage: car.picture && getCarImage(car.picture) ? `url(${getCarImage(car.picture)})` : 'none',
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

      {/* Selected car summary when section is not expanded */}
      {!isExpanded && selectedCarIndex !== null && sellerCars[selectedCarIndex] && (
        <div style={{
          padding: '0.3rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginTop: '0.2rem',
          fontSize: '0.75rem',
          display: 'none' // Hidden until needed
        }}>
          <strong>{sellerCars[selectedCarIndex].name}</strong> - ${sellerCars[selectedCarIndex].price.toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default CarSection; 