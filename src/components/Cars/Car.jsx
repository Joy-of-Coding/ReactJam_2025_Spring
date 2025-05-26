
const Car = ({ year, model, condition, mileage, price, features }) => {

    return (
        <div>
            <h2>Car</h2>
            <p>Model: {model}</p>
            <p>Year: {year}</p>
            <p>Condition: {condition}</p>
            <p>Mileage: {mileage}</p>
            <p>Price: ${price}</p>
            <p>Included Features: </p>
            <ul className="car-features-list">
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </div>
    )
}

export default Car