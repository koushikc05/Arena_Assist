# 🏟️ ArenaAssist Venue Concierge

A modern, serverless Progressive Web App (PWA) engineered to provide a seamless, real-time stadium experience. ArenaAssist allows attendees to check in via their physical seats, browse venue menus, and seamlessly order food—all tracked in real-time right from their phone.

## ✨ Features

- **Seat-based Check-In Flow**: Automatically captures the attendee's seat via QR-code URL parameters (`?seat=X`) and persists the session locally.
- **Real-Time Commerce Engine**: Leverages Firebase Firestore snapshot listeners to provide a real-time order status tracking bar ("Placed" ➔ "Preparing" ➔ "Delivered").
- **Premium Mobile-First UI**: Crafted using Tailwind CSS and Lucide React, ensuring responsive, modern app-like layouts with bottom cart bars and accessible touch targets.
- **Progressive Web App (PWA)**: Built with `vite-plugin-pwa`. It provides a native manifest and custom icons so attendees can install the concierge securely and directly to their smartphone's home screen.
- **Secure Backend Integration**: Uses Firebase Anonymous Authentication entirely under the hood. Orders are securely written and anchored to isolated User IDs, locked down by strict Firestore Database Security Rules.

## 🛠️ Tech Stack

- **Frontend Core:** React 18, Vite
- **Routing:** React Router DOM (v6+)
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **Backend / Database:** Firebase SDK (Firestore, Auth)
- **PWA Tooling:** Vite PWA Plugin

---

## 🚀 Local Development Setup

### 1. Installation
Clone the repository and install the Node bundles:
```bash
git clone https://github.com/koushikc05/StandBy.git
cd StandBy
npm install
```

### 2. Environment Configuration
You must configure your Firebase project locally. Create a `.env` file in the root directory and hook it up to your Firebase console Web App configurations:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Server Spin-Up
Once the environment is mapped, boot the local dev server:
```bash
npm run dev
```

---

## 🔐 Firebase Security Rules

If you are setting this up from scratch, be sure to enable **Anonymous Authentication** in your Firebase console.

In your Firestore Database "Rules" tab, lock down the commerce engine using the following security snippet:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update, delete: if false; 
    }
  }
}
```

---

## 🌐 Production Deployment (Vercel)

ArenaAssist is inherently designed as a Single Page Application (SPA). To deploy it to Vercel:
1. Import your GitHub repository to your Vercel dashboard.
2. Under **Environment Variables**, paste the exact variables found in your local `.env`.
3. Vercel will automatically ingest the `vercel.json` routing rules provided in the codebase, preventing `404` errors on sub-page refreshes.
4. Deploy!
