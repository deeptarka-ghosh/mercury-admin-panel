# UX Contract

## Product context

- Audience: owner and operations staff of an India-based clothing brand.
- Primary jobs: manage catalog, inventory, orders, customers, staff, and audit activity.
- Target market: India; active locale `en-IN`; timezone `Asia/Kolkata`; Gregorian calendar.
- Accessibility target: WCAG 2.2 AA.

## Business-context sources

| Domain | Authoritative source | Type | Reviewed |
|---|---|---|---|
| Permissions | `../mercury/docs/authentication.md` | Permission policy | 2026-08-29 |
| Lifecycle and API | `../mercury/docs/api.md` | API contract | 2026-08-29 |
| Entities | `../mercury/docs/database.md` | Domain contract | 2026-08-29 |
| Integration | `../mercury/docs/frontend-integration.md` | Integration contract | 2026-08-29 |

## Visual contract

- Project design source: `DESIGN.md`.
- Runtime source: `src/theme.ts`; `DESIGN.md` mirrors it.
- Supported theme: light.

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Select/Listbox | MUI Select | MUI + this contract | authored | keyboard + popup |
| Form | shared field conventions | this contract | create / edit / auth | validation flow |
| Scrollbar | `src/index.css` | DESIGN.md | stable gutter | computed style |
| Toast | MUI Snackbar provider | this contract | semantic tone | live region |
| CRUD | route + service pattern | API + this contract | list / detail | full flow |

## Dataset navigation

- Admin tables use server pagination; mock mode mirrors the contract.
- Search, filters, page, page size, and sort belong in URL parameters.
- Default page size is 10; empty, no-results, loading, and error states retain stable geometry.
- Responsive tables scroll horizontally and preserve all actions.

## Flow ledger

| Operation | Trigger | Pending | Destination | Feedback | Recovery |
|---|---|---|---|---|---|
| Create | Add {entity} | stable busy button | owning list | `{Entity} created` | preserve form + inline error |
| Edit | Save changes | stable busy button | owning list | `Changes saved` | preserve form + inline error |
| Search | Search field | table progress | same route | result count | clear/retry |
| Archive | Archive | dialog busy | list | `{Entity} archived` | dialog remains open |
| Upload | Add media | per-file progress | product detail | `Media added` | preserve valid files + retry |

## Navigation and responsive behavior

- Titles follow `{Page} — Mercury Backoffice`.
- Forbidden navigation renders an app-owned 403 view inside the shell.
- Desktop uses a persistent rail; narrow screens use a modal left drawer.
- Route transitions restore focus to the page heading.

## Overlays and feedback

- MUI owns dialogs, drawers, tooltips, selects, and snackbar feedback.
- Snackbar placement is bottom-right. Archive uses warning; hard delete uses danger.
- Unsaved changes require an app-owned discard dialog for in-app navigation.

## Async and resilience

- Mutations are pessimistic, especially inventory, permissions, money, and status.
- Duplicate submit is blocked; list requests cancel or ignore stale responses.
- Backend unavailability uses a stable banner; mock mode is visibly labelled.
- A 401 attempts one refresh then returns to login; a 403 never retries.

## Validation and permission UI

- Forms use `noValidate`, persistent labels, inline errors, and first-invalid focus.
- Irrelevant route groups are hidden. Read-only operators see mutations disabled with an explanation.
- Direct forbidden routes render 403. Backend authorization remains authoritative.

## Verification

- Required: lint, typecheck, build, strict premium audit, keyboard flow, narrow viewport, reduced motion, and loading/empty/error states.
