<<<<<<< README.md
# Vite E-commerce Project

A modern React-based e-commerce application built with Vite, featuring product management, search functionality, and user authentication.

## 🚀 Features

- **Product Management**: View, search, and manage products
- **Search Functionality**: Real-time product search with debounced input
# Exclusive Store — Frontend

A modern React + Vite e-commerce frontend built with Material UI (MUI), React Router, and React Query. This repository contains the single-page frontend for the "Exclusive Store" demo app.

---

## Quick summary
- Frameworks: React (Vite) + MUI
- Router: React Router (createBrowserRouter + RouterProvider)
- Data fetching: @tanstack/react-query
- Styling: MUI theming and styled API


## Requirements
- Node.js 18+ (recommended)
- Yarn (v1)
- Windows PowerShell is the default example shell used here


## Install
Open a PowerShell terminal in the project root and run:

```powershell
yarn install
```


## Development
Start the dev server (Vite). If port 5173 is already in use, set the `PORT` env var in PowerShell before starting:

```powershell
$env:PORT=5173; yarn dev
# or if 5173 is busy
$env:PORT=5174; yarn dev
```

If a mock API server is available in the repository, start it with:

```powershell
yarn server
```


## Build (production)

```powershell
yarn build
```

Preview the production build locally:

```powershell
yarn preview
```


## Project structure (high level)
- `src/features/` — feature folders (products, category, wishlist, cart, auth, details-product, etc.)
- `src/shared/` — shared components and layout (Navbar, Footer, containers)
- `src/routes/` — app routing (RouterProvider wiring)
- `src/lib/` — helpers (axios, storage)
- `src/theme.js` — MUI theme configuration
- `src/main.jsx`, `src/App.jsx` — entry and providers


---
README generated and tailored for this project — edit further as needed.