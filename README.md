# Lendsqr Frontend Engineering Assessment

> An enterprise-grade, fully responsive, and pixel-perfect implementation of the Lendsqr admin dashboard. This application demonstrates production-ready React architecture, featuring a custom token-based design system, algorithmic pagination, and offline-resilient client-side caching.

**[Live Demo on Vercel](https://yusuf-saka-lendsqr-fe-test.vercel.app)**

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | SCSS Modules (Custom Token-Based Design System) |
| **Data Layer** | Next.js API Routes + Browser `localStorage` |
| **State Management**| React Context / Hooks (`useState`, `useEffect`) |
| **Assets** | Custom Scalable Vector Graphics (SVGs) |

---

## Key Architectural Decisions

### 1. Zero-Dependency Custom Design System
Rather than fighting overrides in Tailwind or Material UI, a lightweight, tokenized design system was extracted directly from the Figma specifications. Design tokens (colors, typography scales, spacing, and breakpoints) are isolated in dedicated SCSS partials and consumed via `@use` and `@import`. **Impact:** Guarantees 100% pixel-level fidelity to the design and completely eliminates bloated CSS frameworks.

### 2. Internal Deterministic API & Hydration
To satisfy the 500-record requirement without relying on brittle third-party mock services, I engineered a Next.js API route (`/api/users`) that dynamically generates 500 type-safe, randomized user objects. On the initial load, the frontend fetches and caches this payload in `localStorage`. **Impact:** Routing between the main data table and individual user detail views resolves instantly against the local cache, ensuring zero layout shift and a highly performant user experience.

### 3. Algorithmic Pagination Engine
Instead of importing a heavy third-party pagination library, I implemented a custom mathematical sequence generator. It dynamically calculates the correct sequence of page numbers and injects ellipsis tokens (`...`) based on the current active page. **Impact:** The UI remains perfectly stable and mathematically accurate regardless of the dataset size.

### 4. Configuration-Driven Layouts
The complex sidebar navigation is driven entirely by a centralized configuration array (`sidebarConfig`). Categories, labels, icon paths, and routes are declared as strict data. **Impact:** Eliminates repetitive DOM markup and ensures the navigation architecture is trivially extensible for future product scaling.

### 5. Absolute Positioning Constraints
The table filter dropdowns and the three-dot action menus are engineered using strict `position: absolute` mechanics scoped to `position: relative` parent cells. **Impact:** Ensures that complex interactive overlays never disrupt the `overflow-x: auto` horizontal scroll behavior of the data-heavy table wrapper.

---

## Project Architecture

```text
src/
├── app/
│   ├── page.tsx                        # Authentication Entry
│   ├── globals.scss                    # CSS Resets & Base Styles
│   ├── api/users/route.ts              # Internal 500-User Generation API
│   └── dashboard/
│       ├── layout.tsx                  # Shared Layout Shell (Navbar + Sidebar)
│       ├── page.tsx                    # Main Dashboard & Data Table
│       └── users/[id]/page.tsx         # Dynamic User Profile Routing
│
├── components/
│   ├── DataTable.tsx                   # Core Table Engine + Pagination
│   ├── FilterDropdown.tsx              # Stateful Filter Overlay
│   ├── StatusBadge.tsx                 # Dynamic Color-Mapped Pills
│   ├── Navbar.tsx                      # Global Top Navigation
│   └── Sidebar.tsx                     # Config-Driven Side Navigation
│
├── services/
│   └── userService.ts                  # Data Fetching & Caching Layer
│
├── styles/
│   ├── _colors.scss                    # Hex Tokens
│   ├── _typography.scss                # Font Scales
│   ├── _spacing.scss                   # Grid/Padding Scales
│   └── _mixins.scss                    # Media Queries & Flex Helpers
│
└── types/
    └── user.ts                         # Core TypeScript Domain Models

```

---

## Features & Responsive Behavior

### Application Features

* **Authentication Flow:** Two-column login interface with password visibility toggling.
* **Dynamic Analytics:** Top-level summary cards mathematically derived from live user data.
* **Complex Data Table:** Horizontally scrollable 500-record table with per-column filter dropdowns and row-specific action menus (View Details, Blacklist, Activate).
* **Dynamic Routing:** User detail pages (`/dashboard/users/[id]`) with route-param extraction and fallback handling.
* **Stateful Tabs:** Smooth, state-driven tab navigation across user profile segments.

### Responsive Breakpoints

| Viewport | Behavior |
| --- | --- |
| **Mobile** *(< 768px)* | Sidebar hidden (hamburger toggle), 1-column card grid, stacked user details. |
| **Tablet** *(769px - 1024px)* | 2-column analytics grid, 3-column user information grid. |
| **Desktop** *(1025px+)* | Full 4-column analytics grid, 5-column user information grid, fixed sidebar. |

---

## Local Development Setup

**Prerequisites:** Node.js v18+

```bash
# 1. Clone the repository
git clone https://github.com/Emjaay20/lendsqr-fe-test.git

# 2. Navigate into the directory
cd lendsqr-fe-test

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

```

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.
