import React, { useState } from 'react';
import carPersonas from '../../assets/car_buyer_personas_final_enriched.json';

const CarSection = ({ game }) => {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  
  // Find the seller
  const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
  
  // For now we'll use placeholder data - in a real implementation, 
  // this would come from the seller's selections in SellerChoice
  const sellerCars = carPersonas.slice(0, 3).map((persona, index) => ({
    ...persona.idealCar,
    price: 20000 + (index * 5000) // Placeholder prices
  }));
  
  const handleCarSelect = (index) => {
    setSelectedCarIndex(index);
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
      <h3 style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}>Available Cars</h3>
      
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
              width: '160px',
              height: '100%',
              backgroundColor: index === selectedCarIndex ? '#1565C0' : '#f0f0f0',
              color: index === selectedCarIndex ? 'white' : 'black',
              borderRadius: '6px',
              padding: '0.5rem',
              boxSizing: 'border-box',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: index === selectedCarIndex ? '0 0 8px rgba(0,0,0,0.3)' : 'none'
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
            </div>
            
            <div style={{ 
              marginTop: 'auto', 
              fontWeight: 'bold', 
              fontSize: '0.9rem', 
              textAlign: 'center' 
            }}>
              ${car.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarSection; 