import React, { useEffect, useRef } from "react";
import "../styles/CarCarousel.css";

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

const CarCarousel = ({ cars, onSelect }) => {
  const trackRef = useRef(null);
  const fullList = [...cars.slice(-2), ...cars, ...cars.slice(0, 2)]; // Clone start & end
  const cardWidth = 160 + 24; // width + gap
  const scrollStart = cardWidth * 2;

  // Helper function to get the correct image source (for future use)
  const getCarImage = (pictureName) => {
    if (!pictureName) return null;
    return carImages[pictureName] || null;
  };

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
            {car.picture && (
              <div style={{
                height: '70px',
                backgroundImage: getCarImage(car.picture) ? `url(${getCarImage(car.picture)})` : 'none',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                marginBottom: '0.5rem'
              }} />
            )}
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
