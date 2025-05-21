import React from 'react';
import "../styles/GameScreen.css"
import Buyer from "../Buyer.jsx";
import Salesperson from "../Salesperson.jsx";
import Car from "../Car.jsx";
import CarList from "../CarList.jsx";
import WalkAwayButton from "../Buttons/WalkAwayButton.jsx";
import SignTheContractButton from "../Buttons/SignTheContractButton.jsx";


const GameScreen = ({ onEndGame }) => {
  return (
    <div className="game-screen">
      <h2>The game has started!</h2>
      
      <>
      <Salesperson />
      <Buyer />
      </>
      {/* <Car
        year={1982}
        model={"DeLorean"}
        condition={"Used"}
        mileage={185000}
        price={39999.99}
        features={["Gull-Wing Doors", "Apple Carplay", "LED Headlights"]}
      />
       */}

      <CarList />

      {/* Beginning contract component */}
      {/* Spits and Features component */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span style={{ fontWeight: "bold" }}>Splits and Features:</span>
          <input type="text" placeholder="Splits and Features textbox!" />
        </div>
      
      {/* Price component */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <label htmlFor="price-input" style={{ fontWeight: "bold" }}>Price:</label>
          <input id="price-input" type="text" placeholder="Enter your price" />
        </div> 
  
      {/* Buyer buying component */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span style={{ fontWeight: "bold" }}>Buyer:</span>
          <WalkAwayButton />
          <SignTheContractButton />
        </div>


      {/* End game button */}

       

      <button className="end-button" onClick={onEndGame}>
        End Game
      </button>
    </div>
  );
};

export default GameScreen;
