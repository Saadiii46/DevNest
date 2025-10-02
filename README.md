# 🚀 DevNest

A modern SaaS platform where developers can **store projects, showcase portfolios, and collaborate** with clients through chat and video calls.  
Built with **Next.js 15, Firebase, and TailwindCSS** for speed, security, and scalability.

---

## ✨ Features
- 🔐 Secure authentication with Firebase & session cookies
- 📦 Upload project files (Firebase Storage + Firestore metadata)
- 🛡️ Middleware-protected routes
- 📊 Dashboard with project stats
- 🎨 Clean & responsive UI (Tailwind + ShadCN)

---

## 🏗️ Tech Stack
- **Frontend**: Next.js 15 (App Router), React, TailwindCSS
- **Auth**: Firebase Auth + Firebase Admin
- **Database**: Firestore
- **Storage**: Firebase Storage
- **UI**: ShadCN + Lucide Icons

---

## 📂 Project Structure
📦 devnest
├── 📂 app/ # Next.js App Router
│ ├── api/ # API routes (auth/session etc.)
│ ├── (auth)/ # Sign-in / Sign-up pages
│ ├── dashboard/ # Protected user dashboard
│ └── layout.tsx # Global layout
│
├── 📂 components/ # Reusable UI components
│ ├── Navbar.tsx
│ ├── AppSidebar.tsx
│ └── ...
│
├── 📂 lib/ # Core utilities
│ ├── firebase/ # Firebase setup
│ │ ├── firebase.ts # Client SDK
│ │ └── firebaseAdmin.ts # Admin SDK
│ ├── getCurrentUser.ts # Server-side user helper
│ └── auth.ts # Auth helper functions
│
├── 📂 styles/ # Global styles
├── 📂 public/ # Static assets (logos, icons)
│
├── middleware.ts # Protect routes
├── package.json
├── tsconfig.json
