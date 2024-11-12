import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { ApiService } from '@/lib/api-service';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filters = {
      category: searchParams.get('category') || undefined,
      minDa: searchParams.get('minDa') ? parseInt(searchParams.get('minDa')!) : undefined,
      maxDa: searchParams.get('maxDa') ? parseInt(searchParams.get('maxDa')!) : undefined,
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      status: searchParams.get('status') || undefined,
      userId: searchParams.get('userId') || undefined,
    };

    const { listings, error } = await ApiService.getListings(filters);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ listings });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const headersList = headers();
    const userId = headersList.get('x-user-id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await req.json();
    const { listing, error } = await ApiService.createListing({
      ...data,
      userId,
      status: 'pending'
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ listing });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}