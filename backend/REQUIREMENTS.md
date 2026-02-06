# System Requirements & Database Schema

## Features
1. **Authentication**: JWT-based auth for Admin dashboard.
2. **Projects Type**: Manage portfolio projects (CRUD).
3. **Profile Settings**: Update bio, stats, and files (CV).
4. **Experience & Education**: Manage work history and education/certifications (CRUD).
5. **Skills**: Manage technical skills and categories (CRUD).
6. **Media**: Image/File upload handling.

## Database Schema (Scalable)

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
- `available_for_hi`: Boolean

### Table: `projects`
- `id`: UUID
- `title`: String
- `slug`: String (Unique)
- `description`: Text
- `category`: String
- `year`: Integer
- `image_url`: String
- `project_url`: String (Optional)
- `sort_order`: Integer (Default: 0)
- `status`: Enum('DRAFT', 'PUBLISHED')
- `featured`: Boolean (Default: false)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Table: `skills` (Master Table)
- `id`: UUID
- `name`: String
- `category_id`: UUID (FK -> skill_categories.id)
- `svg_content`: Text
- `sort_order`: Integer (Default: 0)
- `created_at`: Timestamp

### Table: `skill_categories`
- `id`: UUID
- `name`: String
- `created_at`: Timestamp

### Table: `project_skills` (Pivot Project <-> Skill)
- `project_id`: UUID
- `skill_id`: UUID

### Table: `experiences` (Work History)
- `id`: UUID
- `role`: String
- `company`: String
- `start_date`: Date
- `end_date`: Date (Nullable)
- `is_current`: Boolean (Default: false)
- `description`: Text
- `sort_order`: Integer (Default: 0)
- `created_at`: Timestamp

### Table: `educations`
- `id`: UUID
- `degree`: String
- `institution`: String
- `start_year`: Integer
- `end_year`: Integer (Nullable)
- `description`: Text
- `sort_order`: Integer (Default: 0)
- `created_at`: Timestamp

### Table: `certifications`
- `id`: UUID
- `name`: String
- `issuer`: String
- `year`: Integer
- `description`: Text
- `credential_url`: String (Optional)
- `sort_order`: Integer (Default: 0)
- `created_at`: Timestamp

### Table: `media`
- `id`: UUID
- `file_name`: String
- `file_url`: String
- `mime_type`: String
- `size`: Integer
- `created_at`: Timestamp
