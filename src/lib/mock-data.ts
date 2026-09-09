export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  address: string;
  phone: string;
  website: string;
  openNow: boolean;
  image: string;
  images: string[];
  description: string;
  reviews: Review[];
}

export const categories = [
  { id: 'restaurants', name: 'Restaurants', icon: '🍽️' },
  { id: 'hotels', name: 'Hotels', icon: '🏨' },
  { id: 'hospitals', name: 'Hospitals', icon: '🏥' },
  { id: 'beauty', name: 'Beauty Spa', icon: '💆' },
  { id: 'gyms', name: 'Gyms', icon: '🏋️' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'dentists', name: 'Dentists', icon: '🦷' },
  { id: 'plumbers', name: 'Plumbers', icon: '🔧' },
  { id: 'electricians', name: 'Electricians', icon: '⚡' },
  { id: 'salons', name: 'Salons', icon: '✂️' },
  { id: 'mechanics', name: 'Mechanics', icon: '🚗' },
  { id: 'petshops', name: 'Pet Shops', icon: '🐾' },
  { id: 'realestate', name: 'Real Estate', icon: '🏠' },
  { id: 'events', name: 'Events', icon: '🎉' },
  { id: 'loans', name: 'Loans', icon: '💰' },
  { id: 'packers', name: 'Packers & Movers', icon: '📦' },
];

const initialMockBusinesses: Business[] = [
  {
    id: 'b1',
    name: 'Spice Garden Restaurant',
    category: 'restaurants',
    rating: 4.8,
    reviewsCount: 342,
    address: '123 Food Street, Downtown',
    phone: '+1 234 567 8900',
    website: 'www.spicegarden.com',
    openNow: true,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    ],
    description: 'Multi-cuisine restaurant offering a dining experience with vibrant spices and a warm atmosphere.',
    reviews: [
      { id: 'r1', author: 'John D.', rating: 4.5, comment: 'Great food and friendly service.', date: '2023-10-15' },
      { id: 'r2', author: 'Sarah W.', rating: 4, comment: 'Nice ambiance and good dishes.', date: '2023-10-10' }
    ]
  },
  {
    id: 'b2',
    name: 'Grand Plaza Luxury Hotel',
    category: 'hotels',
    rating: 4.9,
    reviewsCount: 856,
    address: '100 Luxury Blvd, City Center',
    phone: '+1 888 777 6666',
    website: 'www.grandplazahotel.com',
    openNow: true,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    ],
    description: 'Hotel with pool, skyline suites, full-service spa, and fine dining.',
    reviews: [
      { id: 'r5', author: 'David L.', rating: 4.5, comment: 'Very good stay. The staff was helpful.', date: '2023-11-05' },
      { id: 'r5b', author: 'Elena S.', rating: 4, comment: 'Enjoyed the pool and breakfast.', date: '2023-11-20' }
    ]
  },
  {
    id: 'b3',
    name: 'Iron Pulse Fitness & Gym',
    category: 'gyms',
    rating: 4.8,
    reviewsCount: 478,
    address: '22 Fitness Blvd, Sports District',
    phone: '+1 555 888 9999',
    website: 'www.ironpulsegym.com',
    openNow: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
    ],
    description: 'Training facility featuring lifting zones, cardio area, and personal training.',
    reviews: [
      { id: 'r6', author: 'Chris M.', rating: 4.5, comment: 'Good equipment and clean facility.', date: '2023-11-12' }
    ]
  },
  {
    id: 'b4',
    name: 'Glow Wellness & Day Spa',
    category: 'beauty',
    rating: 4.9,
    reviewsCount: 612,
    address: '88 Wellness Lane, Uptown',
    phone: '+1 555 222 3333',
    website: 'www.glowbeautyspa.com',
    openNow: true,
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
    ],
    description: 'Spa providing aromatherapy, deep tissue massages, and herbal facials.',
    reviews: [
      { id: 'r7', author: 'Priya K.', rating: 4.5, comment: 'Relaxing massage experience.', date: '2023-12-01' }
    ]
  },
  {
    id: 'b5',
    name: 'City Care Multi-Specialty Hospital',
    category: 'hospitals',
    rating: 4.8,
    reviewsCount: 1024,
    address: '45 Health Avenue, Medical District',
    phone: '+1 800 999 1111',
    website: 'www.citycarehospital.org',
    openNow: true,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80',
    ],
    description: 'Multi-specialty hospital with various medical specialists.',
    reviews: [
      { id: 'r3', author: 'Mike T.', rating: 4.5, comment: 'Prompt service.', date: '2023-09-20' }
    ]
  },
  {
    id: 'b6',
    name: 'Artisan Cafe & Bakery',
    category: 'restaurants',
    rating: 4.7,
    reviewsCount: 520,
    address: '7 Morning Ave, Lakeside',
    phone: '+1 555 444 7777',
    website: 'www.artisancafe.com',
    openNow: true,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80',
    ],
    description: 'Coffee bar and bakery with patio seating.',
    reviews: [
      { id: 'r8', author: 'Emily R.', rating: 4.5, comment: 'The croissants and coffee were good.', date: '2023-10-22' }
    ]
  },
  {
    id: 'b7',
    name: 'Bright Smiles Dental Studio',
    category: 'dentists',
    rating: 4.9,
    reviewsCount: 310,
    address: '15 Care Street, Greenfield',
    phone: '+1 555 111 2222',
    website: 'www.brightsmilesdental.com',
    openNow: true,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80',
    ],
    description: 'Digital cosmetic dentistry, veneers, teeth whitening, and family oral care.',
    reviews: [
      { id: 'r9', author: 'Tom H.', rating: 4.5, comment: 'Gentle procedure and professional staff.', date: '2023-11-18' }
    ]
  },
  {
    id: 'b8',
    name: 'Elite Urban Hair Salon',
    category: 'salons',
    rating: 4.8,
    reviewsCount: 425,
    address: '54 Style Boulevard, Fashion Plaza',
    phone: '+1 555 333 4444',
    website: 'www.elitesalon.com',
    openNow: true,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
    ],
    description: 'Hair stylists offering balayage, cuts, and smoothing.',
    reviews: [
      { id: 'r10', author: 'Jessica M.', rating: 4.5, comment: 'Happy with my new haircut.', date: '2023-12-05' }
    ]
  },
  {
    id: 'b9',
    name: 'Paws & Whiskers Pet Resort',
    category: 'petshops',
    rating: 4.9,
    reviewsCount: 290,
    address: '90 Green Meadow Way, Parkland',
    phone: '+1 555 777 8888',
    website: 'www.pawsresort.com',
    openNow: true,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    ],
    description: 'Pet boarding, daycare, grooming, and pet supplies.',
    reviews: [
      { id: 'r11', author: 'Daniel K.', rating: 4.5, comment: 'My dog seemed comfortable here.', date: '2023-12-10' }
    ]
  },
  {
    id: 'b10',
    name: 'QuickFix Pro Plumbing',
    category: 'plumbers',
    rating: 4.6,
    reviewsCount: 189,
    address: '78 Utility Lane, Suburbia',
    phone: '+1 555 123 4567',
    website: 'www.quickfixplumbing.co',
    openNow: false,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    ],
    description: 'Residential and commercial plumbing specialists with emergency dispatch.',
    reviews: [
      { id: 'r4', author: 'Alice B.', rating: 4.5, comment: 'Fixed our pipe leak promptly.', date: '2023-10-01' }
    ]
  }
];

const generateMoreBusinesses = (): Business[] => {
  const generated: Business[] = [];
  let idCounter = 20;

  // Simple deterministic seeded random number generator
  let seed = 12345;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const adjectives = ['Elite', 'Prime', 'Pro', 'Express', 'City', 'Grand', 'Urban', 'Central', 'Star', 'Royal', 'Swift', 'Global'];
  const nouns = ['Services', 'Solutions', 'Hub', 'Center', 'Studio', 'Works', 'Group', 'Partners'];

  categories.forEach(cat => {
    for (let i = 0; i < 9; i++) {
      idCounter++;
      const name = `${adjectives[Math.floor(random() * adjectives.length)]} ${cat.name.split(' ')[0]} ${nouns[Math.floor(random() * nouns.length)]}`;
      
      generated.push({
        id: `b${idCounter}`,
        name: name,
        category: cat.id,
        rating: Number((4 + random()).toFixed(1)),
        reviewsCount: Math.floor(random() * 500) + 10,
        address: `${Math.floor(random() * 900) + 100} ${adjectives[Math.floor(random() * adjectives.length)]} Street`,
        phone: `+1 555 ${Math.floor(1000 + random() * 9000)}`,
        website: `www.${name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}.com`,
        openNow: random() > 0.3,
        image: `https://loremflickr.com/800/600/${cat.id}?lock=${idCounter}0`,
        images: [
          `https://loremflickr.com/800/600/${cat.id}?lock=${idCounter}1`, 
          `https://loremflickr.com/800/600/${cat.id}?lock=${idCounter}2`, 
          `https://loremflickr.com/800/600/${cat.id}?lock=${idCounter}3`
        ],
        description: `Professional and reliable ${cat.name.toLowerCase()} providing top-quality services to the local community.`,
        reviews: [
          {
            id: `r_gen_${idCounter}`,
            author: `User${Math.floor(random() * 1000)}`,
            rating: Math.floor(4 + random() * 2),
            comment: 'Good service, would recommend.',
            date: `2024-01-${Math.floor(10 + random() * 20)}`
          }
        ]
      });
    }
  });
  return generated;
};

export const mockBusinesses: Business[] = [...initialMockBusinesses, ...generateMoreBusinesses()];

export function getBusinessesByCategory(categoryId: string): Business[] {
  return mockBusinesses.filter(b => b.category === categoryId);
}

export function searchBusinesses(query: string): Business[] {
  const lowerQuery = query.toLowerCase();
  return mockBusinesses.filter(b => 
    b.name.toLowerCase().includes(lowerQuery) || 
    b.category.toLowerCase().includes(lowerQuery) ||
    b.description.toLowerCase().includes(lowerQuery)
  );
}

export function getBusinessById(id: string): Business | undefined {
  return mockBusinesses.find(b => b.id === id);
}
