import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        <div>
          <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Machine Learning Class &bull; Student Pass/Fail Classifier
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Powered by Logistic Regression Classification Algorithm
          </p>
        </div>

        <div className="footer-formula">
          Decision Boundary Function: P(Pass) = 1 / (1 + e<sup>-(1.1216 &times; Hours - 6.1023)</sup>)
        </div>

        <div className="footer-bottom-row">
          <span>&copy; {new Date().getFullYear()} Machine Learning Class. All rights reserved.</span>
          <div className="footer-tags">
            <span className="footer-tag">React.js</span>
            <span className="footer-tag">FastAPI</span>
            <span className="footer-tag">Scikit-Learn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
