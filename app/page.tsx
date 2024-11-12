import { Card } from "@/components/ui/card";
import { ListingHeader } from "@/components/listing/listing-header";
import { ListingContent } from "@/components/listing/listing-content";
import { listings } from "@/lib/data";
import { SearchBar } from "@/components/search-bar";
import { Categories } from "@/components/categories";
import { FeaturedListings } from "@/components/featured-listings";
import { HowItWorks } from "@/components/how-it-works";
import { HomepageFilters } from "@/components/homepage-filters";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero-gradient py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-gradient">
              Find Free Image Link Opportunities
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with top publishers and grow your online presence through quality image
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
            <HomepageFilters />
          </div>
        </div>
      </section>

      <Categories />
      <FeaturedListings />
      <HowItWorks />

      <section className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl font-bold tracking-tight text-gradient text-center mb-8">
            Latest Opportunities
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Link key={listing.id} href={`/listing/${listing.id}`}>
                <Card className="h-full card-hover gradient-border">
                  <ListingHeader listing={listing} compact />
                  <ListingContent listing={listing} compact />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}