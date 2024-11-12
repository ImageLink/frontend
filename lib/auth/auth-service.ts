import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User, { IUser } from '@/models/User';
import { SignUpData } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
  static async signUp(data: SignUpData): Promise<{ user: IUser | null; error: Error | null }> {
    try {
      await connectDB();

      // Check if user exists
      const existingUser = await User.findOne({
        $or: [
          { email: data.email },
          { username: data.username },
          { phone: data.phone }
        ]
      });

      if (existingUser) {
        return {
          user: null,
          error: new Error('User already exists')
        };
      }

      // Hash password
      const hashedPassword = await hash(data.password, 12);

      // Create user
      const user = await User.create({
        ...data,
        password: hashedPassword,
        role: 'user',
        status: 'active'
      });

      return {
        user,
        error: null
      };
    } catch (error) {
      return {
        user: null,
        error: error as Error
      };
    }
  }

  static async signIn(email: string, password: string): Promise<{ token: string | null; error: Error | null }> {
    try {
      await connectDB();

      const user = await User.findOne({ email });

      if (!user) {
        return {
          token: null,
          error: new Error('User not found')
        };
      }

      if (user.status === 'suspended') {
        return {
          token: null,
          error: new Error('Account is suspended')
        };
      }

      const isValid = await compare(password, user.password);

      if (!isValid) {
        return {
          token: null,
          error: new Error('Invalid password')
        };
      }

      const token = sign(
        { 
          id: user._id,
          email: user.email,
          role: user.role,
          username: user.username
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return {
        token,
        error: null
      };
    } catch (error) {
      return {
        token: null,
        error: error as Error
      };
    }
  }

  static async getUser(id: string): Promise<{ user: IUser | null; error: Error | null }> {
    try {
      await connectDB();

      const user = await User.findById(id).select('-password');

      if (!user) {
        return {
          user: null,
          error: new Error('User not found')
        };
      }

      if (user.status === 'suspended') {
        return {
          user: null,
          error: new Error('Account is suspended')
        };
      }

      return {
        user,
        error: null
      };
    } catch (error) {
      return {
        user: null,
        error: error as Error
      };
    }
  }

  static async verifyToken(token: string): Promise<{ user: IUser | null; error: Error | null }> {
    try {
      const decoded = sign(token, JWT_SECRET) as { id: string };
      return this.getUser(decoded.id);
    } catch (error) {
      return {
        user: null,
        error: error as Error
      };
    }
  }
}