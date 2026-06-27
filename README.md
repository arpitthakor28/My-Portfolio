# Modern MERN Portfolio

A premium, interactive, and high-performance developer portfolio built with a modern frontend architecture and a robust backend. Features custom canvas particle effects, custom cursor interactions, fluid physics spring animations, and an Express email API.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

---

## ✨ Features

*   **Interactive Fluid Canvas Cursor**: A custom HTML5 Canvas cursor that stretches, squishes, and trails behind your movements using physics-based spring logic.
*   **Drifting Particle Background**: A particle networking web that reacts dynamically to the user's scroll speed and cursor position.
*   **3D Rotation Cards**: Interactive profile and project elements that tilt in 3D perspective based on hover coordinates.
*   **Modern Typography & Color Palette**: Styled using Tailwind CSS v4, custom glassmorphism components, and vibrant theme gradients.
*   **Contact Form Backend**: Integrated with an Express server that utilizes the Resend API to deliver messages straight to your inbox.

---

## 📂 Project Structure

```text
arpit-portfolio/
├── .github/workflows/   # Automated GitHub Actions deployment
├── public/              # Static assets (images, icons)
│   └── assets/
│       └── profile.jpg  # Profile picture
├── src/                 # React Frontend
│   ├── components/      # UI components (Navbar, Hero, Cursor, Skills, etc.)
│   ├── App.jsx          # Component assembly
│   ├── index.css        # Global CSS & Tailwind imports
│   └── main.jsx         # React root renderer
├── server/              # Node.js/Express Backend
│   ├── server.js        # Server entry & Resend email API endpoint
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Configuration template
├── firebase.json        # Static Firebase Hosting setup
├── vite.config.js       # Vite bundler, proxy and path alias configuration
└── package.json         # Frontend dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm

### 1. Clone & Install Frontend
```bash
# Install frontend dependencies
npm install
```

### 2. Configure & Start Backend
1. Move to the server directory:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Copy the configuration file:
   ```bash
   cp .env.example .env
   ```
4. Open the `.env` file and insert your API key:
   ```env
   PORT=5000
   RESEND_API_KEY=re_your_api_key_here
   ```
5. Start the Express server:
   ```bash
   npm start
   ```

### 3. Run Frontend
Go back to the root directory and start the Vite development server:
```bash
# Return to root
cd ..
# Start Vite
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Deployment

### GitHub Pages (Automated)
Every push to the `main` branch triggers the GitHub Action configured in `.github/workflows/deploy.yml`. It automatically builds the Vite assets with relative paths and deploys them to GitHub Pages.

> Make sure to go to **Repository Settings** -> **Pages** and set **Source** to **`GitHub Actions`**.

### Firebase Hosting
To manually deploy the static production build:
```bash
# Compile project
npm run build

# Deploy assets
firebase deploy --only hosting
```
