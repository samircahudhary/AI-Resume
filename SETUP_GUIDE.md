# AI Resume Builder — Complete Setup Guide

## Project Structure

```
Your Workspace/
├── Resume-frontend/     ← React + Vite (open this folder in VS Code)
└── Resume-backend/      ← Spring Boot (open in SEPARATE VS Code window)
```

---

## PART 1 — VS Code Extensions to Install

### For Frontend (Resume-frontend)
Open VS Code → Extensions (Ctrl+Shift+X) → Search and install:

| Extension | Publisher | Why |
|---|---|---|
| ES7+ React/Redux/React-Native snippets | dsznajder | React shortcuts |
| Prettier - Code Formatter | Prettier | Auto-format code |
| ESLint | Microsoft | Code linting |
| Tailwind CSS IntelliSense | Tailwind Labs | CSS help |
| Auto Rename Tag | Jun Han | Rename JSX tags |
| Path IntelliSense | Christian Kohler | Autocomplete import paths |
| DotENV | mikestead | .env file highlighting |

### For Backend (Resume-backend)
| Extension | Publisher | Why |
|---|---|---|
| Extension Pack for Java | Microsoft | Java support (installs 6 extensions) |
| Spring Boot Extension Pack | VMware | Spring Boot support |
| Lombok Annotations Support | Gabriel Basilio | Lombok (@Data, @NoArgsConstructor) |
| MongoDB for VS Code | MongoDB | View your MongoDB data |
| Thunder Client | Softwares | Test your APIs (like Postman) |

---

## PART 2 — Software to Install First

### Required:
1. **Node.js 18+** → https://nodejs.org (download LTS version)
2. **Java 17 JDK** → https://adoptium.net (Eclipse Temurin 17)
3. **MongoDB Community** → https://www.mongodb.com/try/download/community
4. **Maven** → comes with Spring Boot Extension Pack, or https://maven.apache.org

### Verify installations (open terminal):
```bash
node --version      # Should show v18.x or higher
npm --version       # Should show 9.x or higher
java --version      # Should show openjdk 17
mongod --version    # Should show v6.x or v7.x
```

---

## PART 3 — Get Your API Keys

### A) Clerk (Authentication)
1. Go to https://dashboard.clerk.com
2. Create account → Create Application
3. Name it "AI Resume Builder"
4. Choose Sign In methods: Email + Google
5. Copy your **Publishable Key** (starts with `pk_test_...`)
6. Go to: Settings → Redirects → Set "Sign-in redirect" to `/dashboard`

### B) Gemini API (AI Suggestions + ATS Score)
1. Go to https://aistudio.google.com
2. Sign in with Google
3. Click "Get API Key" → Create API Key
4. Copy the key (starts with `AIza...`)

---

## PART 4 — Frontend Setup

### Step 1: Open the folder
```
File → Open Folder → select Resume-frontend
```

### Step 2: Set up environment file
Open `.env.local` and replace the placeholder values:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
VITE_GEMINI_API_KEY=AIzaYOUR_ACTUAL_GEMINI_KEY_HERE
```

### Step 3: Install dependencies
Open Terminal in VS Code (Ctrl+`) and run:
```bash
npm install
```
This installs: React, Clerk, Axios, html2pdf, React Router, Vite

### Step 4: Start the frontend
```bash
npm run dev
```
Frontend runs at: **http://localhost:5173**

---

## PART 5 — Backend Setup (Separate VS Code Window)

### Step 1: Open in a NEW VS Code window
```
File → New Window → Open Folder → select Resume-backend
```

### Step 2: Start MongoDB
Open a terminal and run:
```bash
# Windows:
net start MongoDB

# Mac/Linux:
brew services start mongodb-community
# OR
mongod --dbpath /data/db
```

MongoDB runs at: **mongodb://localhost:27017**

### Step 3: Run the Spring Boot app

**Option A — Using VS Code:**
- Open `BackendResumeApplication.java`
- Click the ▶ Run button above the `main` method
- OR press F5

**Option B — Using terminal:**
```bash
./mvnw spring-boot:run
# Windows:
mvnw.cmd spring-boot:run
```

Backend runs at: **http://localhost:8080**

### Step 4: Verify backend is working
Open browser or Thunder Client and test:
```
GET http://localhost:8080/api/resumes/user/test123
```
Should return: `[]` (empty array — that's correct!)

---

## PART 6 — Test the Full Flow

1. Open **http://localhost:5173** in browser
2. Click "Get Started" → Sign In with Clerk
3. After signing in → redirected to **Dashboard**
4. Dashboard shows your name, email, photo from Clerk
5. Click "+ Create Resume" → Enter a title → Click Create
6. Select a **Template** (4 options)
7. Fill in **Personal Details** → Save & Continue
8. Fill in **Resume Details** — click ✨ AI Suggest buttons
9. Check **ATS Score** tab → click Analyze Resume
10. Preview & Download as PDF

---

## PART 7 — MongoDB Data Structure

Your data is stored in MongoDB database `resumedb`, collection `resumes`.

Each resume document looks like:
```json
{
  "_id": "auto-generated",
  "userId": "user_2abc...",        // Clerk user ID
  "userEmail": "you@gmail.com",
  "userName": "Your Name",
  "title": "My Software Resume",
  "template": "modern",
  "fullName": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "phone": "9876543210",
  "jobTitle": "Software Engineer",
  "summary": "...",
  "skills": "React, Java, MongoDB",
  "experiences": [...],
  "projects": [...],
  "createdAt": "2026-06-04T...",
  "updatedAt": "2026-06-04T..."
}
```

To view your data in VS Code, use the **MongoDB for VS Code** extension:
- Connect to: `mongodb://localhost:27017`
- Browse: `resumedb → resumes`

---

## PART 8 — Common Errors & Fixes

### ❌ "Missing Clerk Publishable Key"
→ `.env.local` file is missing or key is wrong. Copy the key from Clerk dashboard.

### ❌ "Failed to create resume" / API errors
→ Backend is not running. Go to the Resume-backend VS Code window and start it.

### ❌ "MongoException: Connection refused"
→ MongoDB is not running. Run `net start MongoDB` (Windows) or `brew services start mongodb-community` (Mac)

### ❌ CORS error in browser console
→ Backend URL mismatch. Make sure frontend runs on port 5173 and backend on 8080.

### ❌ Gemini AI says "check your API key"
→ Add `VITE_GEMINI_API_KEY` to `.env.local` and restart with `npm run dev`.

### ❌ Lombok errors in backend (symbols not found)
→ Install "Lombok Annotations Support" VS Code extension. Also ensure annotation processing is enabled.

### ❌ Java version error
→ Make sure Java 17 is installed. Check: `java --version`

---

## PART 9 — Project File Map

### Frontend (`Resume-frontend/src/`)
```
main.jsx                    ← App entry, routing, ClerkProvider
auth/sign-in/sign-in.jsx    ← Login page
components/
  ProtectedRoute.jsx        ← Auth guard (redirects if not signed in)
  header.jsx                ← Nav with UserButton when signed in
  AddResume.jsx             ← Create new resume card
  ATSScore.jsx              ← ATS analyzer (Gemini)
  AISuggestion.jsx          ← Per-field AI improve button
Dashboard/dashboard.jsx     ← User info + all previous resumes
pages/
  SelectTemplate.jsx        ← 4 template picker
  EditResume.jsx            ← Main resume editor (3 steps)
  UserDetails.jsx           ← Professional info form
  ResumePreviewPage.jsx     ← Final preview + PDF download
services/
  api.jsx                   ← Axios with Clerk auth token
  gemini.js                 ← Gemini API calls
```

### Backend (`Resume-backend/src/main/java/.../`)
```
BackendResumeApplication.java   ← Main class
model/Resume.java               ← MongoDB document (all fields)
repository/ResumeRepository.java← DB queries (findByUserId)
controller/ResumeController.java ← REST API endpoints
```

### API Endpoints
```
POST   /api/resumes              ← Create resume
GET    /api/resumes/user/{uid}   ← Get all resumes for user
GET    /api/resumes/{id}         ← Get single resume
PUT    /api/resumes/{id}         ← Update resume
DELETE /api/resumes/{id}         ← Delete resume
```

---

## PART 10 — When You Get Gemini API Key Later

You already have the `gemini.js` service file ready. Just:
1. Go to https://aistudio.google.com → Get API Key
2. Open `Resume-frontend/.env.local`
3. Replace: `VITE_GEMINI_API_KEY=YOUR_GEMINI_KEY_HERE`
4. Restart: `npm run dev`
5. The ✨ AI Suggest and 🎯 ATS Score buttons will start working!

---

## Quick Start Checklist

- [ ] Installed Node.js 18+
- [ ] Installed Java 17 JDK
- [ ] Installed MongoDB Community
- [ ] Got Clerk API key → added to `.env.local`
- [ ] Got Gemini API key → added to `.env.local` (can do later)
- [ ] Opened `Resume-frontend` in VS Code → ran `npm install` → `npm run dev`
- [ ] Opened `Resume-backend` in NEW VS Code window → ran the Spring Boot app
- [ ] MongoDB is running
- [ ] Tested sign-in → dashboard shows user info
- [ ] Created a resume → selected template → filled details → downloaded PDF
