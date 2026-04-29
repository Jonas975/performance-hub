// src/lib/constants.ts
import { generateAffiliateLink } from "./affiliateUtils";

export const FALLBACK_PRODUCTS = [
  {
    itemId: 'f1',
    title: 'Premium Whey Protein Isolat - 2kg Vanille',
    price: { value: '54.90', currency: 'EUR' },
    images: [
      'https://images.unsplash.com/photo-1593095191071-82b63deef6a1?q=80&w=800',
      'https://images.unsplash.com/photo-1579722820308-d74e5719d0a8?q=80&w=800'
    ],
    itemWebUrl: 'https://www.ebay.de/itm/364052345678',
    affiliateUrl: generateAffiliateLink({itemId: '364052345678', marketplace: 'EBAY_DE', customId: 'homepage-marquee'}),
    description: 'Hochwertiges Whey Isolat für maximalen Muskelaufbau. Extrem löslich und hervorragender Geschmack.'
  },
  {
    itemId: 'f2',
    title: 'Pro Griffkraft-Zughilfen für Kreuzheben',
    price: { value: '14.95', currency: 'EUR' },
    images: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800',
      'https://images.unsplash.com/photo-1517438476312-10d79c67750d?q=80&w=800'
    ],
    itemWebUrl: 'https://www.ebay.de/itm/255891234567',
    affiliateUrl: generateAffiliateLink({itemId: '255891234567', marketplace: 'EBAY_DE', customId: 'homepage-marquee'}),
    description: 'Reißfeste Zughilfen aus Baumwolle mit Neopren-Polsterung.'
  },
  {
    itemId: 'f3',
    title: 'Einstellbare Kurzhanteln Set (2x 24kg)',
    price: { value: '189.00', currency: 'EUR' },
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2603b8?q=80&w=800',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800'
    ],
    itemWebUrl: 'https://www.ebay.de/itm/267353915763',
    affiliateUrl: generateAffiliateLink({itemId: '267353915763', marketplace: 'EBAY_DE', customId: 'homepage-marquee'}),
    description: 'Platzsparendes Hantelsystem. Ersetzt 15 einzelne Hantelpaare.'
  },
  /* ── NEUE PRODUKTE ── */
  {
    itemId: 'f4',
    title: 'Pre-Workout Booster "Ignite" - Fruit Punch',
    price: { value: '34.90', currency: 'EUR' },
    images: [
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800',
      'https://images.unsplash.com/photo-1594494424759-64568dc22d71?q=80&w=800'
    ],
    itemWebUrl: 'https://www.ebay.de/itm/123456789012',
    affiliateUrl: generateAffiliateLink({itemId: '123456789012', marketplace: 'EBAY_DE', customId: 'homepage-marquee'}),
    description: 'Maximaler Fokus und Pump für deine Trainingseinheiten. Wissenschaftlich fundierte Inhaltsstoffe ohne Crash.'
  },
  {
    itemId: 'f5',
    title: 'Pro-Grip Klimmzugstange für den Türrahmen',
    price: { value: '49.95', currency: 'EUR' },
    images: [
      'https://images.unsplash.com/photo-1598289501385-e6302636b13e?q=80&w=800',
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800'
    ],
    itemWebUrl: 'https://www.ebay.de/itm/234567890123',
    affiliateUrl: generateAffiliateLink({itemId: '234567890123', marketplace: 'EBAY_DE', customId: 'homepage-marquee'}),
    description: 'Stabile Konstruktion ohne Bohren. Gepolsterte Griffe für optimalen Halt und Schutz des Türrahmens.'
  },
  {
    itemId: 'f6',
    title: 'Deep-Tissue Massagepistole - 6 Aufsätze',
    price: { value: '89.00', currency: 'EUR' },
    images: [
      'https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?q=80&w=800',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800'
    ],
    itemWebUrl: 'https://www.ebay.de/itm/345678901234',
    affiliateUrl: generateAffiliateLink({itemId: '345678901234', marketplace: 'EBAY_DE', customId: 'homepage-marquee'}),
    description: 'Effektive Regeneration nach dem Training. 30 Geschwindigkeitsstufen und flüsterleiser Motor.'
  }
];