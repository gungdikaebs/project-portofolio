# API Reference

Base URL: `http://localhost:3000`

## 🔐 1. Authentication
> **Note**: Most `POST`, `PATCH`, `DELETE` endpoints require the `Authorization: Bearer <token>` header.

### Register
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```
**Response**: Returns `{ "access_token": "..." }`.

---

## 👤 2. Profile
### Get Profile (Public)
- **URL**: `/profile`
- **Method**: `GET`

### Update Profile (Protected)
- **URL**: `/profile`
- **Method**: `PATCH`
- **Body**:
```json
{
  "bio": "Senior Frontend Developer with a passion for UI/UX.",
  "yearsExperience": 5,
  "projectsDone": 20,
  "location": "Bali, Indonesia",
  "availableForHi": true,
  "cvUrl": "https://example.com/cv.pdf"
}
```

---

## 🚀 3. Projects
### Get All Projects (Public)
- **URL**: `/projects`
- **Method**: `GET`

### Get Single Project (Public)
- **URL**: `/projects/:id`
- **Method**: `GET`

### Create Project (Protected)
- **URL**: `/projects`
- **Method**: `POST`
- **Body**:
```json
{
  "title": "Portfolio V2",
  "slug": "portfolio-v2",
  "description": "My personal portfolio website built with NestJS and Vue.",
  "category": "Web Development",
  "year": 2024,
  "imageUrl": "/uploads/portfolio.jpg",
  "projectUrl": "https://gungdika.com",
  "status": "DRAFT", 
  "featured": true,
  "sortOrder": 1,
  "skillIds": ["<uuid-of-skill-1>", "<uuid-of-skill-2>"]
}
```
*(Note: `status` can be `DRAFT` or `PUBLISHED`)*

### Update Project (Protected)
- **URL**: `/projects/:id`
- **Method**: `PATCH`
- **Body**: *(Same structure as Create, fields are optional)*

### Delete Project (Protected)
- **URL**: `/projects/:id`
- **Method**: `DELETE`

---

## 💼 4. Experience
### Get All Experience (Public)
- **URL**: `/experience`
- **Method**: `GET`

### Create Experience (Protected)
- **URL**: `/experience`
- **Method**: `POST`
- **Body**:
```json
{
  "role": "Senior Frontend Engineer",
  "company": "Tech Corp",
  "startDate": "2023-01-01T00:00:00Z",
  "endDate": null,
  "isCurrent": true,
  "description": "Leading the frontend team...",
  "sortOrder": 1
}
```

### Update/Delete Experience (Protected)
- **URL**: `/experience/:id`
- **Method**: `PATCH` / `DELETE`

---

## 🎓 5. Education
### Get All Education (Public)
- **URL**: `/education`
- **Method**: `GET`

### Create Education (Protected)
- **URL**: `/education`
- **Method**: `POST`
- **Body**:
```json
{
  "degree": "Bachelor of Computer Science",
  "institution": "University of Indonesia",
  "startYear": 2018,
  "endYear": 2022,
  "description": "graduated with honors.",
  "sortOrder": 1
}
```

### Update/Delete Education (Protected)
- **URL**: `/education/:id`
- **Method**: `PATCH` / `DELETE`

---

## 🏆 6. Certifications
### Get All Certifications (Public)
- **URL**: `/certifications`
- **Method**: `GET`

### Create Certification (Protected)
- **URL**: `/certifications`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "AWS Certified Developer",
  "issuer": "Amazon Web Services",
  "year": 2023,
  "description": "Validation of cloud skills.",
  "credentialUrl": "https://aws.amazon.com/verify",
  "sortOrder": 1
}
```

### Update/Delete Certification (Protected)
- **URL**: `/certifications/:id`
- **Method**: `PATCH` / `DELETE`

---

## 🛠 7. Skills
### Get All Skills (Public)
- **URL**: `/skills`
- **Method**: `GET`
*(Returns skills grouped by category)*

### Create Skill (Protected)
- **URL**: `/skills`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "Vue.js",
  "categoryId": "<uuid-of-category>",
  "svgContent": "<svg>...</svg>",
  "sortOrder": 1
}
```

### Update/Delete Skill (Protected)
- **URL**: `/skills/:id`
- **Method**: `PATCH` / `DELETE`

---

## 📂 8. Skill Categories
### Get All Categories (Public)
- **URL**: `/skills/categories`
- **Method**: `GET`

### Create Category (Protected)
- **URL**: `/skills/categories`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "Frontend"
}
```

### Update/Delete Category (Protected)
- **URL**: `/skills/categories/:id`
- **Method**: `PATCH` / `DELETE`

---

## 🖼 9. Media (Uploads)
### Upload File (Protected)
- **URL**: `/media/upload`
- **Method**: `POST`
- **Body**: `multipart/form-data`
    - Key: `file`
    - Value: (Select File)

### Get All Media (Public/Protected)
- **URL**: `/media`
- **Method**: `GET`
