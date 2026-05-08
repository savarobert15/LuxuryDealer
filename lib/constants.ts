export const brands = [
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Porsche",
  "Ferrari",
  "Lamborghini",
  "Bentley",
  "Rolls-Royce",
  "Maserati",
  "Jaguar",
  "Land Rover",
  "Lexus",
  "Volvo",
  "Tesla",
  "Volkswagen",
] as const;

export const fuelTypes = [
  "Benzină",
  "Diesel",
  "Hybrid",
  "Electric",
  "GPL",
] as const;

export const transmissions = ["Automată", "Manuală"] as const;

export const categories = [
  "Sedan",
  "SUV",
  "Coupe",
  "Cabrio",
  "Hatchback",
  "Break",
  "Supercar",
] as const;

export const priceRanges = [
  { label: "Sub 20.000€", min: 0, max: 20000 },
  { label: "20.000€ - 50.000€", min: 20000, max: 50000 },
  { label: "50.000€ - 100.000€", min: 50000, max: 100000 },
  { label: "100.000€ - 200.000€", min: 100000, max: 200000 },
  { label: "Peste 200.000€", min: 200000, max: Infinity },
] as const;

export const yearRanges = [
  { label: "2024+", min: 2024, max: 2027 },
  { label: "2020-2023", min: 2020, max: 2023 },
  { label: "2015-2019", min: 2015, max: 2019 },
  { label: "2010-2014", min: 2010, max: 2014 },
  { label: "Sub 2010", min: 0, max: 2009 },
] as const;

export const sortOptions = [
  { label: "Cele mai noi", value: "newest" },
  { label: "Preț crescător", value: "price_asc" },
  { label: "Preț descrescător", value: "price_desc" },
  { label: "Rulaj crescător", value: "mileage_asc" },
  { label: "An descrescător", value: "year_desc" },
] as const;
