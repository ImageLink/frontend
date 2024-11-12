import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongoose';
import Requirement from '@/models/Requirement';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    
    const query: any = { status: 'open' };
    
    if (searchParams.get('category')) {
      query.category = searchParams.get('category');
    }
    if (searchParams.get('language')) {
      query.language = searchParams.get('language');
    }

    const requirements = await Requirement.find(query)
      .sort({ createdAt: -1 })
      .populate('userId', 'username');

    return NextResponse.json(requirements);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch requirements' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const data = await req.json();
    
    const requirement = await Requirement.create({
      ...data,
      userId: session.user.id,
    });

    return NextResponse.json(requirement, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create requirement' },
      { status: 500 }
    );
  }
}