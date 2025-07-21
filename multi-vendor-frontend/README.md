# Multi-Vendor Marketplace (MERN Stack)

A full-featured multi-vendor e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This project enables multiple vendors to sell products, manage orders, and interact with customers in a modern, scalable web application.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Overview](#api-overview)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication (register, login, JWT-based sessions)
- Role-based access (admin, vendor, customer)
- Product management (CRUD for vendors/admins)
- Order management (place, track, manage orders)
- Product reviews and ratings
- File uploads (e.g., product images)
- Responsive frontend with protected routes
- Admin dashboard for managing users, products, and orders

---

## Project Structure

```
final-mern project/
  ├── multi-vendor-backend/   # Node.js/Express backend (API, DB, Auth)
  └── multi-vendor-frontend/  # React frontend (UI, state, API calls)
```

---

## Tech Stack

- **Frontend:** React, Vite, modern CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, role-based middleware
- **File Uploads:** Multer
- **State Management:** React Context/State
- **API Testing:** Postman (recommended)
- **Other:** ESLint, Vercel (for deployment), PNPM

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- PNPM (or npm/yarn)

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd multi-vendor-backend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Configure environment variables (e.g., MongoDB URI, JWT secret).
4. Start the server:
   ```bash
   pnpm start
   ```
   The backend runs on `http://localhost:5000` by default.

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd multi-vendor-frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
   The frontend runs on `http://localhost:5173` by default.

---

## API Overview

- **Auth:** `/api/auth` (register, login, logout)
- **Users:** `/api/users` (profile, admin management)
- **Products:** `/api/products` (CRUD, search, details)
- **Orders:** `/api/orders` (place, view, manage)
- **Reviews:** `/api/reviews` (add, view)
- **Uploads:** `/api/upload` (product images)

---

## Folder Structure

### Backend (`multi-vendor-backend/`)

- `config/` - Database connection
- `controllers/` - Route logic (auth, products, orders, etc.)
- `middleware/` - Auth, role, upload middleware
- `models/` - Mongoose schemas (User, Product, Order, Review)
- `routes/` - Express route definitions
- `utils/` - Utility functions (e.g., JWT token generation)
- `server.js` - Entry point

### Frontend (`multi-vendor-frontend/`)

- `src/pages/` - Main pages (Home, Products, Cart, Auth, Dashboard, Admin)
- `src/components/` - UI components (Navbar, Footer, AuthModal, etc.)
- `src/components/ui/` - Reusable UI elements (Button, Card, Input, etc.)
- `src/lib/` - API and utility functions
- `src/assets/` - Static assets (images, icons)
- `index.html`, `main.jsx`, `index.css` - App entry and global styles

---

## Contributing

Contributions are welcome! Please fork the repo, create a feature branch, and submit a pull request. For major changes, open an issue first to discuss your ideas.

---

## License

This project is licensed under the MIT License.
## live project link
https://final-mern-project-beige.vercel.app
## owner
murangiri robert murungi