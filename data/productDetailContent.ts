import { Product } from './products';

export interface ProductDetailData {
  brandTitle: string;
  flavourSubtitle: string;
  tagline: string;
  paragraphs: string[];
  whyYoullLove: string[];
  perfectWith: string;
  netWeight: string;
  bestBefore: string;
  galleryImages: string[];
}

const bottleProductDetails: Record<string, ProductDetailData> = {
  // 1. Cardamom
  'cardamom-bottle': {
    brandTitle: 'REGGI ELANTHAI FRUIT SPREAD',
    flavourSubtitle: 'Cardamom | SWEET',
    tagline: 'A sweet, aromatic taste of tradition in every spoonful.',
    paragraphs: [
      'Discover the naturally fruity taste of traditional Elanthai fruit, beautifully blended with the warm, delicate aroma of cardamom.',
      'A deliciously sweet fruit spread with a distinctive Indian flavour — perfect for adding a little extra delight to breakfast, snacks and your favourite everyday foods.',
    ],
    whyYoullLove: [
      'Made from Elanthai fruit',
      'With natural cardamom',
      'Sweet, fruity & beautifully aromatic',
      'Vegan',
      'No artificial flavours, additives or colours',
    ],
    perfectWith:
      'Idli • Dosa • Chapathi • Toast • Fruit Salad • Milk Shakes • Noodles • Sandwiches • Wraps • Snacks',
    netWeight: '180 g',
    bestBefore: '180 days from the date of manufacture',
    galleryImages: [
      '/images/c1.png',
      '/images/c2.png',
      '/images/c3.png',
      '/images/c4.png',
    ],
  },

  // 2. Cardamom Cinnamon Cloves
  'cardamom-cinnamon-clove-bottle': {
    brandTitle: 'REGGI ELANTHAI FRUIT SPREAD',
    flavourSubtitle: 'Cardamom • Cinnamon • Cloves | SWEET',
    tagline: 'A sweet embrace of tradition in every spoonful.',
    paragraphs: [
      'Experience the naturally fruity taste of Elanthai fruit, beautifully blended with the warm aroma of cardamom, the comforting warmth of cinnamon, and the distinctive fragrance of cloves.',
      'A deliciously sweet and gently spiced fruit spread that brings together traditional Indian flavours in a convenient, versatile form.',
    ],
    whyYoullLove: [
      'Made from Elanthai fruits',
      'With Cardamom, Cinnamon & Cloves',
      'Sweet, fruity and warmly aromatic',
      'Vegan',
      'No artificial flavours, additives or colours',
    ],
    perfectWith:
      'Idli • Dosa • Chapathi • Bread Toast • Noodles • Sandwiches • Wraps • Snacks',
    netWeight: '180 g',
    bestBefore: '180 days from the date of manufacture',
    galleryImages: [
      '/images/ccc1.png',
      '/images/ccc2.png',
      '/images/ccc3.png',
      '/images/ccc4.png',
    ],
  },

  // 3. Cardamom Cinnamon Ginger
  'cardamom-cinnamon-ginger-bottle': {
    brandTitle: 'REGGI ELANTHAI FRUIT SPREAD',
    flavourSubtitle: 'Cardamom • Cinnamon • Ginger | SWEET',
    tagline:
      'Indulge in the sweet richness of REGGI’s Cardamom Cinnamon Ginger Flavored Dip – a delightful mix of ELANTHAI fruit and three powerful natural spices.',
    paragraphs: [
      'Indulge in the sweet richness of REGGI’s Cardamom Cinnamon Ginger Flavored Dip – a delightful mix of ELANTHAI fruit and three powerful natural spices. With the sweet aroma of cardamom, the warmth of cinnamon, and the zing of ginger, this dip is a wellness booster with irresistable taste.',
    ],
    whyYoullLove: [
      'Made from natural ELANTHAI fruit',
      'With added Cardamom Cinnamon Ginger',
      'Supports digestion, controls blood sugar, lowers blood sugar',
      'Rich in antioxidants',
      'Vegan & 100% natural',
      'No artificial flavours, additives and colours',
    ],
    perfectWith:
      'Idli • Dosa • Chapathi • Bread Toast • Noodles • Sandwiches • Wraps & Snacks',
    netWeight: '180 g',
    bestBefore: '180 days from the date of manufacture',
    galleryImages: [
      '/images/ccg1.png',
      '/images/ccg2.png',
      '/images/ccg3.png',
      '/images/ccg4.png',
    ],
  },

  // 4. Cumin Ginger Chilli
  'cumin-ginger-chilli-bottle': {
    brandTitle: 'REGGI ELANTHAI FRUIT SPREAD',
    flavourSubtitle: 'Cumin • Ginger • Chilli | SPICY',
    tagline: 'A bold, spicy burst with the warmth of traditional Indian spices.',
    paragraphs: [
      'REGGI Cumin Ginger Chilli brings together the naturally fruity taste of Elanthai fruit with the earthy aroma of cumin, the warming zing of ginger, and the lively heat of chilli.',
      'A deliciously spicy and versatile fruit spread, specially crafted for those who love a bold burst of flavour in their everyday food.',
    ],
    whyYoullLove: [
      'Made from Elanthai fruits',
      'Infused with Cumin, Ginger & Chilli',
      'Fruity, spicy and aromatic',
      'Perfect for spice lovers',
      'Vegan',
      'No artificial flavours, additives or colours',
    ],
    perfectWith:
      'Idli • Dosa • Chapathi • Fried Rice • Noodles • Sandwiches • Wraps • Snacks',
    netWeight: '180 g',
    bestBefore: '180 days from the date of manufacture',
    galleryImages: [
      '/images/cgc1.png',
      '/images/cgc2.png',
      '/images/cgc3.png',
      '/images/cgc4.png',
    ],
  },

  // 5. Ginger Garlic Chilli
  'ginger-garlic-chilli-bottle': {
    brandTitle: 'REGGI ELANTHAI FRUIT SPREAD',
    flavourSubtitle: 'Ginger • Garlic • Chilli | SPICY',
    tagline: 'A bold, spicy twist to the traditional taste of Elanthai.',
    paragraphs: [
      'REGGI Ginger Garlic Chilli brings together the naturally fruity taste of Elanthai fruit with the warming zing of ginger, the rich savouriness of garlic, and the lively heat of chilli.',
      'A deliciously spicy and versatile fruit spread for those who love a little extra punch in their everyday food.',
    ],
    whyYoullLove: [
      'Made from Elanthai fruits',
      'Infused with Ginger, Garlic & Chilli',
      'Fruity, spicy and flavourful',
      'Vegan',
      'No artificial flavours, additives or colours',
    ],
    perfectWith:
      'Idli • Dosa • Chapathi • Fried Rice • Noodles • Sandwiches • Wraps • Snacks',
    netWeight: '180 g',
    bestBefore: '180 days from the date of manufacture',
    galleryImages: [
      '/images/ggc1.png',
      '/images/ggc2.png',
      '/images/ggc3.png',
      '/images/ggc4.png',
    ],
  },
};

// Aliases for slug variations
bottleProductDetails['cardamom-cinnamon-cloves-bottle'] =
  bottleProductDetails['cardamom-cinnamon-clove-bottle'];

export function getProductDetailData(product: Product): ProductDetailData {
  // 1. Direct ID match in bottle details
  if (bottleProductDetails[product.id]) {
    return bottleProductDetails[product.id];
  }

  // 2. Fuzzy match for bottle variations
  const idLower = (product.id || '').toLowerCase();
  const nameLower = (product.name || '').toLowerCase();
  const isBottleCategory =
    !product.category ||
    product.category === 'Single Bottle' ||
    idLower.includes('bottle');

  if (isBottleCategory) {
    if (
      idLower.includes('clove') ||
      nameLower.includes('clove')
    ) {
      return bottleProductDetails['cardamom-cinnamon-clove-bottle'];
    }

    if (
      (idLower.includes('ginger') && idLower.includes('cinnamon')) ||
      (nameLower.includes('ginger') && (nameLower.includes('cinnamon') || nameLower.includes('cardamom')))
    ) {
      return bottleProductDetails['cardamom-cinnamon-ginger-bottle'];
    }

    if (idLower.includes('cumin') || nameLower.includes('cumin')) {
      return bottleProductDetails['cumin-ginger-chilli-bottle'];
    }

    if (
      idLower.includes('garlic') ||
      nameLower.includes('garlic') ||
      idLower.includes('ginger-garlic')
    ) {
      return bottleProductDetails['ginger-garlic-chilli-bottle'];
    }

    if (
      (idLower.includes('cardamom') || nameLower.includes('cardamom')) &&
      !nameLower.includes('cinnamon') &&
      !nameLower.includes('ginger') &&
      !nameLower.includes('clove')
    ) {
      return bottleProductDetails['cardamom-bottle'];
    }
  }

  // 3. Dynamic fallback for Pouches, Combos, and other products
  const taste = product.flavour_type === 'Spicy' ? 'SPICY' : 'SWEET';
  const weight =
    product.category === 'Single Bottle'
      ? '180 g'
      : product.category === 'Pouch Pack'
      ? '50 g'
      : 'Combo Pack';

  const defaultWhy = [
    'Made from native sun-ripened Elanthai fruits',
    'Blended with authentic handpicked spices',
    product.flavour_type === 'Spicy'
      ? 'Bold, fiery and savoury taste profile'
      : 'Naturally sweet and aromatic fruit flavor',
    '100% Vegan & Gluten Free',
    'No artificial flavours, additives, or colours',
  ];

  return {
    brandTitle: 'REGGI ELANTHAI FRUIT SPREAD',
    flavourSubtitle: `${product.name} | ${taste}`,
    tagline: product.description,
    paragraphs: [
      `REGGI ${product.name} captures the wholesome goodness of traditional Indian Jujube (Elanthai) fruit combined with carefully curated natural spices.`,
      'A versatile spread crafted to elevate your daily meals—delightful for spreading, dipping, cooking, and pairing with your favorite savory or sweet foods.',
    ],
    whyYoullLove:
      product.perks && product.perks.length > 0 ? product.perks : defaultWhy,
    perfectWith:
      'Idli • Dosa • Chapathi • Toast • Noodles • Sandwiches • Wraps • Snacks',
    netWeight: weight,
    bestBefore: '180 days from the date of manufacture',
    galleryImages: [product.image],
  };
}
