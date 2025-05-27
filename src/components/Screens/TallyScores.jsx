import React from 'react';

import { scoreNegotiation } from '../Cars/ScoringLogic';

// 1. Buyer Persona: Susan Miles
const buyerProfile = {
  newOrUsedPreference: false,
  ideal_type: "van",
  budget: 15000,
  estimatedValue: 15000,
  preferredColor: "white",
  techDesire: "standard",
  safetyDesire: "medium",
  idealFeatures: ["standard radio"]  // matches the car
};

// 2. Car: Safehauler LX (a perfect match)
const salespersonCar = {
  name: "Safehauler LX",
  type: "van",
  newOrUsed: false,
  price: 15000,
  color: "white",
  techLevel: "standard",
  safetyLevel: "medium",
  features: ["standard radio"],
  dealerCost: 11361,
  mileage: 90000,
  isLemon: false,
  estimatedRepairCost: 0  // irrelevant since not a lemon
};

// 3. Negotiated Deal (no upsells)
const negotiatedDeal = {
  includes_maintenance: false,
  maintenanceLevel: null,
  coverage: 0, // lemon coverage irrelevant here
  upsoldPaint: false,
};


// const result = scoreNegotiation(salespersonCar, buyerProfile, negotiatedDeal);
// console.log("Buyer Score:", result.buyerPoints);
// console.log("Salesperson Score:", result.salespersonPoints);

const TallyScores = ({ yourPlayerId, game }) => {
  if (!yourPlayerId || !game || !game.matches || !game.matches[yourPlayerId]) {
    return <div>No matches found for this player.</div>;
  }
  
const result = scoreNegotiation(salespersonCar, buyerProfile, negotiatedDeal, game, yourPlayerId);
// console.log("Buyer Points:", result.buyerPoints);
// console.log("Salesperson Points:", result.salespersonPoints);


  const matches = game.matches[yourPlayerId];

  return (
    <div>
      <h2>Matches for Player {yourPlayerId}</h2>
      <ul>
        {matches.length === 0 ? (
          <li>No matches recorded yet.</li>
        ) : (
          matches.map((match, index) => (
            <li key={index}>{JSON.stringify(match)}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TallyScores;
