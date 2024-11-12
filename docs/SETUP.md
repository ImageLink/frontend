# ImageLink - Images Market



## Core Features

### For Publishers
- List websites with detailed metrics (DA, DR, traffic)
- Set pricing and content requirements
- Manage multiple listings
- Premium listing badges
- Multi-language support
- Custom content guidelines
- Message management system
- Browse guest posting opportunities
- Advanced search and filtering
- Category-based navigation
- Direct messaging with publishers
- Submit guest post requirements
- Track submissions and responses

### For Admins
- Complete user management
- Listing approval system
- Category & subcategory management
- Message monitoring
- Premium badge management
- Analytics and reporting

## Technology Stack

### Frontend
- **Framework**: Next.js 13 with App Router
- **UI Library**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Backend
- **Database**: 
  - Supabase (Primary)
  - MongoDB (Secondary/Analytics)
- **Authentication**: Supabase Auth with JWT
- **File Storage**: Supabase Storage
- **Email Service**: Nodemailer
- **SMS Service**: Twilio
- **Caching**: Redis
- **Monitoring**: Prometheus + Winston

### Infrastructure
- **Hosting**: Vercel (Frontend) + Railway (Backend)
- **CDN**: Vercel Edge Network
- **Database Hosting**: 
  - Supabase Cloud
  - MongoDB Atlas
- **Cache**: Upstash Redis
- **Monitoring**: Grafana Cloud

## Database Schema

### Supabase Schema

```sql
-- Enable RLS
alter table auth.users enable row level security;

-- Custom types
create type user_role as enum ('admin', 'user');
create type listing_status as enum ('pending', 'active', 'rejected');
create type message_status as enum ('unread', 'read', 'archived');
create type report_status as enum ('open', 'in_progress', 'resolved');
create type link_type as enum ('dofollow', 'nofollow', 'both');

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade,
  username text unique not null,
  email text unique not null,
  phone text unique not null,
  whatsapp text,
  telegram text,
  role user_role default 'user',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (id)
);

-- Categories table
create table public.categories (
  id serial primary key,
  name text unique not null,
  slug text unique not null,
  created_at timestamptz default now()
);

-- Websites table
create table public.websites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  url text unique not null,
  title text not null,
  description text not null,
  category_id integer references categories,
  da integer check (da >= 0 and da <= 100),
  traffic text,
  price decimal check (price >= 20),
  show_price boolean default true,
  link_type link_type not null,
  status listing_status default 'pending',
  turnaround text not null,
  guidelines text[] not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Messages table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references auth.users,
  receiver_id uuid references auth.users,
  subject text not null,
  content text not null,
  status message_status default 'unread',
  created_at timestamptz default now()
);
```

### MongoDB Schema (Analytics)

```javascript
// Analytics Schema
const analyticsSchema = new Schema({
  websiteId: { type: String, required: true },
  views: Number,
  inquiries: Number,
  conversionRate: Number,
  averageResponseTime: Number,
  timestamp: Date
});

// Metrics Schema
const metricsSchema = new Schema({
  websiteId: { type: String, required: true },
  da: Number,
  dr: Number,
  traffic: String,
  backlinks: Number,
  referringDomains: Number,
  timestamp: Date
});

// User Activity Schema
const userActivitySchema = new Schema({
  userId: { type: String, required: true },
  action: String,
  details: Object,
  timestamp: Date
});
```

## Setup Instructions

### Prerequisites
1. Node.js 18+
2. Supabase Account
3. MongoDB Atlas Account
4. Redis Instance (Upstash)
5. Twilio Account
6. SMTP Server (for emails)

### Environment Variables

Create `.env.local` for frontend:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=your_backend_url
```

Create `.env` for backend:

```bash
PORT=5000
NODE_ENV=development

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key

# MongoDB
MONGODB_URI=your_mongodb_uri

# Redis
REDIS_URL=your_redis_url

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone

# Email
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

### Development Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd guest-post-marketplace
```

2. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

3. Initialize database:
```bash
# Run Supabase migrations
supabase db reset

# Seed initial data
npm run seed
```

4. Start development servers:
```bash
# Frontend
npm run dev

# Backend
npm run dev
```

### Production Deployment

#### Frontend (Vercel)
1. Connect GitHub repository
2. Configure environment variables
3. Deploy with automatic CI/CD

#### Backend (Railway)
1. Create new project
2. Connect GitHub repository
3. Configure environment variables
4. Deploy with automatic CI/CD

#### Database Setup
1. Create Supabase project
2. Run migrations
3. Configure RLS policies
4. Create MongoDB Atlas cluster
5. Set up database indexes

#### Monitoring Setup
1. Configure Prometheus metrics
2. Set up Grafana dashboards
3. Configure Winston logging
4. Set up error tracking (Sentry)

## Security Considerations

1. **Authentication**
   - JWT tokens with HTTP-only cookies
   - Phone verification
   - Password hashing with bcrypt

2. **Data Protection**
   - Input sanitization
   - XSS prevention
   - CSRF protection
   - Rate limiting

3. **Access Control**
   - Role-based permissions
   - Row Level Security
   - API endpoint validation

## Performance Optimization

1. **Caching Strategy**
   - Redis for API responses
   - Supabase edge functions
   - Next.js static generation

2. **Database**
   - Proper indexing
   - Query optimization
   - Connection pooling

3. **Frontend**
   - Code splitting
   - Image optimization
   - Bundle size optimization

## Monitoring and Maintenance

1. **Error Tracking**
   - Winston logging
   - Prometheus metrics
   - Grafana dashboards

2. **Performance**
   - API response times
   - Database query times
   - Cache hit rates

3. **Backups**
   - Daily database backups
   - File storage backups
   - Configuration backups

## Support and Documentation

For additional support:
1. Technical documentation
2. API documentation
3. User guides
4. Support ticket system
5. FAQ section
