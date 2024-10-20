
# Inventory Management System (Monorepo)

This monorepo contains both the backend and frontend for an Inventory Management System. The system helps manage users, products, stock, and locations.

## Project Structure

- **Backend**: Built with Node.js, this is the core of the system responsible for handling user authentication, product management, stock tracking, and location management.
- **Frontend**: A React.js application that provides the user interface for interacting with the system, including adding, editing, and viewing users, products, stocks, and locations.

### Monorepo Structure:
```
inventory-management-system/
├── inventory-management-system-backend/    # Node.js backend
├── inventory-management-system-frontend/   # React.js frontend
└── README.md                               # Project documentation
```

## Backend

- **Tech Stack**: Node.js, Express, MongoDB, bcrypt for password hashing, JWT for authentication.
- **Features**:
  - User management (registration, login, roles)
  - Product management (CRUD operations)
  - Stock control (track inventory levels)
  - Location management (manage storage locations)

### Getting Started (Backend)

1. Navigate to the backend directory:
   ```bash
   cd inventory-management-system-backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (`.env`):
   ```
   MONGODB_URI=<your_mongodb_uri>
   API_TOKEN=<your_jwt_secret>
   ```

4. Run the backend:
   ```bash
   npm start
   ```

## Frontend

- **Tech Stack**: React.js, Axios for API communication, React Router for navigation.
- **Features**:
  - User-friendly interface for managing inventory
  - Real-time updates and data synchronization with the backend
  - User authentication and role-based access control

### Getting Started (Frontend)

1. Navigate to the frontend directory:
   ```bash
   cd inventory-management-system-frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (`.env`):
   ```
   REACT_APP_API_URL=<backend_api_url>
   ```

4. Run the frontend:
   ```bash
   npm start
   ```

## Development

To work on the project, clone the monorepo and follow the steps to set up both the frontend and backend environments.

## License

This project is licensed under the MIT License.
