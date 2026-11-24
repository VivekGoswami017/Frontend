import React, { useState } from 'react';

export default function PredictionForm() {
  const [studyHours, setStudyHours] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // ML Model constants from trained Logistic_model.pkl
  // coef: 1.12160441, intercept: -6.10225618 (Threshold ~ 5.44 hours)
  const calculateLocalPrediction = (hours) => {
    const z = (1.12160441 * hours) - 6.10225618;
    const probability = 1 / (1 + Math.exp(-z));
    const isPass = probability >= 0.5;
    return {
      status: isPass ? 'Pass' : 'Fail',
      code: isPass ? 1 : 0,
      probability: (probability * 100).toFixed(1),
      source: 'Client ML Engine'
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const hours = parseFloat(studyHours);
    if (isNaN(hours) || hours < 0) {
      setError('Please enter a valid study hour (0 or greater).');
      return;
    }

    if (hours > 24) {
      setError('Study hours cannot exceed 24 hours per day.');
      return;
    }

    setLoading(true);

    try {
      // First try calling the FastAPI backend on port 8000
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ StudyHours: hours }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        // data.predicted_Result is 1 (Pass) or 0 (Fail)
        const isPass = Math.round(data.predicted_Result) === 1;
        const local = calculateLocalPrediction(hours);
        setResult({
          status: isPass ? 'Pass' : 'Fail',
          code: isPass ? 1 : 0,
          probability: local.probability,
          source: 'FastAPI Server (Live Model)'
        });
      } else {
        throw new Error('Backend response error');
      }
    } catch {
      // If FastAPI backend is not running, compute accurately via trained ML weights
      const local = calculateLocalPrediction(hours);
      setResult(local);
    } finally {
      setLoading(false);
    }
  };

  const handlePreset = (hrs) => {
    setStudyHours(hrs.toString());
    setError('');
  };

  return (
    <div className="card-container">
      <div className="card-header-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        AI Outcome Predictor
      </div>

      <h2 className="card-title">Student Study Analysis</h2>
      <p className="card-subtitle">
        Enter the number of study hours to predict whether the student will pass or fail based on trained logistic regression data.
      </p>

      {/* ONLY ONE FORM AS REQUESTED */}
      <form onSubmit={handleSubmit} className="single-form">
        <div className="form-group">
          <label htmlFor="study-hours-input" className="form-label">
            <span>Enter Student Study Hour</span>
            <span className="label-hint">Range: 0 - 24 hrs</span>
          </label>

          <div className="input-wrapper">
            <span className="input-icon-left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </span>
            <input
              id="study-hours-input"
              type="number"
              step="0.1"
              min="0"
              max="24"
              value={studyHours}
              onChange={(e) => {
                setStudyHours(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. 6.5"
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Quick presets for convenience */}
        <div className="preset-section">
          <span className="preset-title">Quick Select:</span>
          {[2, 4, 5.5, 7, 9].map((hr) => (
            <button
              type="button"
              key={hr}
              onClick={() => handlePreset(hr)}
              className="preset-chip"
            >
              {hr} hrs
            </button>
          ))}
        </div>

        {error && (
          <div style={{ color: '#f87171', fontSize: '0.85rem', fontWeight: 500, marginTop: '-0.5rem' }}>
            {error}
          </div>
        )}

        {/* ONE SUBMIT BUTTON */}
        <button
          type="submit"
          className="btn-submit"
          disabled={loading || !studyHours.trim()}
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              <span>Evaluating Data...</span>
            </>
          ) : (
            <>
              <span>Predict Student Result</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </>
          )}
        </button>
      </form>

      {/* RESULT DISPLAY AREA */}
      {result && (
        <div className={`result-box ${result.status === 'Pass' ? 'result-pass' : 'result-fail'}`}>
          <div className="result-top-row">
            <div className="result-badge">
              {result.status === 'Pass' ? (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Student PASS</span>
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>Student FAIL</span>
                </>
              )}
            </div>

            <span className="result-prob-badge">
              {result.probability}% Confidence
            </span>
          </div>

          <p className="result-message">
            {result.status === 'Pass' ? (
              <>
                <strong>Congratulations!</strong> With <strong>{studyHours} hours</strong> of study, 
                the student has exceeded the passing threshold (~5.44 hrs) and is predicted to <strong>PASS</strong> the exam.
              </>
            ) : (
              <>
                <strong>Attention Required:</strong> With <strong>{studyHours} hours</strong> of study, 
                the student falls below the passing threshold (~5.44 hrs) and is predicted to <strong>FAIL</strong>. Increasing study time is advised.
              </>
            )}
          </p>

          <div className="prob-bar-container">
            <div
              className="prob-bar-fill"
              style={{ width: `${Math.max(5, Math.min(100, result.probability))}%` }}
            ></div>
          </div>

          <div className="result-meta-footer">
            <span className="meta-source-pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              Computed via: {result.source}
            </span>
            <span>Threshold: ~5.44 hrs</span>
          </div>
        </div>
      )}
    </div>
  );
}
