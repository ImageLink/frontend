import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoryNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Sorry, we couldn't find any listings in this category. Please try browsing other categories or return to the homepage.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}