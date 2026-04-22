# NSDL CBC Admin

React + TypeScript + Vite admin panel for NSDL Payments Bank.

---

## Project Structure

```
src/
├── api/
│   ├── client.ts         # Axios instance + JWT interceptor
│   ├── mockData.ts       # Mock data (replace with real APIs)
│   └── services.ts       # All API service functions
│
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx # Header + Sidebar + <Outlet>
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/
│       ├── LoadingSkeleton.tsx
│       ├── Pagination.tsx
│       └── StatusBadge.tsx
│
├── hooks/
│   ├── useAuditTrail.ts
│   ├── useProfile.ts
│   ├── useUserList.ts
│   └── useUserRequest.ts
│
├── pages/
│   ├── AuditTrail.tsx
│   ├── Dashboard.tsx
│   ├── ProfileDetails.tsx
│   ├── UserListReport.tsx
│   └── UserRequest.tsx
│
├── styles/
│   ├── globals.css       # CSS variables, reset
│   ├── components.css    # Badges, buttons, inputs, cards
│   ├── tables.css        # Table, pagination, filter bar
│   ├── layout.css        # Header, sidebar, main, breadcrumb
│   └── profile.css       # Profile page, tabs, KV rows
│
├── types/
│   └── index.ts          # All TypeScript interfaces
│
├── App.tsx               # React Router route tree
└── main.tsx              # Entry point
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit VITE_API_BASE_URL to point to your backend

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build
```

---

## Connecting Real APIs

All mock logic lives in `src/api/services.ts`. Each function has a `TODO` comment
showing the real `apiClient` call to uncomment:

```ts
// Current (mock):
await delay(400)
return { data: mockUserRequests, ... }

// Replace with:
const res = await apiClient.get('/user-requests', { params })
return res.data
```

The `apiClient` in `src/api/client.ts` already handles:
- **Base URL** from `VITE_API_BASE_URL`
- **JWT attachment** via request interceptor (reads from `localStorage.auth_token`)
- **401 redirect** to `/login` via response interceptor

---

## Pages & Routes

| Route | Page |
|---|---|
| `/` | Dashboard |
| `/user-management/user-request` | User Request list |
| `/user-management/user-request/:id/profile` | Profile Details |
| `/user-management/user-list` | User List Report |
| `/user-management/user-list/:id/profile` | Profile Details |
| `/audit-trail` | Audit Trail |
