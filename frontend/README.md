# KAI.ghost.shell Frontend

This is the frontend for the KAI.ghost.shell project, a technology demonstration showcasing automation of hospital workflows triggered by pathology reports.

## Features

- User authentication with Firebase
- Dashboard for monitoring workflow status
- Ability to trigger pathology report workflows
- Display of workflow history
- Professional modern UI with Material-UI

## Tech Stack

- React 18
- React Router v6
- Material-UI (MUI) v5
- Firebase Authentication
- Axios for API calls
- Context API for state management

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── auth/                   # Authentication related files
│   │   ├── AuthContext.js      # Auth context for global state
│   │   ├── firebase.js         # Firebase configuration
│   │   └── PrivateRoute.js     # Route protection component
│   ├── components/             # Reusable components
│   │   ├── DashboardHeader.js  # Header for dashboard
│   │   ├── LoginForm.js        # Reusable login form
│   │   ├── Sidebar.js          # Navigation sidebar
│   │   └── WorkflowCard.js     # Card to display workflow status
│   ├── pages/                  # Main page components
│   │   ├── Dashboard.js        # Dashboard page
│   │   ├── Home.js             # Landing page
│   │   └── Login.js            # Login page
│   ├── App.js                  # Main app component with routing
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── .env                        # Environment variables
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-org/kai-ghost-shell.git
   cd kai-ghost-shell/frontend
   ```

2. Install dependencies:
   ```
   npm install --yes
   ```

3. Set up environment variables:
   - Rename `.env.example` to `.env` (if needed)
   - Fill in your Firebase configuration details

4. Start the development server:
   ```
   npm start
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Connecting to the Backend

By default, the frontend expects the backend to be running at `http://localhost:5000`. You can change this by modifying the `REACT_APP_API_URL` environment variable in the `.env` file.

## Building for Production

To create a production build:

```
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Authentication

The application uses Firebase Authentication for user management. Users can sign in with email and password.

## Deployment

The frontend can be deployed to any static hosting service like:
- Firebase Hosting
- Netlify
- Vercel
- AWS S3

## License

This project is proprietary software.

## Contact

For inquiries, please contact:
- Email: info@kaighostshell.com

---

© 2025 KAI.ghost.shell - CEO: GP Shangari 