import { NextResponse } from 'next/server';
import { adminMiddleware } from '@/middleware/admin';
import { AdminService } from '@/lib/admin/services';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin access
    const middlewareResponse = await adminMiddleware(req);
    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    const { reports, error } = await AdminService.getReports({ id: params.id });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    const report = reports?.[0];
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin access
    const middlewareResponse = await adminMiddleware(req);
    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    const data = await req.json();
    const { report, error } = await AdminService.updateReport(params.id, data);

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