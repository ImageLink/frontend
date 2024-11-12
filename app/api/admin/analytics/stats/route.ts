import { NextResponse } from 'next/server';
import { adminMiddleware } from '@/middleware/admin';
import { AdminService } from '@/lib/admin/services';

export async function GET(req: Request) {
  try {
    // Verify admin access
    const middlewareResponse = await adminMiddleware(req);
    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || 'week';

    const { stats, error } = await AdminService.getDashboardStats();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Calculate growth percentages
    const growth = {
      users: '+12%', // In a real app, calculate from historical data
      listings: '+8%',
      reports: '-5%',
      messages: '+15%',
    };

    return NextResponse.json({
      stats,
      growth,
      period,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}