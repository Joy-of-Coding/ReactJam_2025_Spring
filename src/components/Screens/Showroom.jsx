import React from "react";
import SellerDesk from "../Buttons/SellerDesk";
import ThinkingBuyer from "../Buttons/ThinkingBuyer";
import "../styles/StartScreen.css";
import "../styles/Showroom.css";


// import bg from '../assets/bg.jpg';

const Showroom = () => {
  const sellerDesks = Array(5).fill(null); // Array for 5 seller desks
  const buyers = Array(5).fill(null); // Array for 5 buyer placeholders

  return (
    <div className="showroom-container">
      <div className="buyers-container">
        {buyers.map((_, index) => (
          <div key={index} className="buyer-placeholder">
            <ThinkingBuyer />
          </div>
        ))}
      </div>
      <div className="sellers-container">
        {sellerDesks.map((_, index) => (
          <SellerDesk key={index} />
        ))}
      </div>
    </div>
  );
};

export default Showroom;
