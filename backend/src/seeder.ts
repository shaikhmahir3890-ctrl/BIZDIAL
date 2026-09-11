import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Category from './models/Category';
import Business from './models/Business';
import Review from './models/Review';
import connectDB from './config/db';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Review.deleteMany();
    await Business.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    // Create users
    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@bizdial.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'business_owner',
      },
    ]);

    const adminUserId = createdUsers[0]._id;
    const ownerUserId = createdUsers[2]._id;

    // Create categories
    const categories = [
      { name: 'Restaurants', slug: 'restaurants', description: 'Food and dining' },
      { name: 'Hotels', slug: 'hotels', description: 'Accommodation and lodging' },
      { name: 'Hospitals', slug: 'hospitals', description: 'Healthcare and hospitals' },
      { name: 'Beauty Spa', slug: 'beauty', description: 'Salons and spa services' },
      { name: 'Gyms', slug: 'gyms', description: 'Fitness centers' },
      { name: 'Dentists', slug: 'dentists', description: 'Dental care' },
      { name: 'Plumbers', slug: 'plumbers', description: 'Plumbing services' },
      { name: 'Electricians', slug: 'electricians', description: 'Electrical services' },
      { name: 'Mechanics', slug: 'mechanics', description: 'Auto repair services' },
    ];

    const createdCategories = await Category.insertMany(categories);

    // Create businesses
    const businesses = [
      {
        name: 'Spice Garden Restaurant',
        slug: 'spice-garden-restaurant',
        description: 'Multi-cuisine restaurant offering a dining experience with vibrant spices and a warm atmosphere.',
        category: createdCategories[0]._id,
        phone: '+1 234 567 8900',
        website: 'www.spicegarden.com',
        address: '123 Food Street',
        city: 'Downtown',
        state: 'NY',
        pincode: '10001',
        location: { type: 'Point' as const, coordinates: [-73.935242, 40.73061] },
        images: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        ],
        isVerified: true,
        owner: ownerUserId,
        rating: 4.5,
        reviewCount: 2
      },
      {
        name: 'Grand Plaza Luxury Hotel',
        slug: 'grand-plaza-luxury-hotel',
        description: 'Hotel with pool, skyline suites, full-service spa, and fine dining.',
        category: createdCategories[1]._id,
        phone: '+1 888 777 6666',
        website: 'www.grandplazahotel.com',
        address: '100 Luxury Blvd',
        city: 'City Center',
        state: 'NY',
        pincode: '10002',
        location: { type: 'Point' as const, coordinates: [-73.990242, 40.73061] },
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        ],
        isVerified: true,
        owner: ownerUserId,
        rating: 4.5,
        reviewCount: 1
      },
    ];

    const createdBusinesses = await Business.insertMany(businesses);

    // Create reviews
    await Review.insertMany([
      {
        business: createdBusinesses[0]._id,
        user: createdUsers[1]._id,
        rating: 5,
        comment: 'Great food and friendly service.',
      },
      {
        business: createdBusinesses[0]._id,
        user: createdUsers[2]._id,
        rating: 4,
        comment: 'Nice ambiance and good dishes.',
      },
      {
        business: createdBusinesses[1]._id,
        user: createdUsers[1]._id,
        rating: 5,
        comment: 'Very good stay. The staff was helpful.',
      },
    ]);

    // Update actual ratings/counts
    for (let biz of createdBusinesses) {
      await (Review as any).getAverageRating(biz._id);
    }

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Review.deleteMany();
    await Business.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
