import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/db/seed';

export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({
      message: 'Database seeded successfully',
      users: [
        { email: 'admin@example.com', password: 'Admin@123' },
        { email: 'user@example.com', password: 'User@123' }
      ]
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}