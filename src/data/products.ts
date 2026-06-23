// Shared product catalog — single source of truth for RibbonGallery and /collection

export const EXTS = ['jpg', 'webp', 'png', 'jpeg'] as const;

export type ProductCategory = 'traditional' | 'pistachio' | 'giftbox';
export type FilterCategory = 'all' | ProductCategory;

export interface Product {
  key: string;         // translation key slug: "product.{key}.desc"
  name: string;        // display name (unchanged across locales)
  image: string;       // exact filename in /public (without extension)
  price: string;
  category: ProductCategory;
}

export const PRODUCTS: Product[] = [
  {
    key:      'baklawa',
    name:     'Baklawa',
    image:    'Baklawa',
    price:    '240 DA',
    category: 'traditional',
  },
  {
    key:      'tcherek',
    name:     'Tcherek',
    image:    'tcherek',
    price:    '110 DA',
    category: 'traditional',
  },
  {
    key:      'tcherek-msaker',
    name:     'Tcherek msaker',
    image:    'Tcherek msaker',
    price:    '150 DA',
    category: 'traditional',
  },
  {
    key:      'makroud-lawz',
    name:     'Makroud lawz',
    image:    'Makroud lawz',
    price:    '150 DA',
    category: 'traditional',
  },
  {
    key:      'mchakla',
    name:     'Mchakla',
    image:    'Mchakla',
    price:    '150 DA',
    category: 'traditional',
  },
  {
    key:      'mchakla-noisettes',
    name:     'Mchakla noisettes',
    image:    'Mchakla noisettes',
    price:    '160 DA',
    category: 'traditional',
  },
  {
    key:      'coque-pistaches',
    name:     'Coque pistaches',
    image:    'Coque pistaches',
    price:    '160 DA',
    category: 'pistachio',
  },
  {
    key:      'nougatine-pignons',
    name:     'Nougatine pignons',
    image:    'Nougatine pigons', // filename has a typo (pigons)
    price:    '160 DA',
    category: 'pistachio',
  },
  {
    key:      'pistachios',
    name:     'Pistachios',
    image:    'Pistachios',
    price:    '160 DA',
    category: 'pistachio',
  },
  {
    key:      'nougatine-noisette',
    name:     'Nougatine noisette',
    image:    'Nougatine noisette',
    price:    '150 DA',
    category: 'traditional',
  },
  {
    key:      'framboisier',
    name:     'Framboisier',
    image:    'Framboisier',
    price:    '150 DA',
    category: 'traditional',
  },
  {
    key:      'carre-noisette',
    name:     'Carré noisette',
    image:    'Carre noisette', // filename has no accent
    price:    '140 DA',
    category: 'traditional',
  },
  {
    key:      'mchawek-amande',
    name:     'Mchawek amande',
    image:    'Mchawek amande',
    price:    '150 DA',
    category: 'traditional',
  },
  {
    key:      'nougatine-amande',
    name:     'Nougatine amande',
    image:    'Nougatine amande',
    price:    '150 DA',
    category: 'traditional',
  },
  {
    key:      'bracelets-pistaches',
    name:     'Bracelets pistaches',
    image:    'Bracelets pistaches',
    price:    '170 DA',
    category: 'pistachio',
  },
  {
    key:      'kaakates-amandes',
    name:     'Kaâkates amandes',
    image:    'Kaakates amandes', // filename has no accent
    price:    '170 DA',
    category: 'traditional',
  },
  {
    key:      'kaakates-amandes-fleur',
    name:     'Kaâkates amandes fleur',
    image:    'Kaakates amandes flower', // filename uses "flower" not "fleur"
    price:    '170 DA',
    category: 'traditional',
  },
  {
    key:      'boite-24',
    name:     'Boîte de 24 pièces',
    image:    'boite de 24 pieces', // lowercase, no accents in filename
    price:    '3 600 DA',
    category: 'giftbox',
  },
  {
    key:      'boules-noisette',
    name:     'Boules de noisette',
    image:    'Boules e noisette', // filename is missing the 'd'
    price:    '150 DA',
    category: 'traditional',
  },
  {
    key:      'samsa',
    name:     'Samsa',
    image:    'Samsa',
    price:    '150 DA',
    category: 'traditional',
  },
  {
    key:      'kafta',
    name:     'Kafta aux amandes et pistaches',
    image:    'Kafta aux amandes et pistaches',
    price:    '170 DA',
    category: 'pistachio',
  },
];
