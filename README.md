# Lendsqr Frontend Engineering Assessment

A fully responsive, pixel-perfect implementation of the Lendsqr dashboard, built as part of the frontend engineering assessment. The application demonstrates a production-grade React architecture with a custom design system extracted directly from Figma specifications.

## Live Demo

[https://yusuf-saka-lendsqr-fe-test.vercel.app](https://yusuf-saka-lendsqr-fe-test.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | SCSS Modules with a custom design system |
| Icons | Custom SVGs exported from Figma |
| State Management | React `useState` / `useEffect` |
| Routing | Next.js App Router with dynamic segments |
| Data Layer | Next.js API Routes + Browser `localStorage` |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                        # Login page
│   ├── Login.module.scss
│   ├── layout.tsx
│   ├── globals.scss
│   ├── api/
│   │   └── users/
│   │       └── route.ts               # Internal API endpoint (generates 500 mock users)
│   └── dashboard/
│       ├── layout.tsx                 # Shared dashboard shell (Navbar + Sidebar)
│       ├── page.tsx                   # Main users list page
│       ├── Dashboard.module.scss
│       ├── DashboardLayout.module.scss
│       └── users/
│           └── [id]/
│               ├── page.tsx           # Dynamic user details page
│               └── UserDetails.module.scss
│
├── components/
│   ├── Navbar.tsx / .module.scss
│   ├── Sidebar.tsx / .module.scss
│   ├── DataTable.tsx / .module.scss   # Full-featured data table with pagination
│   ├── StatusBadge.tsx / .module.scss
│   └── FilterDropdown.tsx / .module.scss
│
├── services/
│   └── userService.ts                 # Data fetching and localStorage caching layer
│
├── styles/
│   ├── _colors.scss                   # Design token: brand and status colors
│   ├── _typography.scss               # Design token: font families, sizes, weights
│   ├── _spacing.scss                  # Design token: spacing scale and border radii
│   └── _mixins.scss                   # Reusable breakpoint and layout mixins
│
└── types/
    └── user.ts                        # TypeScript interfaces for the User domain
```

---

## Key Architectural Decisions

### 1. Custom Design System
Rather than inheriting Tailwind or any third-party component library, a lightweight design system was extracted manually from the Figma file. Design tokens for colors, typography, spacing, and breakpoints live in dedicated SCSS partial files and are consumed across all SCSS modules via `@use` and `@import` directives. This guarantees pixel-level fidelity to the Figma specification.

### 2. Internal Mock API with localStorage Caching
The assessment requires 500 user records persisted in `localStorage`. The solution avoids external mock services entirely. A Next.js API route (`/api/users`) dynamically generates 500 type-safe user objects at request time. On first load, the frontend fetches from this endpoint and caches the payload in `localStorage`. All subsequent page navigations (including the user detail view) resolve instantly against the local cache, ensuring consistent data across sessions.

### 3. Algorithmic Pagination Engine
Rather than importing a third-party pagination library, a custom page-number generator function was implemented. It dynamically produces the correct sequence of page numbers and ellipsis tokens (`...`) based on the current page and total count, ensuring the pagination UI remains clean and stable regardless of dataset size.

### 4. Data-Driven Sidebar
The sidebar navigation is driven entirely by a configuration array (`sidebarConfig`). Each section, category label, icon path, and route is declared as data. This approach eliminates repetitive markup and makes the navigation trivially extensible as the product grows.

### 5. Strict Positioning for Table Overlays
The table filter dropdowns and the three-dot action menu are rendered using `position: absolute` within a `position: relative` container scoped to each table header or row cell. This ensures neither overlay disrupts the horizontal scroll behavior of the table wrapper, a common failure point in data-heavy interfaces.

### 6. Type-Safe User Domain
A strict `User` interface and `UserStatus` union type are defined in `src/types/user.ts` and consumed across the entire application. This eliminates runtime shape errors and ensures every component, service, and API handler operates on a consistent data contract.

---

## Pages and Features

### Login Page (`/`)
- Responsive two-column layout (branding illustration + authentication form)
- Password show/hide toggle
- Form submission routes to the dashboard

### Dashboard - Users List (`/dashboard`)
- Four dynamic summary cards with metrics calculated from live user data (total users, active users, users with loans, users with savings)
- Full data table with 500 user records
- Per-column filter dropdowns with form inputs and date pickers
- Three-dot action menu per row with View Details, Blacklist User, and Activate User actions
- Algorithmic pagination with ellipsis handling and configurable items-per-page
- Status badges with distinct visual treatments per status variant (Active, Inactive, Pending, Blacklisted)

### User Details Page (`/dashboard/users/[id]`)
- Dynamic routing based on user ID captured from the URL
- Profile summary card with account balance and user tier
- Tab navigation across: General Details, Documents, Bank Details, Loans, Savings, App and System
- Five-column responsive information grid covering Personal Information, Education and Employment, Socials, and Guarantor
- Blacklist User and Activate User header actions

---

## Local Setup

**Prerequisites:** Node.js v18 or higher

```bash
# Clone the repository
git clone https://github.com/Emjaay20/lendsqr-fe-test.git
cd lendsqr-fe-test

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (max 768px) | Sidebar collapses, single-column card grid, stacked user details layout |
| Tablet (769px - 1024px) | Two-column card grid, three-column user info grid |
| Desktop (1025px+) | Full four-column card grid, five-column user info grid, full sidebar |
