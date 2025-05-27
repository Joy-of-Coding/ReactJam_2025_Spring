// scoringLogic.js

export function scoreNegotiation(salespersonCar, buyerProfile, negotiatedDeal) {
  let buyerPoints = 0;
  let salespersonPoints = 0;
  const matchReasons = [];

  // 1. Car Type Match
  if (salespersonCar.type === buyerProfile.ideal_type) {
    buyerPoints += 10;
    salespersonPoints += 20;
    matchReasons.push("Car Type Match");
  }

  // 2. New/Used Match
  if (salespersonCar.newOrUsed === buyerProfile.newOrUsedPreference) {
    buyerPoints += 10;
    salespersonPoints += 10;
    matchReasons.push("New/Used Match");
  }

  // 3. Budget Match
  if (salespersonCar.price < buyerProfile.budget) {
    buyerPoints += 20; // VERY happy
    matchReasons.push("Buyer Under Budget");
  } else if (salespersonCar.price === buyerProfile.budget) {
    buyerPoints += 10; // a little happy
    matchReasons.push("Buyer At Budget");
  } else {
    buyerPoints -= 10; // over budget
    matchReasons.push("Buyer Over Budget");
  }

  // Seller Price Comparison
  if (salespersonCar.price < salespersonCar.dealerCost) {
    salespersonPoints -= 10; // sold below cost
    matchReasons.push("Seller Below Dealer Cost");
  } else if (salespersonCar.price <= salespersonCar.dealerCost * 1.04) {
    salespersonPoints += 10; // fair price
    matchReasons.push("Seller Near Dealer Cost");
  } else if (salespersonCar.price === buyerProfile.estimatedValue) {
    salespersonPoints += 20; // very happy
    matchReasons.push("Seller At Estimated Price");
  }

  // 3a. Feature Matches
  buyerProfile.idealFeatures.forEach((feature) => {
    if (salespersonCar.features.includes(feature)) {
      buyerPoints += 10;
      matchReasons.push(`Feature Match: ${feature}`);
    }
  });

  // 4. Color
  if (salespersonCar.color === buyerProfile.preferredColor) {
    buyerPoints += 10;
    matchReasons.push("Color Match");
  }
  if (negotiatedDeal.upsoldPaint) {
    salespersonPoints += 20;
    matchReasons.push("Paint Upsell");
  }

  // 5. Tech Desire
  if (salespersonCar.techLevel === buyerProfile.techDesire) {
    buyerPoints += 20;
    matchReasons.push("Tech Level Match");
  } else {
    const upsell = getUpsellPoints(salespersonCar.techLevel, buyerProfile.techDesire);
    salespersonPoints += upsell * 10;
    if (upsell > 0) matchReasons.push("Tech Upsell");
  }

  // 6. Safety
  if (salespersonCar.safetyLevel === buyerProfile.safetyDesire) {
    buyerPoints += 20;
    matchReasons.push("Safety Match");
  } else {
    const upsell = getUpsellPoints(salespersonCar.safetyLevel, buyerProfile.safetyDesire);
    salespersonPoints += upsell * 10;
    if (upsell > 0) matchReasons.push("Safety Upsell");
  }

  // 7. Maintenance Package
  if (negotiatedDeal.maintenanceLevel) {
    salespersonPoints += getMaintenanceUpsellPoints(negotiatedDeal.maintenanceLevel) * 10;
    matchReasons.push("Maintenance Upsell");
  }

  // 8. Price Buckets
  const priceBucket = getPriceBucketPoints(salespersonCar.price, salespersonCar.dealerCost, buyerProfile.estimatedValue);
  buyerPoints += priceBucket.buyer * 10;
  salespersonPoints += priceBucket.salesperson * 10;

  // 9. Mileage Buckets
  const mileageBucket = getMileageBucketPoints(salespersonCar.mileage);
  buyerPoints += mileageBucket.buyer * 10;
  salespersonPoints += mileageBucket.salesperson * 10;

  // 10. Lemon Check
  if (salespersonCar.isLemon && negotiatedDeal.coverage < salespersonCar.estimatedRepairCost) {
    buyerPoints -= 50; // constant penalty
    matchReasons.push("Lemon with Inadequate Coverage");
  }

function getUpsellPoints(actualLevel, desiredLevel) {
  const levels = ["low", "medium", "high"];
  const diff = levels.indexOf(actualLevel) - levels.indexOf(desiredLevel);
  return Math.max(0, diff);
}

function getMaintenanceUpsellPoints(level) {
  const points = {
    low: 1,
    medium: 2,
    high: 3
  };
  return points[level] || 0;
}

function getPriceBucketPoints(price, dealerCost, estimatedValue) {
  const percentageDiff = (price - dealerCost) / dealerCost;

  if (price < dealerCost || percentageDiff <= 0.04) {
    return { buyer: 5, salesperson: 0 };
  } else if (percentageDiff <= 0.05 && price < estimatedValue) {
    return { buyer: 4, salesperson: 1 };
  } else if (percentageDiff <= 0.10 && price < estimatedValue) {
    return { buyer: 3, salesperson: 2 };
  } else if (Math.abs(percentageDiff) <= 0.01) {
    return { buyer: 1, salesperson: 4 };
  } else {
    return { buyer: 0, salesperson: 5 };
  }
}

function getMileageBucketPoints(mileage) {
  if (mileage <= 100000) {
    return { buyer: 3, salesperson: 2 };
  } else if (mileage <= 175000) {
    return { buyer: 2, salesperson: 3 };
  } else if (mileage <= 250000) {
    return { buyer: 1, salesperson: 4 };
  } else {
    return { buyer: 0, salesperson: 5 };
  }
};

  return {
    buyerPoints,
    salespersonPoints,
    matchReasons
  };
}
