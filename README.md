# eBuy - Enterprise E-commerce Solution

eBuy is an enterprise-grade e-commerce platform leveraging cutting-edge web technologies. Built as a monorepo using Nx, it provides a scalable, maintainable architecture that seamlessly integrates frontend and backend services.

## 🚀 Features

- Modern Angular-based frontend with responsive design
- NestJS-powered backend with GraphQL API
- Firebase Authentication and Admin SDK integration
- Prisma ORM for database management
- Stripe payment integration
- Apollo Client for GraphQL operations
- TailwindCSS and DaisyUI for styling

## 🛠️ Tech Stack

### Backend

- NestJS
- GraphQL
- Prisma
- Firebase Admin SDK
- Stripe API

### Frontend

- Angular 19
- Apollo Client
- TailwindCSS
- DaisyUI
- NgRx Signals
- RxJS

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project setup
- Stripe account
- PostgreSQL database

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ebuy.git
   cd ebuy
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory
   - Add necessary environment variables (see `.env.example`)

4. Set up Firebase:

   - Place your Firebase service account JSON file in the `apps` directory
   - Configure Firebase credentials in the backend

5. Start the development servers:

   ```bash
   # Start both frontend and backend
   npm run dev

   # Start frontend only
   npm run serve:frontend

   # Start backend only
   npm run serve:backend
   ```

## 🏗️ Project Structure

```
ebuy/
├── apps/
│   ├── eBuy-frontend/     # Angular frontend application
│   ├── eBuy-backend/      # NestJS backend application
│   └── service-account.json
├── packages/             # Shared libraries and utilities
├── dist/                 # Build output
└── node_modules/         # Dependencies
```

## Development Workflow

Nx provides a comprehensive development toolkit that enables:

### Core Commands

```bash
# Development Environment
nx serve              # Launch development environment for all applications
nx serve buy-frontend # Start frontend development server
nx serve buy-backend  # Start backend development server

# Build Pipeline
nx build              # Create production builds for all applications
nx affected:build     # Build only affected applications

# Testing Suite
nx test              # Execute unit tests across all applications
nx affected:test     # Run tests for affected applications only
```

- `npm run dev` - Start both frontend and backend in development mode
- `npm run serve:frontend` - Start frontend development server
- `npm run serve:backend` - Start backend development server
- `npm run build` - Build all applications
- `npm run start` - Start all applications in production mode

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ebuy"

# Firebase
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL="your-client-email"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

## 🎥 Demo

Watch our platform demonstration:

[▶️ Watch eBuy Demo Video](https://drive.google.com/file/d/your-video-id/view)

This demo showcases:

- User authentication flow
- Product browsing and filtering
- Shopping cart functionality
- Checkout process with Stripe
- Admin dashboard features
