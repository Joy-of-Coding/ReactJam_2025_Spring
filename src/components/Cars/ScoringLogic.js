// scoringLogic.js

export function scoreNegotiation(salespersonCar, buyerProfile, negotiatedDeal) {
  let buyerPoints = 0;
  let salespersonPoints = 0;
  const buyerMatchReasons = [];
  const sellerMatchReasons = [];

  // 1. Car Type Match
  if (salespersonCar.carType === buyerProfile.carType) {
    buyerPoints += 10;
    salespersonPoints += 20;
    buyerMatchReasons.push("Car Type Match");
    sellerMatchReasons.push("Car Type Match");
  }

  // 2. New/Used Match
  if (salespersonCar.newOrUsed === buyerProfile.newOrUsedPreference) {
    buyerPoints += 10;
    salespersonPoints += 10;
    buyerMatchReasons.push("New/Used Match");
    sellerMatchReasons.push("New/Used Match");
  }

  // 3. Budget Match
  if (negotiatedDeal.price < buyerProfile.budgetAmount) {
    buyerPoints += 20; // VERY happy
    buyerMatchReasons.push("Buyer Under Budget");
  } else if (negotiatedDeal.price === buyerProfile.budgetAmount) {
    buyerPoints += 10; // a little happy
    buyerMatchReasons.push("Buyer At Budget");
  } else {
    console.log(negotiatedDeal.price);
    console.log(buyerProfile.budgetAmount);
    buyerPoints -= 10; // over budget
    buyerMatchReasons.push("Buyer Over Budget");
  }

  // Seller Price Comparison
  if (negotiatedDeal.price < salespersonCar.dealerCost) {
    salespersonPoints -= 10; // sold below cost
    sellerMatchReasons.push("Seller Below Dealer Cost");
  } else if (negotiatedDeal.price <= salespersonCar.dealerCost * 1.04) {
    salespersonPoints += 10; // fair price
    sellerMatchReasons.push("Seller Near Dealer Cost");
  } else if (negotiatedDeal.price === buyerProfile.estimatedValue) {
    salespersonPoints += 20; // very happy
    sellerMatchReasons.push("Seller At Estimated Price");
  }

  //   // 3a. Feature Matches
  //   buyerProfile.idealFeatures.forEach((feature) => {
  //     if (salespersonCar.features.includes(feature)) {
  //       buyerPoints += 10;
  //       buyerMatchReasons.push(`Feature Match: ${feature}`);
  //     }
  //   });

  // 4. Color
  if (salespersonCar.colorModel === buyerProfile.colorModel) {
    buyerPoints += 10;
    buyerMatchReasons.push("Color Match");
  }
  if (negotiatedDeal.upsoldPaint) {
    salespersonPoints += 20;
    sellerMatchReasons.push("Paint Upsell");
  }

  // 5. Tech Desire
  if (salespersonCar.techLevel === buyerProfile.techLevel) {
    buyerPoints += 20;
    buyerMatchReasons.push("Tech Level Match");
  } else {
    const upsell = getUpsellPoints(
      salespersonCar.techLevel,
      buyerProfile.techDesire,
    );
    salespersonPoints += upsell * 10;
    if (upsell > 0) sellerMatchReasons.push("Tech Upsell");
  }

  // 6. Safety
  if (salespersonCar.safety === buyerProfile.safety) {
    buyerPoints += 20;
    buyerMatchReasons.push("Safety Match");
  } else {
    const upsell = getUpsellPoints(
      salespersonCar.safetyLevel,
      buyerProfile.safetyDesire,
    );
    salespersonPoints += upsell * 10;
    if (upsell > 0) sellerMatchReasons.push("Safety Upsell");
  }

//   // 7. Maintenance Package
//   if ("maint" in negotiatedDeal.spiffs) {
//     salespersonPoints +=
//       ConversionPoints(negotiatedDeal.maintUp) * 10;
//     sellerMatchReasons.push("Maintenance Upsell");
//   }

  // 8. Price Buckets
  const priceBucket = getPriceBucketPoints(
    negotiatedDeal.price,
    salespersonCar.dealerCost,
    buyerProfile.budgetAmount,
  );
  buyerPoints += priceBucket.buyer * 10;
  salespersonPoints += priceBucket.salesperson * 10;

//   // 9. Mileage Buckets
//   const mileageBucket = getMileageBucketPoints(salespersonCar.mileage);
//   buyerPoints += mileageBucket.buyer * 10;
//   salespersonPoints += mileageBucket.salesperson * 10;

  // 10. Lemon Check
  if (
    !negotiatedDeal.lemonInsurance && 
    ConversionPoints(negotiatedDeal.mainUp) < ConversionPoints(salespersonCar.maintenanceExpences) 
    && Math.floor(Math.random() * 6) + 1 === 4
  ) {
    buyerPoints -= 50; // constant penalty
    buyerMatchReasons.push("Lemon with Inadequate Coverage");
  }

  function getUpsellPoints(actualLevel, desiredLevel) {
    const levels = ["low", "medium", "high"];
    const diff = levels.indexOf(actualLevel) - levels.indexOf(desiredLevel);
    return Math.max(0, diff);
  }

  function ConversionPoints(level) {
    const points = {
      low: 1,
      medium: 2,
      high: 3,
    };
    return points[level] || 0;
  }

  function getPriceBucketPoints(price, dealerCost, estimatedValue) {
    const percentageDiff = (price - dealerCost) / dealerCost;

    if (price < dealerCost || percentageDiff <= 0.04) {
      return { buyer: 5, salesperson: 0 };
    } else if (percentageDiff <= 0.05 && price < estimatedValue) {
      return { buyer: 4, salesperson: 1 };
    } else if (percentageDiff <= 0.1 && price < estimatedValue) {
      return { buyer: 3, salesperson: 2 };
    } else if (Math.abs(percentageDiff) <= 0.01) {
      return { buyer: 1, salesperson: 4 };
    } else {
      return { buyer: 0, salesperson: 5 };
    }
  }

//   function getMileageBucketPoints(mileage) {
//     if (mileage <= 100000) {
//       return { buyer: 3, salesperson: 2 };
//     } else if (mileage <= 175000) {
//       return { buyer: 2, salesperson: 3 };
//     } else if (mileage <= 250000) {
//       return { buyer: 1, salesperson: 4 };
//     } else {
//       return { buyer: 0, salesperson: 5 };
//     }
//   }

  return {
    buyerPoints,
    salespersonPoints,
    buyerMatchReasons,
    sellerMatchReasons
  };
}
