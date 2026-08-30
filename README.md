# Mercury Backoffice

Live React 19/MUI administration application for the Mercury clothing platform. It is an independent repository and uses the Mercury HTTP API; it never connects to PostgreSQL directly.

## Run

```powershell
copy .env.example .env.local
pnpm install
pnpm dev
```

Open `http://localhost:5173` with the backend on `http://localhost:3000`. Admin authentication is email/password plus OTP, with rotating session tokens. Demo identities are created by the backend `seed:demo` command; see the root `PLATFORM-GUIDE.md`.

## Capabilities

- Live dashboard, analytics and audit activity.
- Products and clothing attributes, categories, collections, campaigns and promotions.
- Responsive banners, homepage layouts, recommendation rules and deterministic priorities.
- Orders, customers, team/RBAC and editable store settings.
- Permission-aware create/edit controls with server-authoritative RBAC.
- Responsive navigation, loading/error/empty states and accessible forms/tables.

## Verification

```powershell
pnpm typecheck
pnpm lint
pnpm build
```

`DESIGN.md`, `UX-CONTRACT.md`, and `premium-ui.json` define the durable UI contract. The strict premium UI audit passes with zero findings.
