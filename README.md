<<<<<<< README.md
# Vite E-commerce Project

A modern React-based e-commerce application built with Vite, featuring product management, search functionality, and user authentication.

## 🚀 Features

- **Product Management**: View, search, and manage products
- **Search Functionality**: Real-time product search with debounced input
- **User Authentication**: User management and authentication system
- **Responsive Design**: Modern UI with responsive layout
- **State Management**: Zustand for global state management
- **Data Fetching**: TanStack Query for efficient data fetching and caching
- **Form Handling**: React Hook Form with Yup validation
- **Toast Notifications**: User feedback with react-toastify
- **Mock Backend**: JSON Server for development and testing

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite 7.1.2** - Build tool and development server
- **React Router 7.9.1** - Client-side routing
- **TanStack Query 5.87.4** - Data fetching and caching
- **Zustand 5.0.8** - State management
- **React Hook Form 7.62.0** - Form handling
- **Yup 1.7.0** - Schema validation
- **Axios 1.11.0** - HTTP client
- **React Toastify 11.0.5** - Toast notifications
- **React Toastify 11.0.5** - Toast notifications
- **MUI Material 7.3.2** - UI

### Development Tools
- **ESLint** - Code linting
- **JSON Server** - Mock API server
- **Lodash** - Utility library

## 📁 Project Structure

```
src/
├── features/                    # Feature-based modules
│   ├── auth/                   # Authentication feature
│   │   └── routes/            # Auth routes
│   ├── home/                  # Home page feature
│   │   ├── pages/            # Home page components
│   │   └── routes/           # Home routes
│   ├── products/             # Products feature
│   │   ├── components/       # Product-related components
│   │   │   ├── product-item/ # Individual product display
│   │   │   ├── product-list/ # Product listing
│   │   │   └── products-section/ # Products section
│   │   ├── guards/           # Route guards
│   │   ├── hooks/            # Custom hooks
│   │   ├── mock/             # Mock data
│   │   ├── pages/            # Product pages
│   │   ├── routes/           # Product routes
│   │   ├── services/         # API services
│   │   └── store/            # State management
│   └── search/               # Search feature
│       ├── components/       # Search components
│       ├── services/         # Search API services
│       └── store/            # Search state
├── shared/                   # Shared components and utilities
│   ├── components/          # Reusable components
│   │   └── loader/          # Loading component
│   ├── hooks/               # Shared custom hooks
│   │   └── debounce.js      # Debounce utility
│   └── layout/              # Layout components
│       ├── default-layout/  # Main layout
│       ├── footer/          # Footer component
│       ├── layout-container/ # Layout wrapper
│       └── navbar/          # Navigation bar
├── lib/                     # Third-party library configurations
│   └── axios/               # Axios configuration
├── routes/                  # Route configuration
│   └── provider.jsx         # Router provider
├── db/                      # Database
│   └── index.json           # JSON Server database
├── App.jsx                  # Main app component
├── main.jsx                 # Application entry point
└── index.css                # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vite-project
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   yarn dev
   ```

4. **Start the mock API server** (in a separate terminal)
   ```bash
   yarn server
   ```

The application will be available at `http://localhost:5173` and the API server at `http://localhost:3000`.

## 📜 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn server` - Start JSON Server mock API

## 🗂️ API Endpoints

The application uses JSON Server for mock data. Available endpoints:

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID


## 🎯 Key Features Implementation

### Product Management
- **Product List**: Displays all products with loading states and error handling
- **Product Search**: Real-time search with debounced input
- **Product Details**: Individual product view

### State Management
- **Zustand Stores**: Separate stores for products, search, and authentication
- **TanStack Query**: Efficient data fetching with caching and background updates
- **React Hook Form**: Form state management with validation

### Routing
- **React Router**: Client-side routing with nested routes
- **Route Guards**: Protected routes for authenticated users
- **404 Handling**: Custom 404 page for unknown routes

### UI/UX
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success and error feedback

## 🔧 Configuration

### Vite Configuration
The project uses Vite with React plugin for fast development and optimized builds.

### ESLint Configuration
ESLint is configured with React-specific rules for code quality and consistency.

### JSON Server
Mock API server provides RESTful endpoints for development and testing.

## 🚀 Deployment

To build the application for production:

```bash
yarn build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License
This project is private and proprietary.

## 🆘 Support
For support and questions, please contact the development team.