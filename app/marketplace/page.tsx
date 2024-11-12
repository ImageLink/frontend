import { Card } from '@/components/ui/card';
import { SearchBar } from '@/components/search-bar';
import { MarketplaceFilters } from '@/components/marketplace/filters';
import { MarketplaceGrid } from '@/components/marketplace/grid';

export default function MarketplacePage() {
  return (
    <>
      <section className="relative hero-gradient py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
              Guest Post Marketplace
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Browse through our curated selection of high-quality guest posting opportunities.
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
            <MarketplaceFilters />
            <MarketplaceGrid />
          </div>
        </div>
      </section>
    </>
  );
}