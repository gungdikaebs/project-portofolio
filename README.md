# Modern Developer Portfolio & Mini CMS

A high-performance, dark-themed developer portfolio website built with a **Mini CMS** architecture. It combines a motion-heavy, premium frontend with a robust backend that provides a **secure Admin Dashboard** for managing all portfolio content dynamically.

## 🚀 Tech Stack

### **Frontend (`/app`)**
-   **Framework**: Vue 3 + TypeScript
-   **Styling**: Tailwind CSS (Utility) + Custom CSS Variables (Design System)
-   **Motion**: GSAP (Animations) + Lenis (Smooth Scroll)
-   **Architecture**: Component-based with dynamic data consumption.

### **Backend (`/backend`)**
-   **Framework**: NestJS (TypeScript)
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Auth**: JWT (Secure Admin Access)
-   **Features**:
    -   **Mini CMS**: REST API to manage Projects, Skills, Experience, Education, and Profile.
    -   **Media Management**: Local file upload system for project images and CVs.
    -   **Data Normalization**: Scalable database schema (e.g., Skills linked via categories).

### **Admin**
- **UNDER CONSTRUCTION**
---

## 🛠️ Project Structure

```bash
├── app/          # Frontend Application (Public View)
├── backend/      # Backend API (CMS Logic & Database)
└── README.md     # Project Documentation
```

---

## ✨ Key Features

-   **Mini CMS / Admin Control**:
    -   Manage **Profile** (Bio, Stats, CV).
    -   CRUD **Projects** (Case studies, Tech stacks, Images).
    -   Organize **Skills** into custom Categories.
    -   Update **Experience & Education** timelines.
-   **Dynamic Content**: No hardcoded data; everything is fetched from the database.
-   **Rich Interactions**: GSAP-powered reveals and magnetic effects on the frontend.
-   **Scalable Schema**: Normalized relationships between Projects and Skills.
-   **Secure Authentication**: Protected routes for all management operations.

---

## 🏁 Getting Started

### 1. Backend Setup
The backend handles data persistence and API endpoints.

```bash
cd backend
npm install

# Setup Environment (.env)
# Configure DATABASE_URL and JWT_SECRET

# Run Database Migrations
npx prisma migrate dev

# Start Server
npm run start:dev
```
> Server runs on: `http://localhost:3000`

### 2. Frontend Setup
The frontend consumes the Backend API.

```bash
cd app
npm install

# Start Development Server
npm run dev
```
> Frontend runs on: `http://localhost:5173` (default)

---

## 📝 Usage Workflow

1.  **Create Admin**: Since there is no public registration, use Postman to create your first Admin user via `/auth/register`.
2.  **Login**: Obtain a Bearer Token via `/auth/login`.
3.  **Manage Content via API**:
    -   Create **Skill Categories** (e.g., Frontend, Backend).
    -   Populate **Skills**.
    -   Create **Projects** and link them to Skills.
    -   Upload images via the Media endpoint.
4.  **Frontend Display**: The public frontend automatically fetches and displays this structured data.

---

Built with ❤️ by **Gung Dika Ebs**.
