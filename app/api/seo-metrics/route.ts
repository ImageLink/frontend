import { NextResponse } from 'next/server';
import { fetchSeoMetrics } from '@/lib/seo-metrics';

export async function POST(req: Request) {
  try {
    const { domain } = await req.json();

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      );
    }

    const metrics = await fetchSeoMetrics(domain);
    return NextResponse.json(metrics);
  } catch (error: any) {
    console.error('SEO metrics error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch SEO metrics' },
      { status: 500 }
    );
  }
}