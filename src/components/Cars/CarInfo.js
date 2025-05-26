// Car component with a list of car objects
const cars = [
  { 
    id: 1,
    name: "Leafluxe Eco",
    make: "Leafluxe",
    model: "Eco",
    year: 2023,
    condition: "New",
    mileage: 15,
    basePrice: 28500,
    fuelType: "Electric",
    image: "/src/assets/img/leafluxe_eco.svg",
    description: "Eco-friendly electric car with modern features and low energy consumption."
  },
  { 
    id: 2,
    name: "Red Comet ZR",
    make: "Comet",
    model: "ZR",
    year: 2022,
    condition: "New",
    mileage: 200,
    basePrice: 42000,
    fuelType: "Gasoline",
    image: "/src/assets/img/red_comet_zr.svg",
    description: "Sporty coupe with aggressive styling and excellent handling."
  },
  { 
    id: 3,
    name: "GruntXL V8",
    make: "Grunt",
    model: "XL V8",
    year: 2023,
    condition: "New",
    mileage: 50,
    basePrice: 52000,
    fuelType: "Diesel",
    image: "/src/assets/img/gruntxl_v8.svg",
    description: "Powerful SUV with off-road capabilities and spacious interior."
  },
  { 
    id: 4,
    name: "White Coupe",
    make: "Grand",
    model: "Coupe",
    year: 2021,
    condition: "Used",
    mileage: 15000,
    basePrice: 22000,
    fuelType: "Gasoline",
    image: "/src/assets/img/white_coupe.svg",
    description: "Elegant coupe with smooth lines and comfortable interior."
  },
  { 
    id: 5,
    name: "Family SUV",
    make: "Family",
    model: "SUV",
    year: 2022,
    condition: "New",
    mileage: 100,
    basePrice: 32000,
    fuelType: "Hybrid",
    image: "/src/assets/img/suv.svg",
    description: "Practical family SUV with excellent safety features and fuel efficiency."
  },
  { 
    id: 6,
    name: "Transport Van",
    make: "Transit",
    model: "Van",
    year: 2020,
    condition: "Used",
    mileage: 25000,
    basePrice: 18000,
    fuelType: "Diesel",
    image: "/src/assets/img/van.svg",
    description: "Spacious van perfect for transport or conversion to a camper."
  },
  { 
    id: 7,
    name: "Spark Mini",
    make: "Spark",
    model: "Mini",
    year: 2023,
    condition: "New",
    mileage: 10,
    basePrice: 16500,
    fuelType: "Gasoline",
    image: "/src/assets/img/spark.svg",
    description: "Compact city car with excellent maneuverability and parking ease."
  },
  { 
    id: 8,
    name: "Sports Racer",
    make: "Velocity",
    model: "Racer",
    year: 2022,
    condition: "New",
    mileage: 500,
    basePrice: 65000,
    fuelType: "Gasoline",
    image: "/src/assets/img/sports_car.svg",
    description: "High-performance sports car with stunning design and powerful engine."
  },
  { 
    id: 9,
    name: "Green Bullet MK2",
    make: "Bullet",
    model: "MK2",
    year: 2021,
    condition: "Used",
    mileage: 8000,
    basePrice: 35000,
    fuelType: "Hybrid",
    image: "/src/assets/img/green_bullet_mk2.svg",
    description: "Sporty hybrid with impressive performance and good fuel economy."
  },
  { 
    id: 10,
    name: "Dream Streamer",
    make: "Dream",
    model: "Streamer",
    year: 2023,
    condition: "New",
    mileage: 25,
    basePrice: 85000,
    fuelType: "Electric",
    image: "/src/assets/img/dreamstreamer.svg",
    description: "Luxury electric vehicle with cutting-edge technology and premium comfort."
  }
];

export default cars;

// { model: 'Toyota Camry', make: 'Toyota', year: 2020, condition: 'New', mileage: 5000, price: 20000 },
// { model: 'Honda Accord', make: 'Honda', year: 2019, condition: 'Used', mileage: 30000, price: 15000 },
