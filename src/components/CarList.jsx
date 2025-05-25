import React from 'react';
import carData from './CarInfo'; // Importing data from CarInfo

const CarList = () => {
  return (
    <div className="car-list">
      {carData.map((car, index) => (
        <div key={index} className="car-item">
          <div><strong>Make:</strong> {car.make}</div>
          <div><strong>Model:</strong> {car.model}</div>
        </div>
      ))}
    </div>
  );
};

export default CarList;