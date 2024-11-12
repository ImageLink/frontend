import { Card, CardContent } from '@/components/ui/card';
import { Search, FileCheck, HandshakeIcon, Send } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Find Opportunities',
      description: 'Browse through our curated list of high-quality websites accepting image backlinks.',
    },
    {
      icon: FileCheck,
      title: 'Submit Proposal',
      description: 'Send your pitch directly to website owners with your image content ideas.',
    },
    {
      icon: HandshakeIcon,
      title: 'Agree on Terms',
      description: 'Discuss requirements and pricing with the publisher.',
    },
    {
      icon: Send,
      title: 'Submit Content',
      description: 'Upload and submit your image content for publication on the target website.',
    },
  ];

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get your images published on reputable websites in four simple steps
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <Card key={title} className="relative card-hover gradient-border">
              <CardContent className="pt-12 pb-8 px-6 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-4 bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] opacity-20">
                  <div
                    className="h-full bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]"
                    style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}