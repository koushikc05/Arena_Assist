<div align="center">
  <img src="./public/pwa-512x512.png" alt="ArenaAssist Logo" width="120" height="120" />
  <h1>🏟️ ArenaAssist Venue Concierge</h1>
  <p><strong>A beautifully crafted, modern Progressive Web App (PWA) delivering a seamless and interactive stadium experience right to your fingertips.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Firebase-10.11.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
    <img src="https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA Ready" />
  </p>
</div>

---

## 🌟 The Ultimate Stadium Companion

ArenaAssist is designed to empower venue attendees with cutting-edge convenience. By simply pulling out your smartphone, you can instantly check in securely from your seat, navigate complex venue layouts with an interactive map, and seamlessly explore concession stands to order food and beverages—all tracked live.

## ✨ Showcase Features

### 📷 Smart Camera QR Check-In
Ditch the manual login forms! We utilize robust device camera integration to scan QR codes placed at the venue. This instantly captures the attendee's physical seat (e.g., `?seat=A-12`) and locally anchors their session for a completely frictionless check-in.

### 🗺️ Interactive Venue & Seating Map
Never get lost in the crowd. Our custom SVG-based map engine provides hyper-smooth zooming and panning. It intelligently renders real-time stadium seating sections and drops a personalized "highlight pin" exactly on your seat so you can easily navigate to exits, restrooms, or the closest food stalls.

### 🍔 Real-Time Commerce Engine
Skip the lines entirely. Browse the venue menu, add items to your cart, and place orders directly to the concession stands. You get to watch an active timeline ("Placed" ➔ "Preparing" ➔ "Delivered") powered by high-speed Firestore snapshot listeners.

### 📱 Premium Mobile-First UI & PWA
ArenaAssist is meticulously crafted as an installable Progressive Web App. With an elegant style powered by Tailwind CSS, smooth micro-animations, and fluid swipeable drawers, it feels like a native iOS or Android app directly from the browser window.

### 🔒 Invisible Security (Firebase Auth)
Friction is the enemy of conversions. We rely on **Firebase Anonymous Authentication** operating completely under the hood. When an attendee interacts with the app, secure isolated user profiles are instantiated silently. Your orders and transactions remain heavily fortified via strict Firestore Database Rules.

---

## 🛠️ Technology Stack Overview

| Area                 | Technology Stack & Libraries                            |
|----------------------|---------------------------------------------------------|
| **Core Framework**   | React 18, Vite Bundler                                  |
| **Routing**          | React Router DOM v6                                     |
| **Design System**    | Tailwind CSS, Lucide React (Icons), CSS Modules         |
| **Interactive Map**  | `react-zoom-pan-pinch`, custom SVG parsing              |
| **Hardware APIs**    | `@yudiel/react-qr-scanner` (Camera Access)              |
| **Backend & Cloud**  | Firebase SDK (Cloud Firestore, Anonymous Auth)          |
| **Mobile Web Tooling** | `vite-plugin-pwa` (Manifest, Service Workers)           |

---

## 🚀 Local Startup Guide

Let's get ArenaAssist running locally on your machine.

### 1. Installation
Clone the repository and inject the necessary node bundles:
```bash
git clone https://github.com/koushikc05/StandBy.git
cd StandBy
npm install
```

### 2. Environment Configuration
You'll need a Firebase Web App instance. Create a `.env` file in the root directory and hook it up to your Firebase console variables:

```env
VITE_FIREBASE_API_KEY="your_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your_project_id"
VITE_FIREBASE_STORAGE_BUCKET="your_project.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
VITE_FIREBASE_APP_ID="your_app_id"
```

### 3. Ignition
Once your environment variables map correctly to Firebase, spin up the development engine:
```bash
npm run dev
```
Access the local preview typically at `http://localhost:5173`.

---

## 🔐 Cloud Security Rules

If provisioning a fresh Firebase project, you **must enable Anonymous Authentication** in your Firebase console.

In your Firestore Database "Rules" tab, drop down the commerce engine using the following security snippet to stop data leaks:

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

<div align="center">
  <sub>Built with ❤️ for a better event experience. Make every seat the best seat in the house.</sub>
</div>
