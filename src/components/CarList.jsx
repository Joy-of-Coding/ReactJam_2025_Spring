
// import carData from './CarInfo'; // Importing data from CarInfo
import React from "react";
const CarList = ({cars, seller}) => {
    return (
      <div >
          <ul>
        {/*<ul className="car-features-list">*/}
            {cars.map((car, i) =>
              <div className="car-info-box compact" key={i}>
                  <li><strong>Make:</strong> {car.make}</li>
                  <li><strong>Model:</strong> {car.model}</li>
                  {seller &&
                    <li><strong>List Price:</strong> {car.price}</li>
                  }
              </div>
            )}
          </ul>
      </div>
    );
};

export default CarList;

// - {car.year} - {car.condition} - {car.mileage} miles - ${car.price}