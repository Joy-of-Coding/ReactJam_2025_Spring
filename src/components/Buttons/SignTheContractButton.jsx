import React from 'react';
import carPersonas from '../../assets/car_buyer_personas_final_enriched.json';

function SignTheContractButton ({yourPlayerId, game}) {
    const handleClick = () => {
      // Check if contract details are filled out
      if (!game.contractDetails.carName || !game.contractDetails.price) {
        alert("Contract is incomplete! Please make sure car and price are filled out.");
        return;
      }
      
      // Get player roles
      const buyerId = game.playerIds.find(id => game.roles[id] === "Buyer");
      const sellerId = game.playerIds.find(id => game.roles[id] === "Seller");
      
      if (!buyerId || !sellerId) {
        console.error("Missing buyer or seller");
        return;
      }
      
      // Get buyer's persona
      const buyerPersonaId = game.personas[buyerId];
      console.log("buyerPersonaId", buyerPersonaId);
      const buyerPersona = carPersonas.find(p => p.id === buyerPersonaId);
      console.log("buyerPersona", buyerPersona);
      
      if (!buyerPersona) {
        console.error("No buyer persona found - defaulting to seller win");
        // End game with seller win if no buyer persona is found
        Rune.actions.endGame({ result: "sellerWins" });
        Rune.actions.resetGame();
        return;
      }     
      
      // Get the selected car
      // We need to find the car from the contractDetails.carName
      const selectedCarName = game.contractDetails.carName;
      console.log("selectedCarName", selectedCarName);
      const selectedCar = carPersonas.find(p => p.name === selectedCarName);
      // const selectedCar = game.cars.find(car => car.name === selectedCarName);
      console.log("selectedCar", selectedCar);  

      if (!selectedCar) {
        console.error("Selected car not found:", selectedCarName);
        // End game with seller win if no car is found
        Rune.actions.endGame({ result: "sellerWins" });
        Rune.actions.resetGame();
        return;
      }
      console.log("buyerPersona", buyerPersona);
      console.log("selectedCar", selectedCar);
      console.log("game.contractDetails", game.contractDetails);
      console.log("We did it!!!");
      // Calculate match score
      const idealCar = buyerPersona.idealCar;
      let matchCount = 0;
      let matchItems = [];
      
      // Count matching attributes
      if (selectedCar.carType === idealCar.carType) {
        matchCount++; 
        matchItems.push('carType');
      }
      if (selectedCar.colorModel === idealCar.colorModel) {
        matchCount++; 
        matchItems.push('colorModel');
      }
      if (selectedCar.safety === idealCar.safety) {
        matchCount++; 
        matchItems.push('safety');
      }
      if (selectedCar.maintenanceExpenses === idealCar.maintenanceExpenses) {
        matchCount++; 
        matchItems.push('maintenanceExpenses');
      }
      if (selectedCar.techFeatures === idealCar.techFeatures) {
        matchCount++; 
        matchItems.push('techFeatures');
      }
      if (selectedCar.driveType === idealCar.driveType) {
        matchCount++; 
        matchItems.push('driveType');
      }
      if (selectedCar.gasMileage === idealCar.gasMileage) {
        matchCount++; 
        matchItems.push('gasMileage');
      }
      
      // Check budget match
      const price = parseInt(game.contractDetails.price);
      const budget = buyerPersona.profile.budgetAmount || 30000; // Default budget if not specified
      const isMidToLowBudget = price <= budget * 0.8; // Mid to low range = 80% or less of budget
      
      console.log("Contract signed with:");
      console.log("Contract details:", game.contractDetails);
      console.log("Match count:", matchCount);
      console.log("Matching items:", matchItems);
      console.log("Price:", price, "Budget:", budget, "Is mid-low budget:", isMidToLowBudget);
      
      // Determine winner: Buyer wins if 5+ matches AND mid-low budget range
      // Otherwise seller wins
      let buyerWins = matchCount >= 5 && isMidToLowBudget;
      
      // Call the endGame action with the appropriate result
      if (buyerWins) {
        console.log("Buyer wins! Perfect car match and good price.");
        Rune.actions.endGame({ result: "buyerWins" });
        Rune.actions.resetGame();
      } else {
        console.log("Seller wins! Car doesn't match buyer's ideal needs.");
        Rune.actions.endGame({ result: "sellerWins" });
        Rune.actions.resetGame();
      }
    }
    
  return (
    <button 
        onClick={handleClick}
        style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "0.3rem 0.6rem",
            fontSize: "0.8rem",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "background-color 0.2s",
            fontWeight: "bold"
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
    >
        Sign the contract!
    </button>
  )
}

export default SignTheContractButton