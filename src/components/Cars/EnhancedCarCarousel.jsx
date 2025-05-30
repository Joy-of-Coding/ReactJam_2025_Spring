import React, { useRef, useEffect } from 'react';

const EnhancedCarCarousel = ({ cars, onSelect }) => {
  const trackRef = useRef(null);
  // Add car images and dealer cost for pricing
  const enhancedCars = cars.map(car => ({
    ...car,
    // Set recommended price to 15% above dealer cost
    recommendedPrice: Math.round(car.dealerCost * 1.15)
  }));
  
  // Scroll functionality 
  useEffect(() => {
    if (trackRef.current) {
      // Center the carousel initially
      trackRef.current.scrollLeft = (trackRef.current.scrollWidth - trackRef.current.clientWidth) / 2;
    }
  }, []);

  useEffect(() => {
  const el = trackRef.current;
  if (!el) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    el.classList.add('dragging');
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    el.classList.remove('dragging');
  };

  const handleMouseUp = () => {
    isDown = false;
    el.classList.remove('dragging');
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // adjust scroll speed
    el.scrollLeft = scrollLeft - walk;
  };

  el.addEventListener('mousedown', handleMouseDown);
  el.addEventListener('mouseleave', handleMouseLeave);
  el.addEventListener('mouseup', handleMouseUp);
  el.addEventListener('mousemove', handleMouseMove);

  return () => {
    el.removeEventListener('mousedown', handleMouseDown);
    el.removeEventListener('mouseleave', handleMouseLeave);
    el.removeEventListener('mouseup', handleMouseUp);
    el.removeEventListener('mousemove', handleMouseMove);
  };
}, []);

  return (
    <div className="enhanced-carousel" style={{
      width: '100%',
      padding: '0.5rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      border: '1px solid #ddd',
      marginBottom: '1rem',
    }}>
      <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0', textAlign: 'center' }}>
        Available Cars to Sell
      </h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
        <div style={{ 
          color: '#666', 
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center' 
        }}>
          ← Scroll to see more cars →
        </div>
      </div>
      
      {/* Car Cards Container */}
      <div 
        className="car-carousel-track" 
        ref={trackRef}
        style={{
          display: 'flex',
          overflowX: 'scroll',
          gap: '.1rem',
          padding: '0.5rem',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          minHeight: '200px',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'touch',
          scrollbarWidth: 'none',
          cursor: 'grab'
        }}
      >
        {enhancedCars.map((car, index) => (
          <div 
            key={index}
            className="car-card"
            style={{
              flex: '0 0 150px',
              scrollSnapAlign: 'center',
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '0.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: '1px solid #ddd',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={() => onSelect(car)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            {/* Car Image */}
            <div style={{ 
              height: '75px', 
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              backgroundImage: car.picture ? `url(../../assets/img/${car.picture})` : 'none',

              //backgroundImage: car.picture ? `url(../../assets/img/${car.picture})` : 'none',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} />
            
            <h4 style={{ 
              fontSize: '0.9rem', 
              margin: '0 0 0.3rem 0',
              fontWeight: 'bold',
              color: '#1565C0'
            }}>
              {car.name}
            </h4>
            
            <div style={{ fontSize: '0.75rem', marginBottom: '0.1rem', flex: 1 }}>
              <div><strong>Type:</strong> {car.carType}</div>
              <div><strong>Color:</strong> {car.colorModel}</div>
              <div><strong>Safety:</strong> {car.safety}</div>
              <div><strong>Maintenance:</strong> {car.maintenanceExpenses}</div>
            </div>
            
            <div style={{ 
              fontWeight: 'bold', 
              fontSize: '0.85rem', 
              color: '#45a049',
              textAlign: 'center'
            }}>
              <div>Dealer Cost: ${car.dealerCost}</div>
              <div>Recommended: ${car.recommendedPrice}</div>
            </div>
            
            <div style={{ 
              position: 'absolute', 
              top: '0.5rem', 
              right: '0.5rem',
              backgroundColor: '#FFD700',
              color: '#000',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              +
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll indicators */}

    </div>
  );
};

export default EnhancedCarCarousel; 