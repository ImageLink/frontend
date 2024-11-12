# ImageLink - Images Marketplace Platform

## Overview
ImageLink 
## Technical Architecture

### Frontend
- **Framework**: Next.js 13 with App Router
- **UI Library**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation

### Backend
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth with secure HTTP-only cookies
- **File Storage**: Local storage with image optimization
- **Email Service**: Nodemailer for transactional emails
- **SMS Service**: Twilio for phone verification

### Security Features
- CSRF protection
- XSS prevention
- Rate limiting
- Input sanitization
- Secure password hashing
- Phone number verification

## Database Schema

### Users Collection
```javascript
{
  email: String (unique),
  username: String (unique),
  password: String (hashed),
  phone: String (unique),
  whatsapp: String (optional),
  telegram: String (optional),
  role: Enum ['admin', 'user'],
  status: Enum ['active', 'suspended'],
  createdAt: Date,
  updatedAt: Date
}
```

### Categories Collection
```javascript
{
  name: String (unique),
  slug: String (unique),
  subcategories: [{
    name: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Listings Collection
```javascript
{
  userId: ObjectId,
  domain: String (unique),
  description: String,
  categories: [String],
  da: Number (0-100),
  dr: Number (0-100),
  traffic: String,
  price: Number (min: 20),
  showPrice: Boolean,
  requirements: [String],
  turnaround: String,
  linkType: Enum ['dofollow', 'nofollow', 'both'],
  status: Enum ['pending', 'active', 'rejected'],
  isPremium: Boolean,
  languages: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Messages Collection
```javascript
{
  senderId: ObjectId,
  receiverId: ObjectId,
  subject: String,
  content: String,
  status: Enum ['unread', 'read', 'replied'],
  replies: [{
    content: String,
    date: Date
  }],
  createdAt: Date
}
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout
- POST `/api/auth/verify` - Verify phone number

### Listings
- GET `/api/listings` - Get all listings
- POST `/api/listings` - Create new listing
- GET `/api/listings/:id` - Get listing details
- PUT `/api/listings/:id` - Update listing
- DELETE `/api/listings/:id` - Delete listing

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create category (admin)
- PUT `/api/categories/:id` - Update category (admin)
- DELETE `/api/categories/:id` - Delete category (admin)

### Messages
- GET `/api/messages` - Get user messages
- POST `/api/messages` - Send message
- PUT `/api/messages/:id/read` - Mark message as read
- POST `/api/messages/:id/reply` - Reply to message

### Admin
- GET `/api/admin/users` - Get all users
- PUT `/api/admin/users/:id` - Update user
- GET `/api/admin/listings` - Get all listings
- PUT `/api/admin/listings/:id` - Update listing status
- GET `/api/admin/messages` - Get all messages
- POST `/api/admin/messages/:id/reply` - Reply to message

## User Flows

### Publisher Flow
1. Sign up with email and phone verification
2. Add website listing with details
3. Wait for admin approval
4. Receive and respond to inquiries
5. Manage listings and messages

### Writer Flow
1. Browse available listings
2. Filter by category, DA, price, etc.
3. Contact publishers
4. Submit guest post requirements
5. Track responses and status

### Admin Flow
1. Review and approve listings
2. Manage users and categories
3. Monitor messages
4. Grant premium badges
5. Handle support requests

## Setup Instructions

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

4. Initialize the database
```bash
npm run db:init
```

5. Start the development server
```bash
npm run dev
```

## Deployment

The application is configured for deployment on various platforms:

### Vercel Deployment
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy with automatic CI/CD

### Manual Deployment
1. Build the application
```bash
npm run build
```

2. Start the production server
```bash
npm start
```

## Security Considerations

1. **Authentication**
   - JWT tokens with HTTP-only cookies
   - Phone number verification
   - Password hashing with bcrypt

2. **Data Protection**
   - Input sanitization
   - XSS prevention
   - CSRF protection
   - Rate limiting

3. **Access Control**
   - Role-based permissions
   - Route protection
   - API endpoint validation

## Monitoring and Maintenance

1. **Error Tracking**
   - Server-side error logging
   - Client-side error reporting
   - API request monitoring

2. **Performance**
   - Database query optimization
   - Image optimization
   - Caching strategies

3. **Backups**
   - Daily database backups
   - File storage backups
   - Environment configuration backups

## Future Enhancements

1. **Features**
   - Payment integration
   - Automated website verification
   - AI-powered content suggestions
   - Advanced analytics dashboard

2. **Technical**
   - Real-time notifications
   - Elasticsearch integration
   - CDN implementation
   - Mobile app development

3. **Business**
   - Subscription plans
   - Affiliate program
   - API access for partners
   - White-label solutions

## Support and Documentation

- Technical documentation
- User guides
- API documentation
- Support ticket system
- FAQ section

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
