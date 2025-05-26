import React, { useState } from "react";
import carData from "../Cars/CarInfo";
import CarCarousel from "../Cars/CarCarousel";
import "../styles/StartScreen.css";

const SellerChoice = ({ onEndChoice, yourPlayerId, game }) => {
  const player = Rune.getPlayerInfo(yourPlayerId);
  const [slots, setSlots] = useState([null, null, null]);
  const [prices, setPrices] = useState(["", "", ""]);

  const handleSelect = (car) => {
    const next = slots.findIndex(s => s === null);
    if (next !== -1) {
      const updated = [...slots];
      updated[next] = car;
      setSlots(updated);
    }
  };

  const handlePriceChange = (i, value) => {
    const updated = [...prices];
    updated[i] = value;
    setPrices(updated);
  };

  const handleConfirm = () => {
    // Assign the seller role
    Rune.actions.assignRole("Seller");
    
    // Save the selected cars and prices
    Rune.actions.updateSellerCars({
      cars: slots,
      prices: prices.map(p => parseInt(p, 10) || 0)
    });
    
    // Proceed to the next screen
    onEndChoice();
  };

  // Use our predefined car data
  const availableCars = carData;

  return (
    <div className="seller-choice-wrapper" style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      padding: "0.5rem",
      boxSizing: "border-box",
      overflow: "hidden"
    }}>
      
      {/* Top 2/3: Car Sale Slots */}
      <div style={{
        flexBasis: "66%",
        overflowY: "auto",
        maxWidth: "768px",
        margin: "0 auto",
        width: "100%"
      }}>
        <h2>{player?.displayName}</h2>
        <h3>Choose the cars you want to sell</h3>

        <div className="car-sale-slots" style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "1rem"
        }}>
          {slots.map((car, idx) => (
            <div key={idx} className="car-slot" style={{
              border: "2px dashed #aaa",
              padding: "1rem",
              width: "30%",
              minWidth: "140px",
              maxWidth: "180px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              {car ? (
                <>
                  <div style={{ height: "80px", marginBottom: "10px" }}>
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </div>
                  <strong>{car.name}</strong>
                  <p style={{ fontSize: "0.8rem", margin: "5px 0" }}>
                    Base: ${car.basePrice}
                  </p>
                  <input
                    type="number"
                    value={prices[idx]}
                    placeholder="Your Price"
                    onChange={(e) => handlePriceChange(idx, e.target.value)}
                    style={{ width: "100%", marginTop: "0.5rem" }}
                  />
                </>
              ) : (
                <em>Select a car</em>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Middle 5/6: Carousel */}
      <div style={{
        flexBasis: "25%",
        minHeight: "25%",
        overflow: "hidden",
        maxWidth: "100vw"
      }}>
        <CarCarousel cars={availableCars} onSelect={handleSelect} />
      </div>

      {/* Bottom 1/6: Confirm Button */}
      <div style={{
        flexBasis: "9%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem",
        width: "100%"
      }}>
        <button
          className="start-button"
          onClick={handleConfirm}
          disabled={slots.includes(null) || prices.some(p => !p)}
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
};

export default SellerChoice;
