import { z } from 'zod';

const SEO_API_KEY = process.env.SEO_RANK_API_KEY!;
const SEO_API_URL = 'https://seo-rank.my-addr.com/api/v3';

export const seoMetricsSchema = z.object({
  domain: z.string(),
  moz: z.object({
    da: z.number(),
    pa: z.number(),
    mozRank: z.number(),
    links: z.number(),
    spamScore: z.number(),
  }),
  semrush: z.object({
    rank: z.number(),
    keywords: z.number(),
    traffic: z.string(),
    trafficCost: z.string(),
  }),
  ahrefs: z.object({
    rank: z.number(),
    dr: z.number(),
    backlinks: z.number(),
    referringDomains: z.number(),
  }),
  majestic: z.object({
    tf: z.number(),
    cf: z.number(),
    backlinks: z.number(),
    referringDomains: z.number(),
  }),
});

export type SeoMetrics = z.infer<typeof seoMetricsSchema>;

export async function fetchSeoMetrics(domain: string): Promise<SeoMetrics> {
  try {
    const params = new URLSearchParams({
      api_key: SEO_API_KEY,
      domain,
      moz: '1',
      semrush: '1',
      ahrefs: '1',
      majestic: '1',
    });

    const response = await fetch(`${SEO_API_URL}?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch SEO metrics');
    }

    return seoMetricsSchema.parse(data);
  } catch (error) {
    console.error('SEO metrics error:', error);
    throw error;
  }
}