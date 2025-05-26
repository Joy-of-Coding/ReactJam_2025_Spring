import React from 'react';

const SignTheContractButton = ({ yourPlayerId, game, contractDetails }) => {
  const buyerPlayer = Object.keys(game.roles).find(id => game.roles[id] === "Buyer");
  const sellerPlayer = Object.keys(game.roles).find(id => game.roles[id] === "Seller");
  
  const handleSignContract = () => {
    // Validate contract has necessary details
    if (!contractDetails || !contractDetails.car || !contractDetails.price) {
      alert("Contract is incomplete. Make sure a car and price are specified.");
      return;
    }
    
    // Only buyer can sign
    if (yourPlayerId !== buyerPlayer) {
      alert("Only the buyer can sign the contract.");
      return;
    }
    
    // Sign the contract
    Rune.actions.signContract({
      buyerId: buyerPlayer,
      sellerId: sellerPlayer,
      carDetails: contractDetails
    });
    
    // Show success message
    alert("Contract signed successfully!");
    
    // Update scores (optional)
    Rune.actions.updateScore({
      yourPlayerId: sellerPlayer,
      amount: Math.floor(parseInt(contractDetails.price, 10) * 0.1) // 10% commission
    });
  };
  
  return (
    <button 
      className="sign-contract-button"
      onClick={handleSignContract}
      disabled={yourPlayerId !== buyerPlayer}
      style={{
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        fontSize: '14px',
        cursor: yourPlayerId === buyerPlayer ? 'pointer' : 'not-allowed',
        opacity: yourPlayerId === buyerPlayer ? 1 : 0.6
      }}
    >
      Sign Contract
    </button>
  );
};

export default SignTheContractButton;