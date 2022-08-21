const PRODUCTS = [
  {
    name: 'Велосипед Foxx Fusion 28',
    categoryId: 'bikes',
    price: 399,
    images: [
      'img/bikes/FoxxFusion28/1.webp',
      'img/bikes/FoxxFusion28/2.webp',
      'img/bikes/FoxxFusion28/3.webp',
      'img/bikes/FoxxFusion28/4.webp',
      'img/bikes/FoxxFusion28/5.webp',
    ],
    availableColorsIds: ['blue', 'yellow', 'gray'],
  },
  {
    name: 'Велосипед Arena Street 2021',
    categoryId: 'bikes',
    price: 399,
    images: [
      'img/bikes/ArenaStreet2021/1.webp',
      'img/bikes/ArenaStreet2021/2.webp',
      'img/bikes/ArenaStreet2021/3.webp',
      'img/bikes/ArenaStreet2021/4.webp',
    ],
    availableColorsIds: ['blue', 'yellow', 'white', 'black'],
  },
  {
    name: 'Велосипед Arena Flame 2.0 2021',
    categoryId: 'bikes',
    price: 499,
    images: [
      'img/bikes/ArenaFlame2.0_2021/1.webp',
      'img/bikes/ArenaFlame2.0_2021/2.webp',
      'img/bikes/ArenaFlame2.0_2021/3.webp',
      'img/bikes/ArenaFlame2.0_2021/4.webp',
      'img/bikes/ArenaFlame2.0_2021/5.webp',
    ],
    availableColorsIds: ['blue', 'white', 'black'],
  },
  {
    name: 'Велосипед Arena Storm 2021',
    categoryId: 'bikes',
    price: 499,
    images: [
      'img/bikes/ArenaStorm2021/1.webp',
      'img/bikes/ArenaStorm2021/2.webp',
      'img/bikes/ArenaStorm2021/3.webp',
      'img/bikes/ArenaStorm2021/4.webp',
    ],
    availableColorsIds: ['blue', 'yellow', 'gray', 'green'],
  },
  {
    name: 'Велосипед Arena Crystal 2.0 2021',
    categoryId: 'bikes',
    price: 425,
    images: [
      'img/bikes/ArenaCrystal2.0_2021/1.webp',
      'img/bikes/ArenaCrystal2.0_2021/2.webp',
      'img/bikes/ArenaCrystal2.0_2021/3.webp',
      'img/bikes/ArenaCrystal2.0_2021/4.webp',
    ],
    availableColorsIds: ['green', 'red', 'white', 'black'],
  },
  {
    name: 'Велосипед Foxx Fiesta 28SHC',
    categoryId: 'bikes',
    price: 475,
    images: [
      'img/bikes/FoxxFiesta28SHC/1.webp',
      'img/bikes/FoxxFiesta28SHC/2.webp',
    ],
    availableColorsIds: ['blue', 'white', 'black'],
  },
  {
    name: 'Кресло офисное Prestige GTP',
    categoryId: 'chairs',
    price: 158,
    images: [
      'img/chairs/PrestigeGTP/1.webp',
      'img/chairs/PrestigeGTP/2.webp',
    ],
    availableColorsIds: ['blue', 'yellow', 'gray', 'black'],
  },
  {
    name: 'Кресло офисное Mio Tesoro Emma-M',
    categoryId: 'chairs',
    price: 199,
    images: [
      'img/chairs/MioTesoroEmma-M/1.webp',
      'img/chairs/MioTesoroEmma-M/2.webp',
      'img/chairs/MioTesoroEmma-M/3.webp',
    ],
    availableColorsIds: ['red', 'white', 'black'],
  },
  {
    name: 'Кресло офисное Chairman Стандарт СТ-80',
    categoryId: 'chairs',
    price: 336,
    images: [
      'img/chairs/ChairmanСтандартСТ-80/1.webp',
    ],
    availableColorsIds: ['blue', 'yellow', 'gray'],
  },
  {
    name: 'Кресло офисное Mio Tesoro Танаро AF-C7301',
    categoryId: 'chairs',
    price: 336,
    images: [
      'img/chairs/MioTesoroТанароAF-C7301/1.webp',
      'img/chairs/MioTesoroТанароAF-C7301/2.webp',
      'img/chairs/MioTesoroТанароAF-C7301/3.webp',
    ],
    availableColorsIds: ['blue', 'yellow', 'black'],
  },
  {
    name: 'Посудомоечная машина Hotpoint-Ariston HSCIC 3M19',
    categoryId: 'dishwashers',
    price: 1390,
    images: [
      'img/dishwashers/HotpointAristonHSCIC3M19/1.webp',
      'img/dishwashers/HotpointAristonHSCIC3M19/2.webp',
      'img/dishwashers/HotpointAristonHSCIC3M19/3.webp',
    ],
    availableColorsIds: ['blue', 'white', 'black'],
  },
  {
    name: 'Посудомоечная машина GEFEST 45311',
    categoryId: 'dishwashers',
    price: 935,
    images: [
      'img/dishwashers/GEFEST45311/1.webp',
      'img/dishwashers/GEFEST45311/2.webp',
    ],
    availableColorsIds: ['white', 'black'],
  },
  {
    name: 'Посудомоечная машина Korting KDI 60110',
    categoryId: 'dishwashers',
    price: 1090,
    images: [
      'img/dishwashers/KortingKDI60110/1.webp',
      'img/dishwashers/KortingKDI60110/2.webp',
    ],
    availableColorsIds: ['blue', 'yellow'],
  },
  {
    name: 'Посудомоечная машина Maunfeld MLP 08I',
    categoryId: 'dishwashers',
    price: 999,
    images: [
      'img/dishwashers/MaunfeldMLP08I/1.webp',
      'img/dishwashers/MaunfeldMLP08I/2.webp',
      'img/dishwashers/MaunfeldMLP08I/3.webp',
      'img/dishwashers/MaunfeldMLP08I/4.webp',
    ],
    availableColorsIds: ['blue', 'black'],
  },
];

export default function products() {
  return PRODUCTS.map((product, index) => ({
    ...product,
    id: index,
  }));
}
