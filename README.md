# Data Analysis App (Frontend)

Web application for working with user data.
Allows authorized users to upload files with a defined data structure,
filter them, and view the data in tables and charts. Demo data is available for non-logged-in users.

## Features

- User authentication and registration
- Login via email/password or Google account
- Change password and edit user profile
- Upload and manage data files
- View and filter uploaded data sources
- Display data in tables and charts
- Demo data available for non-logged-in users

## Technologies

- React + JavaScript
- React Router for routing
- Axios for API requests
- Chart.js / Recharts for charts
- SCSS / CSS modules for styling

Works with a FastAPI + PostgreSQL backend, or alternatively with Node.js + MongoDB backend.

## Installation and Running

1. Clone the repository or copy the project to a new folder.
2. Install dependencies:

```bash
npm install
Create a .env file with the API URL, for example:

ini
Copy code
VITE_API_URL=https://your-api-url.com
Start the development server:

bash
Copy code
npm run dev
Open your browser at:

arduino
Copy code
http://localhost:5173


## Usage

Register in the app (optional for demo data).
Log in or use demo data.
Upload a data file or select a demo data source.
Apply filters and view data in tables or charts.
Manage data sources: delete, update, or view details.