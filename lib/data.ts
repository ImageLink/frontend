export interface Listing {
  id: string;
  domain: string;
  da: number;
  dr: number;
  traffic: string;
  price: number;
  description: string;
  categories: string[];
  requirements: string[];
  turnaround: string;
  image: string;
  isPremium?: boolean;
  siteScore?: number;
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
    facebook: {
      shares: number;
      comments: number;
      reactions: number;
    };
  };
}

export const listings: Listing[] = [
  {
    id: '1',
    domain: 'techblog.com',
    da: 65,
    dr: 70,
    traffic: '500K',
    price: 2,
    description: 'Looking for in-depth technical articles about web development, cloud computing, and software architecture.',
    categories: ['Technology', 'Programming', 'Web Development'],
    requirements: [
      'Minimum 2000 words',
      'Original content only',
      'Include code examples',
      'Technical accuracy required'
    ],
    turnaround: '5-7 days',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    isPremium: true,
    siteScore: 73, // Calculated from mozRank: 6.5 * 10 + 8
    seoMetrics: {
      moz: {
        da: 65,
        pa: 58,
        mozRank: 6.5,
        links: 15600,
        spamScore: 2
      },
      semrush: {
        rank: 12500,
        keywords: 8500,
        traffic: '500K',
        trafficCost: '$45K',
      },
      ahrefs: {
        rank: 15000,
        dr: 70,
        backlinks: 156000,
        referringDomains: 2800,
      },
      majestic: {
        tf: 45,
        cf: 38,
        backlinks: 145000,
        referringDomains: 2600,
      },
      facebook: {
        shares: 12500,
        comments: 3500,
        reactions: 25000,
      },
    },
  },
  {
    id: '2',
    domain: 'marketingpro.com',
    da: 55,
    dr: 58,
    traffic: '300K',
    price: 2,
    description: 'Seeking articles about digital marketing strategies, SEO, and content marketing.',
    categories: ['Marketing', 'SEO', 'Content Strategy'],
    requirements: [
      'Minimum 1500 words',
      'Case studies preferred',
      'Include statistics',
      'Actionable tips required'
    ],
    turnaround: '3-5 days',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    isPremium: false,
    siteScore: 68, // Calculated from mozRank: 6.0 * 10 + 8
    seoMetrics: {
      moz: {
        da: 55,
        pa: 48,
        mozRank: 6.0,
        links: 12400,
        spamScore: 3
      },
      semrush: {
        rank: 25000,
        keywords: 6200,
        traffic: '300K',
        trafficCost: '$28K',
      },
      ahrefs: {
        rank: 28000,
        dr: 58,
        backlinks: 98000,
        referringDomains: 1900,
      },
      majestic: {
        tf: 42,
        cf: 35,
        backlinks: 95000,
        referringDomains: 1800,
      },
      facebook: {
        shares: 8500,
        comments: 2200,
        reactions: 18000,
      },
    },
  },
  {
    id: '3',
    domain: 'startupweekly.com',
    da: 58,
    dr: 62,
    traffic: '250K',
    price: 2,
    description: 'Looking for articles about startup experiences, entrepreneurship, and business growth.',
    categories: ['Startups', 'Business', 'Entrepreneurship'],
    requirements: [
      'Minimum 2500 words',
      'Personal experience required',
      'Include metrics and results',
      'High-quality images needed'
    ],
    turnaround: '7-10 days',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop',
    isPremium: true,
    siteScore: 63, // Calculated from mozRank: 5.5 * 10 + 8
    seoMetrics: {
      moz: {
        da: 58,
        pa: 50,
        mozRank: 5.5,
        links: 13800,
        spamScore: 1
      },
      semrush: {
        rank: 18000,
        keywords: 7200,
        traffic: '250K',
        trafficCost: '$32K',
      },
      ahrefs: {
        rank: 22000,
        dr: 62,
        backlinks: 112000,
        referringDomains: 2100,
      },
      majestic: {
        tf: 39,
        cf: 42,
        backlinks: 108000,
        referringDomains: 2000,
      },
      facebook: {
        shares: 9800,
        comments: 2800,
        reactions: 21000,
      },
    },
  }
];