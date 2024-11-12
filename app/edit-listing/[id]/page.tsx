import { EditListingForm } from '@/components/edit-listing/form';
import { Header } from '@/components/edit-listing/header';

// Mock data for static generation
const listings = [
  { id: '1', title: 'Tech Blog' },
  { id: '2', title: 'Travel Blog' },
  { id: '3', title: 'Food Blog' },
];

export function generateStaticParams() {
  return listings.map((listing) => ({
    id: listing.id,
  }));
}

export default function EditListingPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8 px-4">
      <Header />
      <EditListingForm id={params.id} />
    </div>
  );
}