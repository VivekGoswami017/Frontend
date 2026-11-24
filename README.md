# 🎓 EduPredict AI - Student Pass/Fail Predictor

A modern, responsive single-page web application built with **React.js** to predict whether a student will pass or fail based on their daily study hours using a trained **Logistic Regression** model.

---

## ✨ Features

- **Header**: Navigation bar with brand identity and model readiness badge.
- **Single Page Assessment Form**:
  - Clean input form with label: `Enter Student Study Hour`.
  - Numeric input field supporting decimals (range 0–24 hrs).
  - Quick-select preset pills (`2 hrs`, `4 hrs`, `5.5 hrs`, `7 hrs`, `9 hrs`).
  - Prediction trigger button with dynamic spinner and animations.
- **Dynamic Pass / Fail Evaluation**:
  - Displays instant Pass or Fail outcome with confidence percentage.
  - Emerald green badge for **Pass** ($\ge 5.44$ hrs).
  - Coral / red alert badge for **Fail** ($< 5.44$ hrs).
  - Smooth animated probability progress bar.
- **Footer**: Machine Learning model classification formula, credits, and tech stack tags.
- **Dual Mode Connectivity**:
  - Connects to live FastAPI backend (`POST /predict` on `http://localhost:8000`).
  - Seamlessly falls back to client-side evaluation using exact logistic regression weights if the backend server is offline.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Modern CSS3 (Glassmorphism & Flexbox)
- **Backend (Optional)**: FastAPI, Uvicorn
- **Machine Learning**: Scikit-Learn (Logistic Regression), Joblib

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Instant Zero-Setup Preview
You can also open `index.standalone.html` directly in any web browser without running Node or Vite.

---

## 📄 License
MIT License
