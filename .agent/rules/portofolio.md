---
trigger: always_on
---

PORTFOLIO WEBSITE

## 1️⃣ PROJECT CONTEXT 

You are assisting in building a **modern frontend developer portfolio website**.

Core characteristics:

- Dark theme
- Minimal
- Typography-first
- Professional & scalable
- Motion-ready (GSAP + Lenis)
- CMS-driven content (projects, skills, CV, images)

This is **NOT a template**, **NOT a marketing landing page**, and **NOT a UI showcase**.

---

## 2️⃣ TYPOGRAPHY RULES (STRICT)

### Heading / Title

- Font: **Sora**
- Weight: **600–700**
- Usage:
    - Hero title
    - Section title
    - Project title
- Headings must:
    - Be large
    - Be dominant
    - Carry the visual hierarchy

### Body / Caption

- Font: **Inter**
- Weight: **400–500**
- Usage:
    - Descriptions
    - Captions
    - Metadata
    - Long-form text
- Body text must:
    - Be readable
    - Never compete with headings
    - Support, not dominate

❌ Do NOT introduce additional fonts

❌ Do NOT use decorative or display fonts

---

## 3️⃣ COLOR SYSTEM RULES

### Background

- Primary background: `#0B0D10`
- Surface / card: `#11141A`

### Text

- Primary text: `#EDEDED`
- Secondary text: `#9AA0AA`

### Accent

- Use **ONE accent only**:
    - Cyan `#6AE3FF` **OR**
    - Violet `#7C7CFF`

Accent usage rules:

- Max **5–10%** of the UI
- Allowed only for:
    - Links
    - Hover states
    - Underlines
    - Small highlights
- ❌ No colorful gradients
- ❌ No multiple accent colors

All colors must be defined via **CSS variables**, not hardcoded utilities.

---

## 4️⃣ STYLE DIRECTION (NON-NEGOTIABLE)

The visual direction is:

- Minimal
- Dark
- Typography-first
- Spacious (whitespace matters)
- Editorial & tech-oriented

Strictly avoid:

- Decorative UI
- Excessive cards
- Heavy shadows
- Glassmorphism
- Neon overload
- Over-animated elements

If unsure, **choose simpler**.

---

## 5️⃣ ANIMATION RULES (IMPORTANT)

Animation tools:

- GSAP (text reveal, stagger, scroll)
- Lenis (smooth scrolling)

Motion principles:

- Subtle
- Purposeful
- Content-supporting
- Never distracting readability

Rules:

- ❌ No animation by default
- ❌ No looping gimmicks
- ❌ No flashy transitions
- Animations must be:
    - Easy to disable
    - Easy to refactor
    - Separated from UI markup

---

## 6️⃣ FRONTEND LAYOUT ORDER (FIXED)

Sections must follow this order:

1. Hero
    - Full viewport
    - Strong typography
    - Short caption
    - First impression focus
2. Selected Works
    - Project grid/list
    - Short descriptions
    - Highlight best projects
3. About
    - Personal description
    - Simple layout
    - Readability-first
4. Skills / Expertise
    - List-based
    - Minimal cards
    - Concise info
5. Experience
    - Timeline or stacked list
    - Typography-driven
6. Contact
    - Strong CTA
    - Accent color allowed
    - Clear closing section

Do NOT rearrange this order unless explicitly instructed.

---

## 7️⃣ CMS & DATA RULES

The website must be **CMS-ready**.

CMS responsibilities:

- CRUD Projects
- CRUD Skills
- Update Profile
- Upload / Replace CV (PDF)
- Upload Images / Thumbnails

CMS UI rules:

- Functional
- Clean
- Minimal
- ❌ Not visually fancy

Frontend must assume:

> Data comes from API, not hardcoded forever.
> 

---

## 8️⃣ DEVELOPMENT WORKFLOW (MANDATORY)

Follow this workflow strictly:

1. Build frontend first (data-aware)
2. Define data structure & fields
3. Use mock data in frontend
4. Finalize layout & animations
5. Implement backend API
6. Connect CMS to frontend

Core principle:

> Frontend defines the data contract, backend implements it.
> 

---

## 9️⃣ ENGINEERING RULES

- Tailwind CSS is a **helper**, not the design system
- Design decisions live in:
    - CSS variables
    - Typography rules
- Avoid over-engineering
- Avoid premature abstraction
- Prefer clarity over cleverness

---

## 🔒 FINAL DIRECTIVE

This portfolio must feel like it was built by:

> a frontend developer who understands design, motion, and systems.
> 

If a decision conflicts with:

- minimalism
- typography clarity
- long-term scalability

👉 **do not implement it**.