import React, { useEffect, useRef } from "react";
import "../styles/CarCarousel.css";

const CarCarousel = ({ cars, onSelect }) => {
  const trackRef = useRef(null);
  const fullList = [...cars.slice(-2), ...cars, ...cars.slice(0, 2)]; // Clone start & end
  const cardWidth = 160 + 24; // width + gap
  const scrollStart = cardWidth * 2;

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollLeft = scrollStart;
    }
  }, []);

  const handleScroll = () => {
    const scrollLeft = trackRef.current.scrollLeft;
    const totalWidth = cardWidth * (cars.length + 4);

    if (scrollLeft < cardWidth) {
      trackRef.current.scrollLeft = scrollLeft + cardWidth * cars.length;
    } else if (scrollLeft > totalWidth - cardWidth * 2) {
      trackRef.current.scrollLeft = scrollLeft - cardWidth * cars.length;
    }
  };

  return (
    <div className="carousel-outer">
      <div className="carousel-track" ref={trackRef} onScroll={handleScroll}>
        {fullList.map((car, idx) => (
          <div
            key={`${car.id}-${idx}`}
            className="car-card"
            onClick={() => onSelect(car)}
          >
            <div className="car-card-image">
              <img src={car.image} alt={car.name} />
            </div>
            <div className="car-card-content">
              <h3>{car.name}</h3>
              <p className="car-card-price">${car.basePrice.toLocaleString()}</p>
              <p className="car-card-details">
                {car.year} · {car.condition} · {car.fuelType}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCarousel;
