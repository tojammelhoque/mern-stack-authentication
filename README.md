# MERN Stack Authentication System

A full-stack authentication system built with MongoDB, Express.js, React, and Node.js. This project provides a complete user authentication solution with email verification, password reset, and user management features.


## 🌟 Features

### Authentication
- **User Registration** with email verification
- **Secure Login** with JWT tokens (Access + Refresh tokens)
- **Password Reset** via email with secure tokens
- **Email Verification** with 6-digit codes
- **Session Management** with automatic token refresh
- **Logout** functionality

### Security
- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies for token storage
- CORS protection
- Rate limiting on sensitive endpoints
- Secure password reset flow
- Input validation with Zod schemas

### User Management
- View and update profile
- Change password
- Delete account
- Email verification status
- Last login tracking
- Account creation date

### Email Features
- Professional HTML email templates
- Email verification codes (15-minute expiry)
- Password reset links (1-hour expiry)
- Welcome emails
- Resend verification codes
- Powered by Resend API

## 🏗️ Architecture

### Backend (Node.js + Express + TypeScript)
```
backend/
├── src/
│   ├── config/          # Configuration files (DB, environment)
│   ├── controllers/     # Request handlers
│   ├── helpers/         # Utility functions (auth, verification)
│   ├── middleware/      # Auth & rate limiting middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── services/        # Email service
│   ├── templates/       # Email HTML templates
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Error handling & responses
│   └── index.ts         # Application entry point
├── Dockerfile
├── package.json
└── tsconfig.json
```

### Frontend (React + TypeScript + Vite)
```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/        # Authentication components
│   │   └── common/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Application pages
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # API service layer
│   ├── store/           # Zustand state management
│   ├── utils/           # Utility functions
│   ├── App.tsx
│   └── main.tsx
├── Dockerfile
├── package.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v24 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Resend API key (for emails)

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URI=mongodb://localhost:27017/auth-system

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Email (Resend)
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=MERN Auth System
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/mern-stack-authentication.git
cd mern-stack-authentication
```

#### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:5173

#### Production Build

**Build Backend:**
```bash
cd backend
npm run build
npm start
```

**Build Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🐳 Docker Deployment

### Using Docker Compose

Build and run both services:
```bash
docker-compose up --build
```

Stop services:
```bash
docker-compose down
```

### Individual Docker Builds

**Backend:**
```bash
cd backend
docker build -t auth-backend .
docker run -p 5000:5000 --env-file .env auth-backend
```

**Frontend:**
```bash
cd frontend
docker build --build-arg VITE_API_URL=http://localhost:5000/api/v1 -t auth-frontend .
docker run -p 3000:3000 auth-frontend
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Public Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Verify Email
```http
POST /auth/verify-email
Content-Type: application/json

{
  "code": "123456"
}
```

#### Forgot Password
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "newPassword": "NewSecurePass123"
}
```

#### Resend Verification Code
```http
POST /auth/resend-verification
Content-Type: application/json

{
  "email": "john@example.com"
}
```

### Protected Endpoints (Require Authentication)

#### Get Current User
```http
GET /auth/me
Cookie: accessToken=xxx; refreshToken=xxx
```

#### Update Profile
```http
PATCH /auth/profile
Cookie: accessToken=xxx; refreshToken=xxx
Content-Type: application/json

{
  "name": "John Smith"
}
```

#### Change Password
```http
PATCH /auth/change-password
Cookie: accessToken=xxx; refreshToken=xxx
Content-Type: application/json

{
  "currentPassword": "OldPass123",
  "newPassword": "NewSecurePass123"
}
```

#### Logout
```http
POST /auth/logout
Cookie: accessToken=xxx; refreshToken=xxx
```

#### Delete Account
```http
DELETE /auth/delete-account
Cookie: accessToken=xxx; refreshToken=xxx
Content-Type: application/json

{
  "password": "YourPassword123"
}
```

## 🔐 Security Features

### Token Strategy
- **Access Token**: Short-lived (15 minutes), stored in HTTP-only cookie
- **Refresh Token**: Long-lived (7 days), stored in HTTP-only cookie
- Automatic token refresh on expiration

### Rate Limiting
- **General API**: 100 requests per 15 minutes
- **Authentication routes**: 5 attempts per 15 minutes
- **Password reset**: 3 attempts per hour
- **Email verification**: 3 resends per 15 minutes

### Password Requirements
- Minimum 6 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Optional special characters for stronger security

## 🎨 Frontend Features

### UI Components
- Responsive design with Tailwind CSS
- Form validation with React Hook Form + Zod
- Toast notifications for user feedback
- Loading states and error handling
- Password strength meter
- Countdown timers for resend codes
- Modal dialogs for confirmations

### State Management
- Zustand for global auth state
- Persistent storage for user sessions
- Automatic state synchronization

### Routing
- Protected routes (require authentication)
- Public routes (redirect if authenticated)
- Email verification flow
- Password reset flow

## 📧 Email Templates

The system includes professional HTML email templates for:

1. **Verification Email**: 6-digit code with 15-minute expiry
2. **Welcome Email**: Sent after successful email verification
3. **Password Reset Email**: Secure link with 1-hour expiry

All templates are mobile-responsive and include:
- Gradient headers
- Clear call-to-action buttons
- Security warnings
- Company branding




## 🔧 Configuration

### MongoDB Indexes
The User model automatically creates an index on the `email` field for faster queries.

### CORS Configuration
By default, CORS is configured to accept requests from `http://localhost:5173`. Update in `backend/src/index.ts` for production.

### Cookie Settings
Cookies are configured with:
- `httpOnly: true` - Prevents JavaScript access
- `secure: true` - HTTPS only (disable in development)
- `sameSite: 'none'` - Cross-site requests allowed

## 📦 Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **resend**: Email service
- **validator**: Input validation
- **cookie-parser**: Cookie handling
- **cors**: CORS middleware
- **express-rate-limit**: Rate limiting
- **dotenv**: Environment variables
- **typescript**: Type safety

### Frontend
- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **react-hook-form**: Form handling
- **zod**: Schema validation
- **zustand**: State management
- **react-hot-toast**: Toast notifications
- **react-icons**: Icon library
- **tailwindcss**: Utility-first CSS
- **typescript**: Type safety

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)
1. Set environment variables
2. Use the provided Dockerfile
3. Expose port 5000

### Frontend Deployment (Vercel/Netlify)
1. Set `VITE_API_URL` environment variable
2. Build command: `npm run build`
3. Output directory: `dist`

### Docker Registry (DockerHub)
```bash
# Build and push
docker-compose build
docker-compose push
```

---

**⭐ If you find this project helpful, please give it a star!**
