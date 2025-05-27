import React, { useState } from "react";
import "../styles/StartScreen.css";
import BuyerChoice from "./BuyerChoice";
import DragAvatar from "../Drag/DragAvatar";
import yellowtilesquares from "../../assets/img/lobby with 2 desks.png";

// import bg from '../assets/bg.jpg';

const Showroom = ({
  onEndChoice,
  onEndGame,
  onNegotiation,
  yourPlayerId,
  game,
}) => {
  return (
    <>
      <div>
        <img src={yellowtilesquares} alt="Yellow Tile Floor" />
        {/* Other components or elements */}
      </div>
      <DragAvatar yourPlayerId={yourPlayerId} game={game} />
      {game.roles[yourPlayerId] === "buyer" && (
        <BuyerChoice onEndChoice={onEndChoice} />
      )}
      {game.roles[yourPlayerId] === "seller" && (
        <SellerChoice onEndChoice={onEndChoice} />
      )}
    </>
  );
};
export default Showroom;
