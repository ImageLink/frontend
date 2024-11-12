import { Card } from '@/components/ui/card';
import { SignUpForm } from '@/components/auth/signup-form';

export default function SignUpPage() {
  return (
    <div className="min-h-screen hero-gradient py-16">
      <div className="container px-4 md:px-6 flex justify-center items-center">
        <Card className="w-full max-w-md p-8 gradient-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
              Create an Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Join PostMarket to start publishing or finding opportunities
            </p>
          </div>
          <SignUpForm />
        </Card>
      </div>
    </div>
  );
}