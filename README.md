# Authentication System

A secure authentication and authorization system built with Express.js featuring JWT authentication and role-based access control.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT authentication with 1-hour expiration
- Role-based access control (user, moderator, admin)
- Protected routes with different access levels
- User profile management
- Admin role management

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with:
    - PORT=3000
    - JWT_SECRET=key
    - JWT_EXPIRES_IN=1h

4. Start the server: `npm run dev`

## Testing

Use Postman or cURL to test the endpoints. Example requests are provided in the documentation.

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/profile` - Get user profile (authenticated)
- `PUT /api/profile` - Update profile (authenticated)
- `GET /api/public` - Public route
- `GET /api/public/protected` - Authenticated users only
- `GET /api/public/moderator` - Moderators and admins only
- `GET /api/public/admin` - Admins only
- `PUT /api/admin/users/:id/role` - Update user role (admin only)