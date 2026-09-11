import { 
  categories as defaultCategories, 
  mockBusinesses as defaultBusinesses, 
  getBusinessById as getDefaultBusinessById,
  getBusinessesByCategory as getDefaultBusinessesByCategory,
  searchBusinesses as defaultSearchBusinesses,
  Business as MockBusiness,
  Review as MockReview
} from './mock-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export type Review = MockReview;
export type Business = MockBusiness;

// Helper to map category icons from mock data if backend doesn't provide one
const categoryIconMap: Record<string, string> = {
  restaurants: '🍽️',
  hotels: '🏨',
  hospitals: '🏥',
  beauty: '💆',
  gyms: '🏋️',
  education: '🎓',
  dentists: '🦷',
  plumbers: '🔧',
  electricians: '⚡',
  salons: '✂️',
  mechanics: '🚗',
  petshops: '🐾',
  realestate: '🏠',
  events: '🎉',
  loans: '💰',
  packers: '📦',
};

// Mapper to convert backend business to frontend shape
const mapBusiness = (backendBusiness: any, backendReviews: any[] = []): Business => {
  return {
    id: backendBusiness._id || backendBusiness.id,
    name: backendBusiness.name,
    category: backendBusiness.category?.slug || backendBusiness.category || 'unknown',
    rating: backendBusiness.rating || 4.5,
    reviewsCount: backendBusiness.reviewCount || backendBusiness.reviewsCount || 0,
    address: backendBusiness.address || '',
    phone: backendBusiness.phone || '',
    website: backendBusiness.website || '',
    openNow: backendBusiness.openNow ?? true,
    image: backendBusiness.images && backendBusiness.images.length > 0 ? backendBusiness.images[0] : (backendBusiness.image || ''),
    images: backendBusiness.images && backendBusiness.images.length > 0 ? backendBusiness.images : [backendBusiness.image || ''],
    description: backendBusiness.description || '',
    reviews: (backendReviews.length > 0 ? backendReviews : (backendBusiness.reviews || [])).map((r: any) => ({
      id: r._id || r.id || String(Math.random()),
      author: r.user?.name || r.author || 'Anonymous',
      rating: r.rating || 5,
      comment: r.comment || '',
      date: r.createdAt ? new Date(r.createdAt).toISOString().split('T')[0] : (r.date || '2025-01-01'),
    })),
  };
};

export const fetchCategories = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_URL}/categories`, { cache: 'no-store', signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.data) && data.data.length > 0) {
        return data.data.map((c: any) => ({
          id: c.slug || c._id,
          name: c.name,
          icon: categoryIconMap[c.slug] || c.icon || '📌',
        }));
      }
    }
  } catch (error) {
    // Backend offline or unreachable
  }
  return defaultCategories;
};

export const fetchBusinesses = async (search?: string, categorySlug?: string) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    let url = `${API_URL}/businesses?limit=50`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      let businesses = data.data || [];
      if (categorySlug) {
        businesses = businesses.filter((b: any) => (b.category?.slug || b.category) === categorySlug);
      }
      if (businesses.length > 0) {
        return businesses.map((b: any) => mapBusiness(b));
      }
    }
  } catch (error) {
    // Backend offline or unreachable
  }

  // Fallback to local rich mock businesses
  if (categorySlug) {
    return getDefaultBusinessesByCategory(categorySlug);
  }
  if (search) {
    return defaultSearchBusinesses(search);
  }
  return defaultBusinesses;
};

export const fetchBusinessById = async (id: string): Promise<Business | undefined> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const [bizRes, reviewRes] = await Promise.all([
      fetch(`${API_URL}/businesses/${id}`, { cache: 'no-store', signal: controller.signal }),
      fetch(`${API_URL}/businesses/${id}/reviews`, { cache: 'no-store', signal: controller.signal })
    ]);
    clearTimeout(timeoutId);

    if (bizRes.ok) {
      const bizData = await bizRes.json();
      const reviewData = reviewRes.ok ? await reviewRes.json() : { data: [] };
      if (bizData.data) {
        return mapBusiness(bizData.data, reviewData.data);
      }
    }
  } catch (error) {
    // Backend offline or unreachable
  }

  // Fallback to local mock data
  return getDefaultBusinessById(id);
};

