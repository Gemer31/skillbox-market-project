const PRODUCTS = [
  {
    name: 'Велосипед Foxx Fusion 28',
    category: 'bikes',
    price: 399,
    imageSrc: 'img/bikes/FoxxFusion28/1.webp',
  },
  {
    name: 'Велосипед Arena Street 2021',
    category: 'bikes',
    price: 399,
    imageSrc: 'img/bikes/ArenaStreet2021/1.webp',
  },
  {
    name: 'Велосипед Arena Flame 2.0 2021',
    category: 'bikes',
    price: 499,
    imageSrc: 'img/bikes/ArenaFlame2.0_2021/1.webp',
  },
  {
    name: 'Велосипед Arena Storm 2021',
    category: 'bikes',
    price: 499,
    imageSrc: 'img/bikes/ArenaStorm2021/1.webp',
  },
  {
    name: 'Велосипед Arena Crystal 2.0 2021',
    category: 'bikes',
    price: 425,
    imageSrc: 'img/bikes/ArenaCrystal2.0_2021/1.webp',
  },
  {
    name: 'Велосипед Foxx Fiesta 28SHC',
    category: 'bikes',
    price: 475,
    imageSrc: 'img/bikes/FoxxFiesta28SHC/1.webp',
  },
  {
    name: 'Кресло офисное Prestige GTP',
    category: 'chairs',
    price: 158,
    imageSrc: 'img/chairs/PrestigeGTP/1.webp',
  },
  {
    name: 'Кресло офисное Mio Tesoro Emma-M',
    category: 'chairs',
    price: 199,
    imageSrc: 'img/chairs/MioTesoroEmma-M/1.webp',
  },
  {
    name: 'Кресло офисное Chairman Стандарт СТ-80',
    category: 'chairs',
    price: 336,
    imageSrc: 'img/chairs/ChairmanСтандартСТ-80/1.webp',
  },
  {
    name: 'Кресло офисное Mio Tesoro Танаро AF-C7301',
    category: 'chairs',
    price: 336,
    imageSrc: 'img/chairs/MioTesoroТанароAF-C7301/1.webp',
  },
  {
    name: 'Посудомоечная машина Hotpoint-Ariston HSCIC 3M19',
    category: 'dishwashers',
    price: 1390,
    imageSrc: 'img/dishwashers/HotpointAristonHSCIC3M19/1.webp',
  },
  {
    name: 'Посудомоечная машина GEFEST 45311',
    category: 'dishwashers',
    price: 935,
    imageSrc: 'img/dishwashers/GEFEST45311/1.webp',
  },
  {
    name: 'Посудомоечная машина Korting KDI 60110',
    category: 'dishwashers',
    price: 1090,
    imageSrc: 'img/dishwashers/KortingKDI60110/1.webp',
  },
  {
    name: 'Посудомоечная машина Maunfeld MLP 08I',
    category: 'dishwashers',
    price: 999,
    imageSrc: 'img/dishwashers/MaunfeldMLP08I/1.webp',
  },
];

export default function products() {
  return PRODUCTS.map((product, index) => ({ ...product, id: index }));
}
