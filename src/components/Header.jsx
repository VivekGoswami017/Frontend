import React from 'react';

export default function Header() {
  return (
    <header className="header-wrapper">
      <div className="header-inner">
        <div className="brand-section">
          <div className="brand-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <h1 className="brand-title">EduPredict AI</h1>
            <p className="brand-tagline">Student Performance Analytics Portal</p>
          </div>
        </div>

        <div className="header-status-badge">
          <span className="status-dot"></span>
          <span>Logistic Model Ready</span>
        </div>
      </div>
    </header>
  );
}
