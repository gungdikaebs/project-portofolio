# Backend Application Flow

This document outlines the data flow and interaction logic for the Portfolio Backend System.

## 1. Authentication Flow
**User Usage:**
1.  **Login**: User sends `POST /auth/login` with `email` and `password`.
2.  **Validation**:
    -   Backend validates credentials against the `User` table.
    -   If valid, backend generates a **JWT (JSON Web Token)**.
3.  **Response**: Backend returns `access_token`.
4.  **Authenticated Requests**: Frontend attaches `Authorization: Bearer <token>` to headers for all protected routes.

---

## 2. Profile Management Flow
**Goal**: Manage global site settings and personal bio (Single Record).

### Public Access (Visitor)
1.  **Frontend** calls `GET /profile`.
2.  **Backend** checks if a profile exists.
    -   If yes: Returns profile data (bio, avatar, resume link, availability).
    -   If no: Returns default "seed" profile or 404 (depending on logic).

### Admin Access (Protected)
1.  **Frontend** sends `PATCH /profile` with new data (e.g., updated bio).
2.  **Backend**:
    -   Verifies JWT.
    -   Updates the single `Profile` record.
    -   Returns updated profile.

---

## 3. Projects Management Flow
**Goal**: CRUD operations for Portfolio Projects.

### Public Access (Visitor)
1.  **Frontend** calls `GET /projects`.
2.  **Backend** returns a list of all projects, sorted by `year` (descending) or order.
3.  **Frontend** calls `GET /projects/:id`.
4.  **Backend** returns details for a specific project.

### Admin Access (Protected)
1.  **Create**: `POST /projects` (Payload: title, description, techStack, etc.) -> Backend creates record.
2.  **Update**: `PATCH /projects/:id` -> Backend updates record.
3.  **Delete**: `DELETE /projects/:id` -> Backend removes record.

---

## 4. Experience & Education Flow
**Goal**: Show timeline of work history and education.

### Public Access
-   `GET /experience` -> Returns list of work history.
-   `GET /education` -> Returns list of education/degrees.

### Admin Access (Protected)
-   Standard CRUD (`POST`, `PATCH`, `DELETE`) for both entities.

---

## 5. Skills Flow
**Goal**: Display technical skills (e.g., Frontend, Backend, Tools).

### Public Access
-   `GET /skills` -> Returns skills grouped by category (or frontend can group them).

### Admin Access (Protected)
-   `POST /skills` -> Add new skill (Name, Icon, Category).
-   `DELETE /skills/:id` -> Remove skill.

---

## 6. Media/Upload Flow (Planned)
**Goal**: Handle image uploads for Projects, Profile Avatar, etc.

1.  **Upload**: `POST /media/upload` (Protected).
    -   Frontend sends `multipart/form-data` (file).
2.  **Processing**:
    -   Backend receives file (Multer).
    -   (Optional) Resize/Optimize.
    -   Save to disk (`client/public/uploads` or external storage) or serve via static route.
3.  **Response**: Returns public URL (e.g., `/uploads/image-123.jpg`).
4.  **Usage**: Frontend generally stores this URL in the `Project` or `Profile` record during Create/Update.
