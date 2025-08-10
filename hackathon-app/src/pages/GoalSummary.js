


import { useNavigate } from 'react-router-dom';

export default function GoalSummary() {
  const navigate = useNavigate(); // # React Router navigation hook

  return (
    <div className="gs-page">
      <main className="gs-container">
        {/* # Step progress bar + labels */}
        <div className="gs-steps">
          <div className="gs-steps-bar">
            <div className="gs-steps-fill" style={{ width: '100%' }} />
          </div>
          <ul className="gs-steps-list" aria-label="setup steps">
            <li className="complete">Your Goal</li>
            <li className="complete">Timeline</li>
            <li className="complete">Knowledge</li>
            <li className="complete">Commitment</li>
            <li className="complete active">Summary</li>
          </ul>
        </div>

        {/* # Page hero */}
        <header className="gs-hero">
          <h1>Almost There! Here’s Your<br/>Goal Summary &amp; Roadmap</h1>
          <p className="gs-sub">
            Ready to see your roadmap and progress at a glance?
          </p>
        </header>

        {/* # Main summary card */}
        <section className="gs-card" aria-labelledby="summary-title">
          <h3 id="summary-title" className="gs-card-title">Your Personalised Plan</h3>

          {/* # Plan description box */}
          <div className="gs-plan-box">
            <p>
              Based on your goal: <strong>“Develop AI-powered interactive storytelling platform”</strong>,
              starting <strong>9 August, 2025</strong> and ending <strong>6 February, 2026</strong>,
              with your dedication of <strong>7 hours/week</strong> and current knowledge level.
            </p>
          </div>

          {/* # Stats row */}
          <div className="gs-stats" role="list">
            <div className="gs-stat purple" role="listitem">
              <div className="gs-stat-num">6</div>
              <div className="gs-stat-label">Month</div>
            </div>
            <div className="gs-stat blue" role="listitem">
              <div className="gs-stat-num">7</div>
              <div className="gs-stat-label">Hours/week</div>
            </div>
            <div className="gs-stat green" role="listitem">
              <div className="gs-stat-num">18</div>
              <div className="gs-stat-label">Milestones</div>
            </div>
            <div className="gs-stat orange" role="listitem">
              <div className="gs-stat-num">180</div>
              <div className="gs-stat-label">Total hours</div>
            </div>
          </div>
        </section>

        {/* # Actions */}
        <div className="gs-actions">
          <button
            className="btn-outline"
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            className="btn-primary"
            type="button"
            onClick={() => navigate('/main_dashboard')} // # Go to main dashboard
          >
            View My Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

