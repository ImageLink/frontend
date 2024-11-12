import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Listing from '@/lib/db/models/Listing';
import { sendEmail } from '@/lib/email';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    
    const query: any = {};

    if (searchParams.get('status')) {
      query.status = searchParams.get('status');
    }

    if (searchParams.get('search')) {
      const search = searchParams.get('search');
      query.$or = [
        { domain: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    const listings = await Listing.find(query)
      .populate('userId', 'username')
      .sort({ createdAt: -1 });

    return NextResponse.json({ listings });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}