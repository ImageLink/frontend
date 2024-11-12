import { hash } from 'bcryptjs';
import connectDB from './config';
import { User, Category, Listing } from '@/models';

export async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Listing.deleteMany({}),
    ]);

    // Create admin user
    const adminPassword = await hash('Admin@123', 12);
    const admin = await User.create({
      email: 'admin@example.com',
      username: 'Admin',
      password: adminPassword,
      phone: '+1234567890',
      role: 'admin',
      status: 'active',
    });

    // Create regular user
    const userPassword = await hash('User@123', 12);
    const user = await User.create({
      email: 'user@example.com',
      username: 'User',
      password: userPassword,
      phone: '+1987654321',
      role: 'user',
      status: 'active',
    });

    // Create categories
    const categories = await Category.create([
      {
        name: 'Technology',
        slug: 'technology',
        subcategories: [
          { name: 'Web Development' },
          { name: 'Mobile Apps' },
          { name: 'AI & Machine Learning' },
        ],
      },
      {
        name: 'Marketing',
        slug: 'marketing',
        subcategories: [
          { name: 'Digital Marketing' },
          { name: 'Content Marketing' },
          { name: 'SEO' },
        ],
      },
    ]);

    // Create sample listings
    await Listing.create([
      {
        userId: user._id,
        domain: 'techblog.com',
        description: 'A leading tech blog accepting guest posts',
        categories: ['Technology'],
        da: 65,
        dr: 70,
        traffic: '500K',
        price: 299,
        showPrice: true,
        requirements: [
          'Minimum 2000 words',
          'Original content only',
          'Include code examples',
        ],
        turnaround: '5-7 days',
        linkType: 'dofollow',
        status: 'active',
        isPremium: true,
        languages: ['English'],
        seoMetrics: {
          moz: {
            da: 65,
            pa: 58,
            mozRank: 6.5,
            links: 15600,
            spamScore: 2,
          },
          semrush: {
            rank: 12500,
            keywords: 8500,
            traffic: '500K',
            trafficCost: '$45K',
          },
          ahrefs: {
            rank: 15000,
            dr: 70,
            backlinks: 156000,
            referringDomains: 2800,
          },
          majestic: {
            tf: 45,
            cf: 38,
            backlinks: 145000,
            referringDomains: 2600,
          },
        },
      },
    ]);

    console.log('Database seeded successfully');
    return { success: true };
  } catch (error) {
    console.error('Database seeding error:', error);
    throw error;
  }
}