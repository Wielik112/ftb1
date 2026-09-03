/* Seed the database with the original FBT Outlet catalogue.
   Run with: npm run db:seed  (idempotent — upserts by id) */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PRODUCTS = [
  { id: 'p01', condition: 'Nowy', name: 'Velocity Pro Tee', cat: 'Koszulki', brand: 'Nike', price: 89, old: 149, tag: '-40%', tagType: 'sale', stars: 5, reviews: 96, color: 'Czarny', sizes: ['S', 'M', 'L', 'XL'], material: '92% poliester, 8% elastan', gradient: 'linear-gradient(135deg,#2a0409,#1c1c22)', desc: 'Lekka koszulka treningowa z oddychającej dzianiny, która odprowadza wilgoć i szybko schnie. Płaskie szwy nie ocierają, a smukły krój zapewnia pełną swobodę ruchu.' },
  { id: 'p02', condition: 'Używany', name: 'Apex Track Jacket', cat: 'Bluzy', brand: 'Adidas', price: 259, old: 399, tag: 'HIT', tagType: 'hit', stars: 5, reviews: 128, color: 'Czerwony', sizes: ['M', 'L', 'XL', 'XXL'], material: '88% poliester, 12% elastan', gradient: 'linear-gradient(135deg,#1c1c22,#320810)', desc: 'Techniczna bluza rozpinana zaprojektowana na intensywny wysiłek. Czterokierunkowo elastyczna tkanina odprowadza wilgoć, a detale odblaskowe zwiększają widoczność podczas wieczornych treningów.' },
  { id: 'p03', condition: 'Nowy', name: 'Redline Joggers', cat: 'Spodnie', brand: 'Puma', price: 179, old: 249, tag: '-28%', tagType: 'sale', stars: 4, reviews: 74, color: 'Czarny', sizes: ['S', 'M', 'L', 'XL'], material: '80% bawełna, 20% poliester', gradient: 'linear-gradient(135deg,#151519,#2a0409)', desc: 'Wygodne joggery o zwężanym kroju z miękkiej, drapanej dzianiny. Ściągacze przy kostkach i regulowany ściągacz w pasie trzymają fason przez cały dzień.' },
  { id: 'p04', condition: 'Nowy', name: 'Surge Windbreaker', cat: 'Kurtki', brand: 'Under Armour', price: 329, old: 449, tag: 'NOWOŚĆ', tagType: 'new', stars: 5, reviews: 41, color: 'Szary', sizes: ['M', 'L', 'XL'], material: '100% poliamid', gradient: 'linear-gradient(135deg,#2a0409,#0f0f12)', desc: 'Ultralekka wiatrówka, która chroni przed wiatrem i przelotnym deszczem. Składa się do własnej kieszeni - łatwo zabierzesz ją na każdy bieg.' },
  { id: 'p05', condition: 'Używany', name: 'Boost Runner GT', cat: 'Obuwie', brand: 'Adidas', price: 419, old: 599, tag: '-30%', tagType: 'sale', stars: 5, reviews: 152, color: 'Biały', sizes: ['M', 'L', 'XL', 'XXL'], material: 'Cholewka z siatki, podeszwa EVA', gradient: 'linear-gradient(135deg,#1c1c22,#2a0409)', desc: 'Buty do biegania z responsywną, sprężystą podeszwą, która zwraca energię przy każdym kroku. Przewiewna cholewka i stabilna pięta na długie dystanse.' },
  { id: 'p06', condition: 'Nowy', name: 'Torque Cap', cat: 'Akcesoria', brand: 'New Balance', price: 69, old: 99, tag: 'HIT', tagType: 'hit', stars: 4, reviews: 58, color: 'Czarny', sizes: ['S', 'M', 'L'], material: '100% bawełna', gradient: 'linear-gradient(135deg,#320810,#151519)', desc: 'Klasyczna czapka z regulowanym zapięciem i haftowanym logo. Lekka, oddychająca i idealna na trening w słońcu.' },
  { id: 'p07', condition: 'Używany', name: 'Nitro Compression', cat: 'Koszulki', brand: 'Under Armour', price: 119, old: 169, tag: '-29%', tagType: 'sale', stars: 5, reviews: 87, color: 'Czerwony', sizes: ['XS', 'S', 'M', 'L'], material: '84% poliamid, 16% elastan', gradient: 'linear-gradient(135deg,#0f0f12,#2a0409)', desc: 'Koszulka kompresyjna, która wspiera mięśnie i przyspiesza regenerację. Ściśle przylega do ciała, nie ograniczając ruchu.' },
  { id: 'p08', condition: 'Nowy', name: 'Drift Cargo Pants', cat: 'Spodnie', brand: 'Puma', price: 219, old: 299, tag: 'NOWOŚĆ', tagType: 'new', stars: 4, reviews: 33, color: 'Szary', sizes: ['M', 'L', 'XL', 'XXL'], material: '65% bawełna, 35% poliester', gradient: 'linear-gradient(135deg,#2a0409,#1c1c22)', desc: 'Miejskie spodnie bojówki z praktycznymi kieszeniami cargo i luźnym, nowoczesnym krojem. Trwały materiał sprawdzi się na co dzień i w podróży.' },
  { id: 'p09', condition: 'Używany', name: 'Ignite Hoodie', cat: 'Bluzy', brand: 'Nike', price: 199, old: 279, tag: '-28%', tagType: 'sale', stars: 5, reviews: 111, color: 'Czarny', sizes: ['S', 'M', 'L', 'XL', 'XXL'], material: '80% bawełna, 20% poliester', gradient: 'linear-gradient(135deg,#1c1c22,#320810)', desc: 'Ciepła bluza z kapturem z grubej, przyjemnej w dotyku dzianiny. Kangurowa kieszeń i podwójny kaptur dają komfort w chłodniejsze dni.' },
  { id: 'p10', condition: 'Nowy', name: 'Sprint Shorts 2.0', cat: 'Spodnie', brand: 'Reebok', price: 99, old: 139, tag: 'HIT', tagType: 'hit', stars: 4, reviews: 62, color: 'Biały', sizes: ['XS', 'S', 'M', 'L'], material: '100% poliester', gradient: 'linear-gradient(135deg,#151519,#2a0409)', desc: 'Lekkie spodenki do biegania z wszytą siateczką i kieszonką na klucz. Szybko schną i nie krępują ruchów na najszybszych odcinkach.' },
  { id: 'p11', condition: 'Używany', name: 'Carbon Duffel Bag', cat: 'Akcesoria', brand: 'Nike', price: 289, old: 399, tag: '-27%', tagType: 'sale', stars: 5, reviews: 45, color: 'Czarny', sizes: ['M'], material: '100% poliester 600D', gradient: 'linear-gradient(135deg,#2a0409,#0f0f12)', desc: 'Pojemna torba treningowa z osobną komorą na buty i wzmacnianym dnem. Wygodne uchwyty i regulowany pasek na ramię ułatwiają noszenie.' },
  { id: 'p12', condition: 'Nowy', name: 'Phantom Trail Shoe', cat: 'Obuwie', brand: 'New Balance', price: 379, old: 529, tag: 'NOWOŚĆ', tagType: 'new', stars: 5, reviews: 39, color: 'Szary', sizes: ['M', 'L', 'XL'], material: 'Cholewka z siatki, bieżnik gumowy', gradient: 'linear-gradient(135deg,#1c1c22,#2a0409)', desc: 'Buty trailowe z agresywnym bieżnikiem, który trzyma się każdego podłoża. Wzmocniony nosek chroni stopę na wymagających trasach.' },
];

async function main() {
  for (const p of PRODUCTS) {
    const { id, ...rest } = p;
    await prisma.product.upsert({
      where: { id },
      update: rest,
      create: { id, ...rest },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
