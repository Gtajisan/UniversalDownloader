# Universal Downloader

## Overview

Universal Downloader is a single-page web application that allows users to download videos and media from 15+ platforms including TikTok, YouTube, Instagram, Facebook, Twitter, and more. The application features an anime/cyberpunk aesthetic inspired by Vocaloid themes with neon accents and glass-morphism effects. It provides a simple URL input interface that automatically detects the platform and fetches downloadable media with quality selection options.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Single-page application (SPA) architecture with wouter for minimal routing
- Component-based architecture using functional components with hooks

**UI Component System**
- shadcn/ui component library (Radix UI primitives) for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Design system follows anime/cyberpunk aesthetic with glass-morphism effects
- Custom color palette with cyan/pink gradients for neon effects
- Typography: Inter (body), Orbitron (headings), JetBrains Mono (technical text)

**State Management**
- TanStack Query (React Query) for server state management and API caching
- React Hook Form with Zod for form validation and state
- Local component state using useState/useEffect hooks
- Toast notifications for user feedback

**Key Design Patterns**
- Glass-morphism cards with backdrop blur and semi-transparent backgrounds
- Fixed background with Miku dancing animation
- Floating main container centered on viewport
- Responsive grid layouts for platform badges
- Animated particles and gradient overlays for visual interest

### Backend Architecture

**Server Framework**
- Express.js as the web server framework
- TypeScript for type safety across the stack
- ESM (ECMAScript Modules) for modern module system
- HTTP server creation for handling requests

**API Design**
- RESTful API endpoints under `/api/*` prefix
- POST `/api/download` - Main endpoint for download requests
- GET `/api/health` - Health check endpoint
- JSON request/response format
- Input validation using Zod schemas

**Business Logic**
- URL validation and platform detection
- Proxy pattern: forwards requests to external API (`neoaz.is-a.dev/api/alldl`)
- Error handling with user-friendly messages
- Response transformation from external API format

**Storage Layer**
- In-memory storage implementation (`MemStorage`) for user data
- Interface-based design (`IStorage`) allows future database integration
- User schema defined with Drizzle ORM for PostgreSQL compatibility
- Currently uses memory storage but prepared for database migration

### External Dependencies

**Third-Party APIs**
- Primary download service: `https://neoaz.is-a.dev/api/alldl`
  - Handles actual media extraction from 15+ platforms
  - Returns video metadata (title, thumbnail, author, duration)
  - Provides multiple quality options with download URLs
  - Backend proxies requests to this service

**Database (Configured but Optional)**
- PostgreSQL with Neon serverless driver (@neondatabase/serverless)
- Drizzle ORM for type-safe database queries
- Schema defined for users table with UUID primary keys
- Connection configured via `DATABASE_URL` environment variable
- Currently not actively used (in-memory storage in use)

**UI Component Libraries**
- Radix UI primitives for 20+ accessible components
- React Icons (simple-icons) for platform logos
- Embla Carousel for potential carousel features
- cmdk for command palette functionality

**Development Tools**
- Replit-specific plugins for development environment
- Runtime error overlay for debugging
- Dev banner and cartographer for Replit integration

**Styling Dependencies**
- Tailwind CSS with PostCSS for processing
- class-variance-authority for component variant management
- clsx and tailwind-merge for className composition
- Custom Tailwind configuration with design tokens

**Form & Validation**
- React Hook Form for form state management
- Zod for runtime schema validation
- @hookform/resolvers for Zod integration
- drizzle-zod for database schema validation

**Platform Support**
The application is designed to support media downloads from:
- TikTok, YouTube, Instagram, Facebook, Twitter/X
- Pinterest, Spotify, SoundCloud, Snapchat, Reddit
- Google Drive, Douyin, Xiaohongshu, MediaFire, CapCut
