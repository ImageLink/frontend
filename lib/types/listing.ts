export interface Listing {
  id: string;
  userId: string;
  domain: string;
  description: string;
  categories: string[];
  da: number;
  dr: number;
  traffic: string;
  price: number;
  showPrice: boolean;
  requirements: string[];
  turnaround: string;
  linkType: 'dofollow' | 'nofollow' | 'both';
  status: 'pending' | 'active' | 'rejected';
  isPremium: boolean;
  languages: string[];
  seoMetrics: {
    moz: {
      da: number;
      pa: number;
      mozRank: number;
      links: number;
      spamScore: number;
    };
    semrush: {
      rank: number;
      keywords: number;
      traffic: string;
      trafficCost: string;
    };
    ahrefs: {
      rank: number;
      dr: number;
      backlinks: number;
      referringDomains: number;
    };
    majestic: {
      tf: number;
      cf: number;
      backlinks: number;
      referringDomains: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ListingFormData {
  domain: string;
  description: string;
  categories: string[];
  price: number;
  showPrice: boolean;
  requirements: string[];
  turnaround: string;
  linkType: 'dofollow' | 'nofollow' | 'both';
  languages: string[];
}