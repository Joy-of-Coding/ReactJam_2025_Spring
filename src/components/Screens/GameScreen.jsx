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
      <button className="end-button" onClick={onEndGame}>
        End Game
      </button>
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

      <WalkAwayButton />
      <SignTheContractButton />




    </div>
  );
};

export default GameScreen;
