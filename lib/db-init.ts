import { connectDB } from './mongodb';
import User from '@/models/User';
import { hash } from 'bcryptjs';

export async function initializeDatabase() {
  try {
    await connectDB();

    // Add default users if they don't exist
    const defaultUsers = [
      {
        email: 'admin@example.com',
        username: 'admin',
        password: await hash('Admin@123', 12),
        phone: '+1234567890',
        role: 'admin',
      },
      {
        email: 'user@example.com',
        username: 'user',
        password: await hash('User@123', 12),
        phone: '+1987654321',
        role: 'user',
      }
    ];

    for (const userData of defaultUsers) {
      await User.findOneAndUpdate(
        { email: userData.email },
        { $setOnInsert: userData },
        { upsert: true, new: true }
      );
    }

    console.log('Database initialized with default users');
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}