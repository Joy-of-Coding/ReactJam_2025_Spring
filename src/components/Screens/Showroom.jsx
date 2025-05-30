import React, { useState } from "react";
import "../styles/StartScreen.css";
import BuyerChoice from "./BuyerChoice";
import DragAvatar from "../Drag/DragAvatar";
//import yellowtilesquares from "../../assets/img/yellowtilesquares.png";
import lobbyFloor from "../../assets/img/Lobby with 2 desks.png";
import Carscreentest from "./Carscreentest";

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
        <img src={lobbyFloor} alt="Lobby with 2 desks"  alignItems="center" height="200" width="100%"/>
        {/* Other components or elements */}
      </div>
      <DragAvatar yourPlayerId={yourPlayerId} game={game} />
      {game.roles[yourPlayerId] === "buyer" && (
        <BuyerChoice onEndChoice={onEndChoice} />
      )}
      {game.roles[yourPlayerId] === "seller" && (
        <SellerChoice onEndChoice={onEndChoice} />
      )}

      <Carscreentest />
    </>
  );
};
export default Showroom;
