import React from "react";
import "../styles/CarCard.css";
import carData from "../../assets/cars_only_final_enriched.json"; // Uncomment if needed
const CarCard = ({ car, onSelect }) => {
  let clickCount = 0;
  let timer;

  const handleClick = () => {
    clickCount++;
    if (clickCount === 3) {
      onSelect(car);
      clickCount = 0;
    }
    clearTimeout(timer);
    timer = setTimeout(() => (clickCount = 0), 500);
  };

  return (
    <div className="car-card" onClick={handleClick} draggable onDragStart={(e) => e.dataTransfer.setData("car", JSON.stringify(car))}>
      <h4>{car.name}</h4>
      {/* <img src={car.picture ? require(`../../assets/img/${car.picture}`) : require('../../assets/img/${car.picture}')} alt={car.name} className="car-image" /> */}
      <img>{carData.car.picture ? `url(/src/assets/img/${car.picture})` : 'none'}</img>
      <p>{car.description}</p>
    </div>
  );
};

export default CarCard;
