# Na Hora - Pet Grooming Appointment Platform

A modern web application for pet grooming appointment scheduling and business management. It provides a public-facing booking interface for pet owners and a comprehensive admin dashboard for grooming companies to manage appointments, staff, services, pricing, and operating hours.

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5 (with SWC)
- **UI Library:** Ant Design 5
- **Routing:** React Router DOM 6
- **Data Fetching:** TanStack React Query 5 + Axios
- **Date Handling:** dayjs (with timezone support) and date-fns
- **Deployment:** Cloudflare Pages (via Wrangler)

## Project Structure

```
src/
├── adapters/              # Axios HTTP client configuration
├── buttons/               # Reusable button components
├── components/
│   ├── admin/             # Login, password reset flows
│   ├── appointment/       # Multi-step booking wizard (8 steps)
│   ├── dashboard/         # Admin panel (sidebar, navbar, registers)
│   ├── register-company/  # Company registration flow
│   ├── inputs/            # Custom input components
│   ├── errors/            # Error boundary
│   └── global-alert/      # Toast notification system
├── contexts/              # React Context providers
├── hooks/
│   ├── na-hora/           # API integration hooks (~43 hooks)
│   │   ├── appointments/  # Appointment CRUD + scheduling
│   │   ├── user/          # Authentication
│   │   ├── company/       # Company management
│   │   ├── operators/     # Staff management
│   │   ├── pet-services/  # Service configuration
│   │   ├── pet-types/     # Pet type management
│   │   ├── pet-sizes/     # Pet size management
│   │   ├── pet-hairs/     # Pet hair type management
│   │   ├── company-hour/  # Operating hours
│   │   └── company-hour-block/ # Blocked time slots
│   └── providers/         # Third-party hooks (ViaCEP)
├── pages/                 # Route page components
│   ├── admin/             # Admin portal
│   ├── appointment/       # Public booking page
│   ├── confirmation/      # Appointment confirmation
│   ├── company/           # Company registration
│   └── dashboard/         # Admin dashboard pages
├── routes/                # Route definitions + AuthGuard
└── utils/                 # Helpers (currency, masks, CNPJ validation)
```

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (or your preferred package manager)
- **Na Hora API** running locally or accessible remotely (see [Backend API](#backend-api))

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the environment model file and set the API URL:

```bash
cp .env.model .env
```

Edit `.env` and set:

```env
VITE_API_URL=http://localhost:3333/api/v1
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Compile TypeScript and build for production |
| `npm run lint` | Run ESLint with zero warnings policy |
| `npm run preview` | Preview the production build locally |
| `npm run preview:worker` | Preview on Cloudflare Workers locally |
| `npm run deploy` | Deploy to Cloudflare Pages |

## Backend API

This is a frontend-only application. It requires the **Na Hora API** backend to be running separately. The backend handles all data persistence, business logic, and authentication.

The API base URL is configured via the `VITE_API_URL` environment variable.

### Key API Resources

| Resource | Description |
|---|---|
| `/users` | Authentication (login, password reset) |
| `/appointments` | Appointment CRUD, scheduling, availability |
| `/companies` | Company registration and management |
| `/operator` | Staff/operator management |
| `/pet-services` | Grooming service configuration and pricing |
| `/pet-types`, `/pet-sizes`, `/pet-hairs` | Pet attribute management |
| `/companies/hour` | Operating hours configuration |
| `/companies/hour-blocks` | Blocked time slots |

## Authentication

The app uses JWT Bearer token authentication:

1. Admin users log in at `/admin/login`
2. The JWT token is stored in a cookie (`access-token@na-hora`)
3. Axios interceptors automatically attach the token to API requests
4. Protected dashboard routes are guarded by `AuthGuard`
5. "Remember Me" extends session to 30 days

### Route Access

- **Public:** Appointment booking, confirmation, company registration, login
- **Protected:** Admin dashboard (appointments, registers, hours, profile)

## Architecture Highlights

- **Custom Hook Factory** — `useHooks()` creates generic GET/POST/PUT/DELETE hooks with automatic error handling, toast notifications, and React Query cache invalidation.
- **Multi-Step Wizard** — Appointment booking uses an 8-step wizard with state persisted in React Context.
- **Feature-Based Organization** — Components, hooks, and pages are organized by business domain rather than technical role.
- **CSS Modules** — Scoped styles co-located with components.
- **Type Safety** — Strict TypeScript mode with no implicit `any`.

## Deployment

The application is deployed to **Cloudflare Pages** using Wrangler:

```bash
# Build the production bundle
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

Make sure to configure `VITE_API_URL` in your Cloudflare Pages environment settings.

## Code Quality

- **ESLint** — TypeScript-aware linting with zero warnings policy
- **Prettier** — Consistent code formatting

```bash
npm run lint
```

## License

Private — All rights reserved.
