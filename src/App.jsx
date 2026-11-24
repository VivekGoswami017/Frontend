import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PredictionForm from './components/PredictionForm';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      {/* 1. Header */}
      <Header />

      {/* 2. Body Part (Single Page Main Content) */}
      <main className="main-content">
        <div className="page-decoration-glow"></div>
        {/* Only 1 Form with Label, Input, and Button inside PredictionForm */}
        <PredictionForm />
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
