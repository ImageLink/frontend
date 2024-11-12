'use client';

import { Card, CardContent } from "@/components/ui/card";
import { 
  Blocks, 
  Database, 
  Layout, 
  Shield, 
  Zap,
  Palette,
  Server,
  Code
} from "lucide-react";

const technologies = [
  {
    category: "Frontend",
    icon: Layout,
    items: [
      { name: "Next.js 13", description: "React framework with App Router" },
      { name: "React", description: "UI component library" },
      { name: "TypeScript", description: "Type-safe JavaScript" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" }
    ]
  },
  {
    category: "UI Components",
    icon: Palette,
    items: [
      { name: "shadcn/ui", description: "Reusable component library" },
      { name: "Lucide Icons", description: "Beautiful icon set" },
      { name: "Tailwind Variants", description: "Dynamic styling utilities" },
      { name: "Recharts", description: "Composable charting library" }
    ]
  },
  {
    category: "Backend & Database",
    icon: Database,
    items: [
      { name: "Node.js", description: "JavaScript runtime" },
      { name: "Express", description: "Web framework" },
      { name: "Supabase", description: "Open source Firebase alternative" },
      { name: "PostgreSQL", description: "Relational database" }
    ]
  },
  {
    category: "Authentication",
    icon: Shield,
    items: [
      { name: "Supabase Auth", description: "User authentication" },
      { name: "JWT", description: "JSON Web Tokens" },
      { name: "Row Level Security", description: "Database access control" },
      { name: "OTP Verification", description: "Two-factor authentication" }
    ]
  },
  {
    category: "Development Tools",
    icon: Code,
    items: [
      { name: "ESLint", description: "Code linting" },
      { name: "Prettier", description: "Code formatting" },
      { name: "TypeScript", description: "Static type checking" },
      { name: "Git", description: "Version control" }
    ]
  },
  {
    category: "APIs & Integration",
    icon: Server,
    items: [
      { name: "REST API", description: "HTTP endpoints" },
      { name: "Twilio", description: "SMS notifications" },
      { name: "Nodemailer", description: "Email service" },
      { name: "Rate Limiting", description: "API protection" }
    ]
  },
  {
    category: "State Management",
    icon: Blocks,
    items: [
      { name: "React Context", description: "Global state management" },
      { name: "React Query", description: "Server state management" },
      { name: "Zustand", description: "Client state management" },
      { name: "React Hook Form", description: "Form state management" }
    ]
  },
  {
    category: "Performance",
    icon: Zap,
    items: [
      { name: "Next.js", description: "Server-side rendering" },
      { name: "Image Optimization", description: "Automatic image optimization" },
      { name: "Code Splitting", description: "Dynamic imports" },
      { name: "Caching", description: "Static & dynamic caching" }
    ]
  }
];

export function Technologies() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
            Built with Modern Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform leverages cutting-edge technologies to provide a robust, scalable, and secure experience
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <Card key={tech.category} className="card-hover gradient-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))]">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold">{tech.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {tech.items.map((item) => (
                      <li key={item.name} className="text-sm">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground block text-xs">
                          {item.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}