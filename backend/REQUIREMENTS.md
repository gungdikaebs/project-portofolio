# System Requirements & Database Schema

## Features
1. **Authentication**: JWT-based auth for Admin dashboard.
2. **Projects Type**: Manage portfolio projects (CRUD).
3. **Profile Settings**: Update bio, stats, and files (CV).
4. **Experience & Education**: Manage work history and education/certifications (CRUD).
5. **Skills**: Manage technical skills and categories (CRUD).
6. **Media**: Image/File upload handling.

## Database Schema (Draft)

### Table: `users` (Admin)
- `id`: UUID
- `email`: String (Unique)
- `password`: String (Hashed)
- `created_at`: Timestamp

### Table: `profile` (Single Record)
- `id`: UUID
- `bio`: Text
- `years_experience`: Integer
- `projects_done`: Integer
- `location`: String
- `cv_url`: String

### Table: `projects`
- `id`: UUID
- `title`: String
- `slug`: String (Unique)
- `description`: Text
- `category`: String
- `year`: String
- `tech_stack`: JSON (Array of strings)
- `image_url`: String
- `project_url`: String (Optional)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Table: `experiences` (Work History)
- `id`: UUID
- `role`: String
- `company`: String
- `date`: String (e.g., "2023 - Present" or separate start/end dates)
- `description`: Text
- `stack`: JSON (Array of strings)
- `created_at`: Timestamp

### Table: `educations`
- `id`: UUID
- `degree`: String
- `institution`: String
- `year`: String
- `description`: Text
- `created_at`: Timestamp

### Table: `certifications`
- `id`: UUID
- `name`: String
- `issuer`: String
- `year`: String
- `description`: Text
- `credential_url`: String (Optional)
- `created_at`: Timestamp

### Table: `skills`
- `id`: UUID
- `category`: String (e.g., "Frontend", "Backend & Tools")
- `name`: String
- `svg_content`: Text (Raw SVG string)
- `created_at`: Timestamp
