import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Listing from '@/lib/db/models/Listing';
import { sendEmail } from '@/lib/email';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const listing = await Listing.findById(params.id)
      .populate('userId', 'username email');

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await req.json();
    await dbConnect();

    const listing = await Listing.findByIdAndUpdate(
      params.id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    ).populate('userId', 'email');

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // If status was updated, notify the owner
    if (updates.status) {
      const action = updates.status === 'active' ? 'approved' : 'rejected';
      await sendEmail({
        to: listing.userId.email,
        subject: `Listing ${action}`,
        html: `Your listing for ${listing.domain} has been ${action}.`,
      });
    }

    return NextResponse.json({ listing });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const listing = await Listing.findByIdAndDelete(params.id)
      .populate('userId', 'email');
    
    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Notify owner
    await sendEmail({
      to: listing.userId.email,
      subject: 'Listing Deleted',
      html: `Your listing for ${listing.domain} has been deleted.`,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}