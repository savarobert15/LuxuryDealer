import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const cars = [
  {
    title: "BMW M5 Competition",
    brand: "BMW",
    model: "M5 Competition",
    year: 2024,
    mileage: 1500,
    price: 125000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "Sedan",
    description:
      "BMW M5 Competition cu motor V8 twin-turbo de 625 CP, 0-100 km/h în 3.3 secunde. Pachet carbon, sistem audio Harman Kardon, jante M 20\", frâne ceramice M Carbon. Interior din piele Merino cu cusături contrastate. Un adevărat masterpiece al ingineriei germane.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      "https://images.unsplash.com/photo-1520050206757-21e8a529c0b5?w=1200&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1200&q=80",
    ],
    featured: true,
    isNew: true,
  },
  {
    title: "Mercedes-Benz S 500",
    brand: "Mercedes-Benz",
    model: "S 500 4MATIC",
    year: 2024,
    mileage: 3000,
    price: 145000,
    fuelType: "Hybrid",
    transmission: "Automată",
    category: "Sedan",
    description:
      "Mercedes S-Class, epitomul luxului absolut. Interior din piele Nappa, sistem audio Burmester 3D de 30 difuzoare, scaune cu masaj și încălzire pe 6 zone, Head-Up Display cu Augmented Reality, suspensie pneumatică E-Active Body Control. Limuzina perfectă.",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80",
    ],
    featured: true,
    isNew: true,
  },
  {
    title: "Porsche 911 Turbo S",
    brand: "Porsche",
    model: "911 Turbo S",
    year: 2023,
    mileage: 8000,
    price: 220000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "Supercar",
    description:
      "Porsche 911 Turbo S cu motor boxer biturbo de 3.8L și 650 CP. 0-100 km/h în 2.7 secunde. Pachet sport Chrono, sistem PDCC Sport, frâne ceramice PCCB, jante Turbo S Exclusive Design. Cel mai capabil 911 din toate timpurile.",
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80",
      "https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
    ],
    featured: true,
    isNew: false,
  },
  {
    title: "Audi RS7 Sportback",
    brand: "Audi",
    model: "RS7 Sportback",
    year: 2024,
    mileage: 2000,
    price: 135000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "Coupe",
    description:
      "Audi RS7 Sportback cu motor V8 bi-turbo de 4.0L și 600 CP. 0-100 km/h în 3.6 secunde. Design exclusivist cu fante aerodinamice, jante RS de 22\", sistem de evacuare RS cu klape, interior RS cu tapițerie combinată piele/Alcantara. Artă în mișcare.",
    images: [
      "https://images.unsplash.com/photo-1606611013016-969c19ba27ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
    ],
    featured: true,
    isNew: true,
  },
  {
    title: "Range Rover Sport SVR",
    brand: "Land Rover",
    model: "Range Rover Sport SVR",
    year: 2024,
    mileage: 5000,
    price: 115000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "SUV",
    description:
      "Range Rover Sport SVR cu motor V8 supercharged de 575 CP. 0-100 km/h în 4.5 secunde. Sistemul Terrain Response 2, suspensie pneumatică adaptivă, jante forjate de 22\", interior Windsor leather cu detalii carbon. SUV-ul care redefinește performanța.",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80",
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
    ],
    featured: true,
    isNew: true,
  },
  {
    title: "Tesla Model S Plaid",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    mileage: 1000,
    price: 115000,
    fuelType: "Electric",
    transmission: "Automată",
    category: "Sedan",
    description:
      "Tesla Model S Plaid cu 1020 CP și trei motoare electrice. 0-100 km/h în sub 2 secunde. Autonomie de 628 km (WLTP), ecran central de 17\" cu rotație, Autopilot Full Self-Driving, sunet premium de 22 difuzoare. Cel mai rapid sedan de serie din lume.",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=80",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=1200&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80",
    ],
    featured: true,
    isNew: true,
  },
  {
    title: "BMW X5 M Competition",
    brand: "BMW",
    model: "X5 M Competition",
    year: 2023,
    mileage: 12000,
    price: 105000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "SUV",
    description:
      "BMW X5 M Competition cu motor V8 twin-turbo de 625 CP. 0-100 km/h în 3.8 secunde. Pachet M Carbon Exterior, suspensie M cu control activ al amortizoarelor, frâne M Sport cu etriere roșii, sistem xDrive și M Drive Professional. SUV-ul sportiv definitiv.",
    images: [
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1200&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      "https://images.unsplash.com/photo-1520050206757-21e8a529c0b5?w=1200&q=80",
    ],
    featured: false,
    isNew: false,
  },
  {
    title: "Mercedes-AMG GT 63 S",
    brand: "Mercedes-Benz",
    model: "AMG GT 63 S",
    year: 2023,
    mileage: 6000,
    price: 175000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "Coupe",
    description:
      "Mercedes-AMG GT 63 S cu motor V8 biturbo de 4.0L și 639 CP. Sistem AMG Performance 4MATIC+, suspensie AMG RIDE CONTROL+, sistem de evacuare AMG cu klape, interior AMG cu scaune sport electric. Performanță pură într-un pachet elegant de 4 locuri.",
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=80",
    ],
    featured: false,
    isNew: true,
  },
  {
    title: "Audi Q8 e-tron",
    brand: "Audi",
    model: "Q8 55 e-tron quattro",
    year: 2024,
    mileage: 3000,
    price: 85000,
    fuelType: "Electric",
    transmission: "Automată",
    category: "SUV",
    description:
      "Audi Q8 e-tron cu două motoare electrice și tracțiune integrală quattro. Autonomie de 582 km, putere de 408 CP, încărcare rapidă DC de 170 kW. Sistem Bang & Olufsen 3D premium, suspensie pneumatică adaptivă, proiectoare Matrix LED. SUV electric de lux.",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=80",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80",
    ],
    featured: false,
    isNew: true,
  },
  {
    title: "Volvo XC90 Recharge",
    brand: "Volvo",
    model: "XC90 T8 Recharge Ultimate",
    year: 2024,
    mileage: 4000,
    price: 78000,
    fuelType: "Hybrid",
    transmission: "Automată",
    category: "SUV",
    description:
      "Volvo XC90 T8 Recharge cu sistem plug-in hybrid de 455 CP. Autonomie electrică de 51 km, interior din piele Nappa nordică, sistem audio Bowers & Wilkins de 1400W cu 19 difuzoare, Pilot Assist, panoramic sunroof. Siguranță, durabilitate și confort scandinav.",
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&q=80",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1200&q=80",
    ],
    featured: false,
    isNew: true,
  },
  {
    title: "Porsche Cayenne Turbo GT",
    brand: "Porsche",
    model: "Cayenne Turbo GT",
    year: 2023,
    mileage: 9000,
    price: 195000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "SUV",
    description:
      "Porsche Cayenne Turbo GT cu motor V8 twin-turbo de 4.0L și 640 CP. 0-100 km/h în 3.3 secunde, recordul SUV pe Nürburgring. Frâne ceramice PCCB, pachete aerodinamice GT, suspensie PDCC Sport, jante Turbo GT de 22\". Cel mai rapid SUV de la Porsche.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80",
      "https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=1200&q=80",
    ],
    featured: false,
    isNew: false,
  },
  {
    title: "Jaguar F-Type R",
    brand: "Jaguar",
    model: "F-Type R Coupe",
    year: 2023,
    mileage: 7000,
    price: 110000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "Coupe",
    description:
      "Jaguar F-Type R cu motor V8 supercharged de 5.0L și 575 CP. 0-100 km/h în 3.7 secunde. Sunet inconfundabil al evacuării active, sistem AWD, frâne de carbon-ceramică, tapițerie Windsor leather. Sportivitatea britanică la cel mai înalt nivel.",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
    ],
    featured: false,
    isNew: false,
  },
  {
    title: "Ferrari Roma",
    brand: "Ferrari",
    model: "Roma",
    year: 2023,
    mileage: 3500,
    price: 230000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "Coupe",
    description:
      "Ferrari Roma cu motor V8 twin-turbo de 3.9L și 620 CP. 0-100 km/h în 3.4 secunde, viteză maximă 320 km/h. Design italian sublim, interior 2+ cu écran digital de 16\", sistem Ferrari Side Slip Control, cutie de viteze 8 trepte cu debut selectabil. La dolce vita.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      "https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=1200&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80",
    ],
    featured: true,
    isNew: false,
  },
  {
    title: "Lamborghini Urus S",
    brand: "Lamborghini",
    model: "Urus S",
    year: 2024,
    mileage: 2500,
    price: 285000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "SUV",
    description:
      "Lamborghini Urus S cu motor V8 twin-turbo de 4.0L și 666 CP. 0-100 km/h în 3.5 secunde, viteză maximă 305 km/h. Sistem ANIMA cu moduri Strada/Sport/Corsa/Terra/Neve/Sabbia, interior personalizat Ad Personam, jante forjate de 23\". Super SUV-ul definitiv.",
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27ea?w=1200&q=80",
    ],
    featured: true,
    isNew: true,
  },
  {
    title: "Bentley Continental GT",
    brand: "Bentley",
    model: "Continental GT Speed",
    year: 2023,
    mileage: 5500,
    price: 265000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "Coupe",
    description:
      "Bentley Continental GT Speed cu motor W12 twin-turbo de 6.0L și 659 CP. 0-100 km/h în 3.5 secunde, viteză maximă 335 km/h. Interior handcrafted cu lemn Koa și piele Beluga, sistem audio Naim for Bentley de 2200W, jante forjate de 22\". Opulență britanică.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1520050206757-21e8a529c0b5?w=1200&q=80",
    ],
    featured: false,
    isNew: false,
  },
  {
    title: "Maserati Grecale Trofeo",
    brand: "Maserati",
    model: "Grecale Trofeo",
    year: 2024,
    mileage: 1800,
    price: 92000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "SUV",
    description:
      "Maserati Grecale Trofeo cu motor V6 Nettuno twin-turbo de 3.0L și 530 CP. 0-100 km/h în 3.8 secunde. Design italian pur, sistem de infotainment MIA de 12.3\", sistem audio Sonus faber de 1280W, suspensie adaptivă Skyhook. Prima Maserati digitală.",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1200&q=80",
    ],
    featured: false,
    isNew: true,
  },
  {
    title: "Aston Martin DBX707",
    brand: "Aston Martin",
    model: "DBX707",
    year: 2024,
    mileage: 4200,
    price: 240000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "SUV",
    description:
      "Aston Martin DBX707 cu motor AMG V8 twin-turbo de 4.0L și 707 CP. 0-100 km/h în 3.3 secunde, cel mai rapid SUV luxury. Cutie de viteze wet-clutch 9 trepte, suspensie electronică adaptivă, jante forjate de 23\", interior în piele Caithness full-grain.",
    images: [
      "https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80",
    ],
    featured: false,
    isNew: true,
  },
  {
    title: "Lexus LFA",
    brand: "Lexus",
    model: "LFA",
    year: 2012,
    mileage: 8500,
    price: 950000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "Supercar",
    description:
      "Lexus LFA — capodopera ingineriei japoneze, produsă în doar 500 de exemplare. Motor V10 de 4.8L aspirat natural cu 552 CP, urland până la 9000 RPM cu sunet validat de Yamaha. Caroserie integral din fibră de carbon, cutie secvențială cu 6 trepte, 0-100 km/h în 3.7 secunde. Un adevărat obiect de colecție.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80",
    ],
    featured: true,
    isNew: false,
  },
  {
    title: "Rolls-Royce Ghost",
    brand: "Rolls-Royce",
    model: "Ghost Extended",
    year: 2023,
    mileage: 6800,
    price: 380000,
    fuelType: "Benzină",
    transmission: "Automată",
    category: "Sedan",
    description:
      "Rolls-Royce Ghost Extended cu motor V12 twin-turbo de 6.75L și 571 CP. Spațiu extins pentru pasageri, plafon Starlight cu 1340 surse de lumină LED, sistem audio Bespoke de 18 difuzoare, suspensie Flagbearer, covor de lână Scandinavian. Luxul absolut.",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=80",
    ],
    featured: false,
    isNew: false,
  },
  {
    title: "Porsche Taycan Turbo S",
    brand: "Porsche",
    model: "Taycan Turbo S",
    year: 2024,
    mileage: 2200,
    price: 185000,
    fuelType: "Electric",
    transmission: "Automată",
    category: "Sedan",
    description:
      "Porsche Taycan Turbo S cu 761 CP și sistem Performance Battery Plus. 0-100 km/h în 2.8 secunde, autonomie 630 km (WLTP). Sistem de frânare regenerativă, suspensie PASM cu control activ al amortizoarelor, sistem audio Burmester High-End de 21 difuzoare.",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=80",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=1200&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80",
    ],
    featured: true,
    isNew: true,
  },
  {
    title: "BMW 7 Series M760e",
    brand: "BMW",
    model: "760e xDrive",
    year: 2024,
    mileage: 800,
    price: 165000,
    fuelType: "Hybrid",
    transmission: "Automată",
    category: "Sedan",
    description:
      "BMW 760e xDrive cu sistem M Performance plug-in hybrid de 571 CP. 0-100 km/h în 3.8 secunde. Autonomie electrică de 90 km, ecran panoramic BMW Theatre Screen de 31.3\", masaj shiatsu, perle Swarovski pe plafonul luminos, interior Executive Lounge. Limuzina viitorului.",
    images: [
      "https://images.unsplash.com/photo-1520050206757-21e8a529c0b5?w=1200&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
    ],
    featured: false,
    isNew: true,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();
  await prisma.contact.deleteMany();

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      email: "admin@luxurydealer.ro",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("✅ Admin user created: admin@luxurydealer.ro / admin123");

  // Create cars
  for (const car of cars) {
    await prisma.car.create({ data: car });
  }
  console.log(`✅ ${cars.length} cars created`);

  console.log("🎉 Seeding complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
