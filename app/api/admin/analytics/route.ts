import { NextResponse } from 'next/server';
import { adminMiddleware } from '@/middleware/admin';
import { AdminService } from '@/lib/admin/services';
import { formatStats } from '@/lib/admin/utils';

export async function GET(req: Request) {
  try {
    // Verify admin access
    const middlewareResponse = await adminMiddleware(req);
    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    const { stats, error } = await AdminService.getDashboardStats();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    const formattedStats = formatStats(stats);
    return NextResponse.json({ stats: formattedStats });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}