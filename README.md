## Frontend Architecture & Backend Integration
# Overview

This frontend application is a Single Page Application (SPA) built with React.
It is designed to work with multiple backend implementations, which can be switched dynamically via environment variables.

# The system supports:

Python backend (FastAPI + PostgreSQL)
Node.js backend (Express + MongoDB)

The frontend is fully decoupled from backend implementation details and communicates only via REST API.

# Backend Switching

The active backend is controlled via .env configuration.

Example configuration:
VITE_BASE_URL=http://localhost:8000/api   # FastAPI backend
VITE_BASE_URL=http://localhost:5000/api   # Node.js backend

By changing a single environment variable, the frontend can switch between:

Python + FastAPI + PostgreSQL backend
Node.js + Express + MongoDB backend

No changes in frontend code are required.

# Architecture

The application follows a modular architecture:

Frontend (React SPA)
        ↓
API Layer (Axios wrapper)
        ↓
Backend (switchable via .env)

# Key Features
REST API communication via Axios
Global state management with Redux Toolkit
Persistent state with redux-persist
Component-based architecture (React)
TypeScript support (partial / gradual migration)
Environment-based backend switching
Fully decoupled frontend architecture

# Development Mode
npm install
npm run dev

Frontend dev server runs on:
http://localhost:5173

# Production Mode

In production, the application is built using Vite:

npm run build

The output is a static bundle (dist/) that can be served by:
- Nginx (local production server)
- Vercel
- Any static hosting provider

# Deployment Options

Local production (current implementation)
- Nginx serves static frontend build
- Backend runs separately (FastAPI or Express)
- PostgreSQL / MongoDB hosted locally

Cloud deployment (optional)
- Frontend: Vercel
- Backend: Render / VPS
- Database: Supabase / MongoDB Atlas

# Notes
Frontend is backend-agnostic
All API calls are routed through a single Axios configuration layer
Switching backend requires only .env change
Architecture supports scalable multi-backend development
