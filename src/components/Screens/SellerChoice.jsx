import React, { useState } from "react";
import carData from "../../assets/car_buyer_personas_final_enriched.json";
import EnhancedCarCarousel from "../Cars/EnhancedCarCarousel";
import "../styles/StartScreen.css";

const SellerChoice = ({ onEndChoice, yourPlayerId, game }) => {
  const player = Rune.getPlayerInfo(yourPlayerId);
  const [slots, setSlots] = useState([null, null, null]);
  const [prices, setPrices] = useState([null, null, null]);

  const handleSelect = (car) => {
    const next = slots.findIndex(s => s === null);
    if (next !== -1) {
      // Add the car to the next available slot
      const updatedSlots = [...slots];
      updatedSlots[next] = car;
      setSlots(updatedSlots);
      
      // Set the recommended price (15% above dealer cost)
      const updatedPrices = [...prices];
      updatedPrices[next] = Math.round(car.dealerCost * 1.15);
      setPrices(updatedPrices);
    }
  };

  const handlePriceChange = (i, value) => {
    const updatedPrices = [...prices];
    updatedPrices[i] = value;
    setPrices(updatedPrices);
  };

  const handleConfirm = () => {
    // Assign the role
    Rune.actions.assignRole("Seller");
    
    // Save the selected cars with their prices
    const selectedCars = slots.map((car, index) => ({
      ...car,
      price: prices[index]
    }));
    
    // Save to game state
    Rune.actions.saveSellerCars({ cars: selectedCars });
    
    // Continue to next screen
    onEndChoice();
  };

  const handleRemoveCar = (index) => {
    const updatedSlots = [...slots];
    const updatedPrices = [...prices];
    updatedSlots[index] = null;
    updatedPrices[index] = null;
    setSlots(updatedSlots);
    setPrices(updatedPrices);
  };

  const idealCars = carData.map(p => ({ ...p.idealCar, owner: p.nickName }));

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
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>{player?.displayName}</h2>
        <h3 style={{ fontSize: "1rem", margin: "0.3rem 0", color: "#1565C0" }}>Choose 3 Cars to Sell</h3>
      </div>
      
      {/* Top: Selected Cars */}
      <div style={{
        flex: "1 0 auto",
        maxWidth: "768px",
        margin: "0 auto",
        width: "100%"
      }}>
        <div className="car-sale-slots" style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "1rem"
        }}>
          {slots.map((car, idx) => (
            <div key={idx} className="car-slot" style={{
              border: car ? "1px solid #45a049" : "2px dashed #aaa",
              padding: "0.75rem",
              backgroundColor: car ? "#f0f8ff" : "#f9f9f9",
              borderRadius: "8px",
              width: "30%",
              minWidth: "140px",
              maxWidth: "180px",
              boxSizing: "border-box",
              boxShadow: car ? "0 2px 5px rgba(0,0,0,0.1)" : "none",
              position: "relative"
            }}>
              {car ? (
                <>
                  {/* Remove button */}
                  <button 
                    onClick={() => handleRemoveCar(idx)} 
                    style={{
                      position: "absolute",
                      top: "0.25rem",
                      right: "0.25rem",
                      background: "none",
                      border: "none",
                      color: "#ff6b6b",
                      fontSize: "1rem",
                      cursor: "pointer",
                      padding: "0.25rem",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "24px",
                      height: "24px"
                    }}
                  >
                    ×
                  </button>
                  
                  {/* Car Image */}
                  <div style={{ 
                    height: "60px", 
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                    marginBottom: "0.5rem",
                    backgroundImage: car.picture ? `url(/src/assets/img/${car.picture})` : 'none',
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }} />
                  
                  <h4 style={{ 
                    fontSize: "0.85rem", 
                    margin: "0 0 0.5rem 0",
                    color: "#1565C0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {car.name}
                  </h4>
                  
                  <div style={{ fontSize: "0.7rem", marginBottom: "0.5rem" }}>
                    <div>Cost: ${car.dealerCost}</div>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      border: "1px solid #ccc", 
                      borderRadius: "4px", 
                      overflow: "hidden" 
                    }}>
                      <button 
                        onClick={() => handlePriceChange(idx, Math.max(car.dealerCost, prices[idx] - 500))}
                        style={{
                          border: "none",
                          background: "#f0f0f0",
                          padding: "0.2rem 0.5rem",
                          cursor: "pointer",
                          borderRight: "1px solid #ccc"
                        }}
                      >
                        -
                      </button>
                      
                      <input
                        type="number"
                        value={prices[idx] || ""}
                        placeholder="Price"
                        onChange={(e) => handlePriceChange(idx, parseInt(e.target.value) || 0)}
                        style={{ 
                          width: "70px", 
                          textAlign: "center",
                          border: "none",
                          padding: "0.2rem 0",
                          fontSize: "0.8rem"
                        }}
                      />
                      
                      <button 
                        onClick={() => handlePriceChange(idx, prices[idx] + 500)}
                        style={{
                          border: "none",
                          background: "#f0f0f0",
                          padding: "0.2rem 0.5rem",
                          cursor: "pointer",
                          borderLeft: "1px solid #ccc"
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center", 
                  alignItems: "center",
                  padding: "1rem 0",
                  color: "#aaa"
                }}>
                  <span style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>+</span>
                  <span style={{ fontSize: "0.8rem" }}>Select a car</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Middle: Car Carousel */}
      <div style={{
        flex: "1 0 auto",
        maxHeight: "40%"
      }}>
        <EnhancedCarCarousel cars={idealCars} onSelect={handleSelect} />
      </div>

      {/* Bottom: Confirm Button */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem",
        marginTop: "auto"
      }}>
        <button
          className="start-button"
          onClick={handleConfirm}
          disabled={slots.includes(null) || prices.some(p => !p)}
          style={{
            backgroundColor: slots.includes(null) || prices.some(p => !p) ? "#cccccc" : "#45a049",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: slots.includes(null) || prices.some(p => !p) ? "not-allowed" : "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
          }}
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
};

export default SellerChoice;
