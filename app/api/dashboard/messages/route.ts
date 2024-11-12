import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/mongoose';
import Message from '@/models/Message';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: Request) {
  try {
    const token = cookies().get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verify(token, JWT_SECRET) as { id: string };
    await dbConnect();

    const messages = await Message.find({
      $or: [
        { senderId: decoded.id },
        { receiverId: decoded.id }
      ]
    })
    .populate('senderId', 'username')
    .populate('receiverId', 'username')
    .sort({ createdAt: -1 });

    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const token = cookies().get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verify(token, JWT_SECRET) as { id: string };
    const data = await req.json();

    await dbConnect();

    const message = await Message.create({
      ...data,
      senderId: decoded.id,
      status: 'unread'
    });

    return NextResponse.json({ message });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}