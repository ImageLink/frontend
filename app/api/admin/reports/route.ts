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
    const filters = {
      status: searchParams.get('status') || undefined,
      search: searchParams.get('search') || undefined,
    };

    const { reports, error } = await AdminService.getReports(filters);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ reports });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    // Verify admin access
    const middlewareResponse = await adminMiddleware(req);
    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    const { id, ...data } = await req.json();
    const { report, error } = await AdminService.updateReport(id, data);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ report });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}