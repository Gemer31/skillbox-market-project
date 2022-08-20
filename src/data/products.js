const PRODUCTS = [
  {
    name: 'Велосипед Foxx Fusion 28',
    categoryId: 'bikes',
    price: 399,
    imageSrc: 'img/bikes/FoxxFusion28/1.webp',
    availableColorsIds: ['blue', 'yellow', 'gray'],
  },
  {
    name: 'Велосипед Arena Street 2021',
    categoryId: 'bikes',
    price: 399,
    imageSrc: 'img/bikes/ArenaStreet2021/1.webp',
    availableColorsIds: ['blue', 'yellow', 'white', 'black'],
  },
  {
    name: 'Велосипед Arena Flame 2.0 2021',
    categoryId: 'bikes',
    price: 499,
    imageSrc: 'img/bikes/ArenaFlame2.0_2021/1.webp',
    availableColorsIds: ['blue', 'white', 'black'],
  },
  {
    name: 'Велосипед Arena Storm 2021',
    categoryId: 'bikes',
    price: 499,
    imageSrc: 'img/bikes/ArenaStorm2021/1.webp',
    availableColorsIds: ['blue', 'yellow', 'gray', 'green'],
  },
  {
    name: 'Велосипед Arena Crystal 2.0 2021',
    categoryId: 'bikes',
    price: 425,
    imageSrc: 'img/bikes/ArenaCrystal2.0_2021/1.webp',
    availableColorsIds: ['green', 'red', 'white', 'black'],
  },
  {
    name: 'Велосипед Foxx Fiesta 28SHC',
    categoryId: 'bikes',
    price: 475,
    imageSrc: 'img/bikes/FoxxFiesta28SHC/1.webp',
    availableColorsIds: ['blue', 'white', 'black'],
  },
  {
    name: 'Кресло офисное Prestige GTP',
    categoryId: 'chairs',
    price: 158,
    imageSrc: 'img/chairs/PrestigeGTP/1.webp',
    availableColorsIds: ['blue', 'yellow', 'gray', 'black'],
  },
  {
    name: 'Кресло офисное Mio Tesoro Emma-M',
    categoryId: 'chairs',
    price: 199,
    imageSrc: 'img/chairs/MioTesoroEmma-M/1.webp',
    availableColorsIds: ['red', 'white', 'black'],
  },
  {
    name: 'Кресло офисное Chairman Стандарт СТ-80',
    categoryId: 'chairs',
    price: 336,
    imageSrc: 'img/chairs/ChairmanСтандартСТ-80/1.webp',
    availableColorsIds: ['blue', 'yellow', 'gray'],
  },
  {
    name: 'Кресло офисное Mio Tesoro Танаро AF-C7301',
    categoryId: 'chairs',
    price: 336,
    imageSrc: 'img/chairs/MioTesoroТанароAF-C7301/1.webp',
    availableColorsIds: ['blue', 'yellow', 'black'],
  },
  {
    name: 'Посудомоечная машина Hotpoint-Ariston HSCIC 3M19',
    categoryId: 'dishwashers',
    price: 1390,
    imageSrc: 'img/dishwashers/HotpointAristonHSCIC3M19/1.webp',
    availableColorsIds: ['blue', 'white', 'black'],
  },
  {
    name: 'Посудомоечная машина GEFEST 45311',
    categoryId: 'dishwashers',
    price: 935,
    imageSrc: 'img/dishwashers/GEFEST45311/1.webp',
    availableColorsIds: ['white', 'black'],
  },
  {
    name: 'Посудомоечная машина Korting KDI 60110',
    categoryId: 'dishwashers',
    price: 1090,
    imageSrc: 'img/dishwashers/KortingKDI60110/1.webp',
    availableColorsIds: ['blue', 'yellow'],
  },
  {
    name: 'Посудомоечная машина Maunfeld MLP 08I',
    categoryId: 'dishwashers',
    price: 999,
    imageSrc: 'img/dishwashers/MaunfeldMLP08I/1.webp',
    availableColorsIds: ['blue', 'black'],
  },
];

export default function products() {
  return PRODUCTS.map((product, index) => ({
    ...product,
    id: index,
  }));
}
