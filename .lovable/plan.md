
## Impyreal Homes — Real Estate Website Plan

### Overview
A complete, mobile-first real estate website for **Impyreal Homes** targeting the Indian market. Built with React + Vite using bold, vibrant design with navy and red brand colors (matching the logo). Starting with frontend-only using realistic seeded data — ready to plug into Supabase later.

---

### 🎨 Design System
- **Primary color**: Navy blue (`#1E2D5A`) — from the logo
- **Accent color**: Red (`#C0392B`) — from the logo
- **Typography**: Bold headings, clean body text
- **Style**: Large full-bleed imagery, strong CTAs, Indian premium real estate feel
- **Brand tagline**: *"Curated Homes for an Impyreal Life"*
- The uploaded **Impyreal Homes logo** will appear in the header and footer
- The **Gangotri Ramtal building render** will be used as the featured project hero image

---

### 📄 Pages & Sections

**1. Home Page**
- Full-screen hero banner with search bar (location, budget, BHK type)
- Featured Projects grid (Gangotri Ramtal + 2 dummy projects)
- "Why Impyreal Homes" trust section (icons + short copy)
- Testimonials carousel (3 dummy reviews)
- Area guides teaser cards (Mathura, Noida, Greater Noida)
- Blog/Insights preview (3 cards)
- Sticky header with logo, nav links, "Enquire Now" CTA button

**2. Project Listing Page**
- Grid view of all projects with filter sidebar/panel:
  - City, micro-market, budget range (₹ INR), BHK, property type, status (Ready to Move / Under Construction)
- Project cards with badge labels ("New Launch", "Ready to Move")
- URL query params reflect active filters
- Pagination / Load More

**3. Project Detail Page — Gangotri Ramtal**
- Image gallery (using the uploaded render + placeholder images)
- Video/virtual tour placeholder with play button
- Key highlights: RERA number, builder, possession date, property type
- Price range, configurations (2BHK, 3BHK), carpet area range — in INR format (₹75,00,000)
- Amenities list with icons
- **EMI Calculator widget** (principal, tenure, interest rate → monthly EMI)
- Google Maps embed placeholder for Mathura location
- Sticky CTA bar: "Schedule Site Visit", "Call Now", "WhatsApp", "Download Brochure", "Enquire Now"
- Lead enquiry form (floating/modal)

**4. Area / Neighborhood Guide Pages**
- Template page for Mathura (tied to Gangotri Ramtal)
- Sections: Connectivity, Infrastructure, Price Trends, Lifestyle & Amenities

**5. Blog / Insights**
- Listing page with category filters and search
- Individual blog post detail page
- 3 seeded dummy articles (market updates, buyer guides)

**6. About / Why Impyreal Homes**
- Brand story section
- Trust pillars (expertise, transparency, support)
- Step-by-step buying process (4–5 steps)
- Team placeholder section

**7. Contact Us**
- Lead form (name, phone, email, preferred location, budget, BHK, message)
- Google Maps embed placeholder
- Phone / WhatsApp / email contact details

---

### 🗂️ Lead Capture System (Frontend)
- **Global Lead Form component** used across all pages (modal or inline)
- Fields: name, phone, email, source page, preferred location, budget, BHK, purpose, message
- On submit: stores lead in **localStorage** with full field set (leads array)
- Toast confirmation on successful submission
- Leads are structured to be API-ready (same schema as future Supabase/MongoDB integration)

---

### 🔐 Admin Dashboard (Protected Route)
- Login page with hardcoded credentials (email + password in config)
- **Projects Management**: Create / Edit / Delete projects (all fields: name, city, price range, RERA, configurations, amenities, status, images)
- **Leads Inbox**: View all captured leads in a sortable/filterable table (by project, date, status)
- Lead Detail View: see all fields + a simple status toggle (New → Contacted → Qualified)
- **Blog Management**: Create / Edit / Delete blog posts (title, category, cover image, content)
- Data persisted in localStorage (ready for Supabase swap-in)

---

### 🇮🇳 India-Specific Features
- **INR formatting** throughout: ₹75,00,000 (Indian number system)
- **EMI Calculator** on project detail page
- **WhatsApp CTA** button (wa.me link)
- Language toggle placeholder in header (English / हिंदी) — UI only, no translation
- Budget range filters in INR lakhs/crores

---

### 🤖 AI Integration Readiness
- A `qualifyLeadWithAI(lead)` utility function stubbed out that returns mocked `ai_intent_level` and `ai_notes`
- Lead objects include an `interactions[]` array for future timeline tracking
- Lead form data structured as webhook-ready JSON payload

---

### 📦 Seeded Sample Data
- **1 real project**: Gangotri Ramtal (Mathura, using uploaded imagery, realistic details)
- **2 dummy projects**: One in Noida, one in Greater Noida
- **3 blog posts**: "Top 5 Reasons to Invest in Mathura Real Estate", "First-Time Buyer's Guide to RERA", "Price Trends in Noida 2025"
- **3 testimonials**: Realistic Indian buyer names and quotes

---

### 🗺️ Site Structure (Routes)
- `/` — Home
- `/projects` — Project Listing
- `/projects/:slug` — Project Detail
- `/areas/:slug` — Area Guide
- `/blog` — Blog Listing
- `/blog/:slug` — Blog Post
- `/about` — About Page
- `/contact` — Contact Page
- `/admin/login` — Admin Login
- `/admin/dashboard` — Admin Overview
- `/admin/projects` — Manage Projects
- `/admin/leads` — Leads Inbox
- `/admin/blog` — Manage Blog
