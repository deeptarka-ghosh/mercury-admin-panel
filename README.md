# Mercury Backoffice

The administrative frontend for Mercury, tailored initially to a single India-based clothing brand while keeping the application architecture reusable.

## Current prototype

The first working slice includes:

- email/password prototype authentication;
- responsive desktop sidebar and mobile navigation drawer;
- role-aware navigation for Mercury's backend roles;
- an INR-formatted operations dashboard;
- a searchable, status-filterable clothing product table;
- mock product variant, price, inventory, and activity data;
- route foundations for categories, orders, customers, analytics, team, audit activity, and settings.

The `Mock data` indicator is intentional. Live API integration will be added after the corresponding Mercury backend contracts are finalized.

## Technology

- React 19
- TypeScript
- Vite
- Material UI
- TanStack Query
- React Router

## Development

Node.js 24 or later and pnpm are recommended.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173). In prototype mode, the sign-in form accepts any non-empty password.

## Environment

Copy `.env.example` to `.env.local` when live integration begins:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK_API=true
```

Set `VITE_USE_MOCK_API=false` only after the live API client is implemented.

For WSL development, run PostgreSQL and the Mercury backend inside WSL. The backoffice can run in WSL as well, or on Windows while calling the backend at `http://localhost:3000`. Mercury must allow `http://localhost:5173` in `CORS_ORIGINS`.

## Commands

```bash
pnpm dev        # local development server
pnpm lint       # ESLint
pnpm typecheck  # strict TypeScript validation
pnpm build      # production build
pnpm preview    # serve the production build locally
```

## Project contracts

- [`DESIGN.md`](DESIGN.md) records the visual language and runtime-token ownership.
- [`UX-CONTRACT.md`](UX-CONTRACT.md) records navigation, permissions, forms, tables, async behavior, and accessibility conventions.
- [`premium-ui.json`](premium-ui.json) configures the static UI contract audit.

## Backend integration assumptions

Mercury remains the server-authoritative source for authentication and authorization. The frontend's role checks are UX-only.

The backoffice expects or will expect these administrative capabilities:

- `GET /admin/me` for the current operator and roles;
- product, category, pricing, inventory, variant, and media management;
- administrative order and customer APIs;
- store configuration using INR and `Asia/Kolkata`;
- production admin email/password followed by mobile OTP.

Until those APIs are available, unfinished actions remain disabled instead of presenting false affordances.

## Verification status

The current foundation passes TypeScript, ESLint without errors, the production Vite build, and the strict premium UI audit. The Vite build currently reports a non-blocking bundle-size warning; route-level code splitting is planned as additional modules become functional.
