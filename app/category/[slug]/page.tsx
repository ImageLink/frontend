import { Card } from "@/components/ui/card";
import { ListingHeader } from "@/components/listing/listing-header";
import { ListingContent } from "@/components/listing/listing-content";
import { listings } from "@/lib/data";
import { SearchBar } from "@/components/search-bar";
import { CategoryFilters } from "@/components/category/filters";
import { notFound } from "next/navigation";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// This would typically be fetched from your Supabase database
const categories = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    subcategories: [
      { id: '1-1', name: 'Web Development' },
      { id: '1-2', name: 'Mobile Apps' },
      { id: '1-3', name: 'AI & Machine Learning' },
    ],
    languages: ['English', 'Spanish', 'French'],
  },
  {
    id: '2',
    name: 'Marketing',
    slug: 'marketing',
    subcategories: [
      { id: '2-1', name: 'Digital Marketing' },
      { id: '2-2', name: 'Content Marketing' },
      { id: '2-3', name: 'SEO' },
    ],
    languages: ['English', 'German'],
  },
  {
    id: '3',
    name: 'Health',
    slug: 'health',
    subcategories: [
      { id: '3-1', name: 'Wellness' },
      { id: '3-2', name: 'Nutrition' },
      { id: '3-3', name: 'Fitness' },
    ],
    languages: ['English', 'Spanish'],
  },
  {
    id: '4',
    name: 'Finance',
    slug: 'finance',
    subcategories: [
      { id: '4-1', name: 'Personal Finance' },
      { id: '4-2', name: 'Investing' },
      { id: '4-3', name: 'Cryptocurrency' },
    ],
    languages: ['English', 'German'],
  },
  {
    id: '5',
    name: 'Travel',
    slug: 'travel',
    subcategories: [
      { id: '5-1', name: 'Adventure Travel' },
      { id: '5-2', name: 'Budget Travel' },
      { id: '5-3', name: 'Luxury Travel' },
    ],
    languages: ['English', 'French'],
  },
  {
    id: '6',
    name: 'Lifestyle',
    slug: 'lifestyle',
    subcategories: [
      { id: '6-1', name: 'Fashion' },
      { id: '6-2', name: 'Food' },
      { id: '6-3', name: 'Home & Living' },
    ],
    languages: ['English', 'Italian'],
  },
  {
    id: '7',
    name: 'Business',
    slug: 'business',
    subcategories: [
      { id: '7-1', name: 'Entrepreneurship' },
      { id: '7-2', name: 'Startups' },
      { id: '7-3', name: 'Management' },
    ],
    languages: ['English', 'German'],
  },
  {
    id: '8',
    name: 'Education',
    slug: 'education',
    subcategories: [
      { id: '8-1', name: 'Online Learning' },
      { id: '8-2', name: 'Higher Education' },
      { id: '8-3', name: 'Professional Development' },
    ],
    languages: ['English', 'Spanish'],
  },
];

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.slug);
  if (!category) return {};
  
  return {
    title: `${category.name} Guest Posts | ImageLink`,
    description: `Find high-quality guest posting opportunities in the ${category.name.toLowerCase()} niche.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  
  const category = categories.find(c => c.slug === slug);
  if (!category) {
    notFound();
  }
  
  const categoryListings = listings.filter(listing => 
    listing.categories.some(cat => cat.toLowerCase() === slug.toLowerCase())
  );

  if (categoryListings.length === 0) {
    notFound();
  }

  return (
    <>
      <section className="hero-gradient py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
              {category.name} Guest Posts
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Browse through our curated selection of {category.name.toLowerCase()} guest posting opportunities
            </p>
            <div className="w-full max-w-2xl">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <CategoryFilters 
              availableLanguages={category.languages}
              subcategories={category.subcategories}
            />
            <div className="grid gap-6 md:grid-cols-2">
              {categoryListings.map((listing) => (
                <Link key={listing.id} href={`/listing/${listing.id}`}>
                  <Card className="h-full card-hover gradient-border">
                    <ListingHeader listing={listing} compact />
                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">DA:</span>
                          <span className="ml-2 font-medium">{listing.da}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">PA:</span>
                          <span className="ml-2 font-medium">{listing.seoMetrics.pa}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Traffic:</span>
                          <span className="ml-2 font-medium">{listing.traffic}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price:</span>
                          <span className="ml-2 font-medium">${listing.price}</span>
                        </div>
                      </div>
                      <ListingContent listing={listing} compact />
                    </div>
                  </Card>
                </Link>
              ))}
              {categoryListings.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground">
                    No listings found in this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}