import React, { useState, useEffect } from 'react';
import "../styles/NegotiationScreen.css";
import Buyer from "../Buyer.jsx";
import Salesperson from "../Salesperson.jsx";
import WalkAwayButton from "../Buttons/WalkAwayButton.jsx";
import SignTheContractButton from "../Buttons/SignTheContractButton.jsx";

const NegotiationScreen = ({ offNegotiation, yourPlayerId, game }) => {
  const [price, setPrice] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [spiffs, setSpiffs] = useState('');
  
  // Find buyer and seller involved in negotiation
  const buyerPlayer = Object.keys(game.roles).find(id => game.roles[id] === "Buyer");
  const sellerPlayer = Object.keys(game.roles).find(id => game.roles[id] === "Seller");
  
  const buyerName = Rune.getPlayerInfo(buyerPlayer)?.displayName || "Buyer";
  const sellerName = Rune.getPlayerInfo(sellerPlayer)?.displayName || "Seller";
  
  const buyerPersona = game.personas[buyerPlayer] || { nickName: "Unknown Buyer" };
  const sellerCars = game.sellerCars ? game.sellerCars[sellerPlayer] : [];
  
  const isYouBuyer = yourPlayerId === buyerPlayer;
  const isYouSeller = yourPlayerId === sellerPlayer;

  // Get car images based on the car name
  const getCarImage = (carName) => {
    const carNameLower = carName?.toLowerCase() || "";
    
    if (carNameLower.includes("suv")) return "/src/assets/img/suv.svg";
    if (carNameLower.includes("van")) return "/src/assets/img/van.svg";
    if (carNameLower.includes("coupe")) return "/src/assets/img/white_coupe.svg";
    if (carNameLower.includes("sports")) return "/src/assets/img/sports_car.svg";
    if (carNameLower.includes("eco")) return "/src/assets/img/leafluxe_eco.svg";
    if (carNameLower.includes("comet")) return "/src/assets/img/red_comet_zr.svg";
    if (carNameLower.includes("grunt")) return "/src/assets/img/gruntxl_v8.svg";
    if (carNameLower.includes("bullet")) return "/src/assets/img/green_bullet_mk2.svg";
    if (carNameLower.includes("dream")) return "/src/assets/img/dreamstreamer.svg";
    
    // Default image if no match
    return "/src/assets/img/white_coupe.svg";
  };

  return (
    <div className="negotiation-screen">
      <div className="desk-background">
        {/* Top Bar with Names */}
        <div className="top-bar">
          {/* Buyer's phone */}
          <div className="buyer-phone">
            <div className="phone-screen">
              <div className="phone-content">
                <span className="phone-name">{buyerName}</span>
                <span className="phone-role">{buyerPersona.nickName}</span>
              </div>
            </div>
          </div>
          
          {/* Seller's nameplate */}
          <div className="seller-nameplate">
            <span className="nameplate-name">{sellerName}</span>
            <span className="nameplate-role">Salesperson</span>
          </div>
        </div>
        
        {/* Secret Details Section */}
        <div className="secret-details">
          {isYouBuyer && (
            <div className="buyer-details">
              <h4>Your Secret Details</h4>
              <p>{buyerPersona.description}</p>
              <p><strong>Budget:</strong> {buyerPersona.budget}</p>
              <p><strong>Ideal Car:</strong> {buyerPersona.idealCar?.name}</p>
            </div>
          )}
          
          {isYouSeller && (
            <div className="seller-details">
              <h4>Your Secret Details</h4>
              <p><strong>Goal:</strong> Sell cars for the highest price possible</p>
              <p><strong>Commission:</strong> 10% of sale price</p>
            </div>
          )}
        </div>
        
        {/* Car List Section */}
        <div className="car-list-section">
          <h3>Available Cars</h3>
          <div className="car-list">
            {sellerCars && sellerCars.length > 0 ? (
              sellerCars.map((car, index) => (
                <div 
                  key={index} 
                  className={`car-item ${selectedCar === car.name ? 'selected' : ''}`}
                  onClick={() => setSelectedCar(car.name)}
                >
                  <div className="car-image">
                    <img src={getCarImage(car.name)} alt={car.name} />
                  </div>
                  <div className="car-details">
                    <h4>{car.name}</h4>
                    <p>{car.description}</p>
                    <p className="car-price">Price: ${car.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-cars">
                <p>No cars available from this seller</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Contract Section */}
        <div className="contract-section">
          <div className="paper-contract">
            <h3>Sales Contract</h3>
            
            <div className="contract-field">
              <label>Selected Car:</label>
              <input 
                type="text" 
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                disabled={!isYouSeller}
                placeholder="Enter car name"
              />
            </div>
            
            <div className="contract-field">
              <label>Price:</label>
              <input 
                type="text" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={!isYouSeller}
                placeholder="Enter price"
              />
            </div>
            
            <div className="contract-field">
              <label>Additional Features:</label>
              <textarea 
                value={spiffs}
                onChange={(e) => setSpiffs(e.target.value)}
                disabled={!isYouSeller}
                placeholder="List additional features, warranties, etc."
              />
            </div>
            
            <div className="contract-signatures">
              <div className="seller-signature">
                <span>Seller: {sellerName}</span>
              </div>
              
              <div className="buyer-actions">
                <span>Buyer: {buyerName}</span>
                {isYouBuyer && (
                  <div className="buyer-buttons">
                    <WalkAwayButton playerId={yourPlayerId} />
                    <SignTheContractButton 
                      yourPlayerId={yourPlayerId} 
                      game={game} 
                      contractDetails={{
                        car: selectedCar,
                        price: price,
                        spiffs: spiffs
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Exit Button */}
        <button className="exit-button" onClick={offNegotiation}>
          Back to Showroom
        </button>
      </div>
    </div>
  );
};

export default NegotiationScreen;