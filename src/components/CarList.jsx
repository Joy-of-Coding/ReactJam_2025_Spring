
import carData from './CarInfo'; // Importing data from CarInfo

const CarList = () => {
    return (
        <ul className="car-features-list">
            {carData.map((car, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                    <div><strong>Make:</strong> {car.make}</div>
                    <div><strong>Model:</strong> {car.model}</div>
                </li>
            ))}
        </ul>
    );
};

export default CarList;

// - {car.year} - {car.condition} - {car.mileage} miles - ${car.price}