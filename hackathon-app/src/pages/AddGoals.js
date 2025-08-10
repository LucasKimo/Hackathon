import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Steps from '../components/Steps';

export default function AddGoals(){
  const navigate = useNavigate();
  const [goal, setGoal] = useState('Develop AI-powered interactive storytelling platform');

  const handleContinue = () => {
    // pass goal forward to the next step
    navigate('/add_goals/previous_knowledge', { state: { goal } });
  };

  return (
    <div className="gs-page">
      <main className="gs-container">
        {/* Steps progress (Your Goal active) */}
        <Steps active={1} />

        {/* Title & subtitle */}
        <header className="gs-hero">
          <h1>What’s Your <span style={{color:'var(--brand)'}}>Visionary Goal</span>?</h1>
          <p className="gs-sub">Tell us your visionary goal — where do you want your story or career to be in the future?</p>
          <p className="gs-sub" style={{marginTop:4}}>Dream big! We’ll help you create a personalized roadmap to turn your vision into reality.</p>
        </header>

        {/* Goal input card */}
        <section className="gs-card" style={{maxWidth:940}}>
          <label style={{display:'block', fontSize:13, fontWeight:700, marginBottom:8}}>Your Main Goal</label>
          <textarea
            value={goal}
            onChange={(e)=> setGoal(e.target.value)}
            rows={3}
            placeholder="Describe your main goal here..."
            style={{
              width:'100%', padding:'14px 12px', border:'1px solid var(--border)', borderRadius:12,
              background:'#fff', fontSize:14, resize:'vertical'
            }}
          />
        </section>

        {/* Actions */}
        <div className="gs-actions" style={{marginTop:24}}>
          <button
            type="button"
            className="btn-outline"
            onClick={() =>  navigate(-1)}
          >
            Back
          </button>
          <button type="button" className="btn-primary" onClick={handleContinue}>
            Continue to Knowledge
          </button>
        </div>
      </main>
    </div>
  );
}
