import React, { useEffect, useRef } from "react";
import "../styles/CarCarousel.css";

const CarCarousel = ({ cars, onSelect }) => {
  const trackRef = useRef(null);
  const fullList = [...cars.slice(-2), ...cars, ...cars.slice(0, 2)]; // Clone start & end
  const cardWidth = 120 + 24; // width + gap
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
            key={`${car.name}-${idx}`}
            className="car-card"
            onClick={() => onSelect(car)}
          >
            <p>{car.name}</p>
            <p style={{ fontSize: "0.8rem" }}>{car.description}</p>
            <p style={{ fontSize: "0.7rem", color: "#888" }}>
              Ideal Owner: {car.owner}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCarousel;
